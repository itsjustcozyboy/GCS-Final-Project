import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { POLICY_VERSION } from '@maeum/shared';
import { recordConversion } from '../services/funnel';
import { tErr } from '../trpc';

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        email: z.string().email().optional(),
        phone: z.string().regex(/^010\d{8}$/).optional(),
        role: z.enum(['child', 'parent', 'both']),
        password: z.string().min(6),
        // [필수] 동의 — 미동의 시 가입 불가 (PIPA 필수/선택 분리)
        consentPrivacy: z.literal(true, { errorMap: () => ({ message: '개인정보 수집·이용 동의(필수)가 필요합니다.' }) }),
        consentTerms: z.literal(true, { errorMap: () => ({ message: '이용약관 동의(필수)가 필요합니다.' }) }),
        // TODO: 만 14세 미만은 법정대리인 동의 절차 필요 — 현재는 만 14세 이상만 가입 허용
        ageOver14: z.literal(true, { errorMap: () => ({ message: '만 14세 이상만 가입할 수 있습니다.' }) }),
        // [선택] 동의 — 미동의해도 가입 가능
        consentAnalytics: z.boolean().default(false),
        consentMarketing: z.boolean().default(false),
      }).refine((d) => d.email || d.phone, { message: '이메일 또는 전화번호가 필요합니다.' }),
    )
    .mutation(async ({ ctx, input }) => {
      const { password, consentPrivacy, consentTerms, ageOver14, consentAnalytics, consentMarketing, ...userData } = input;

      if (userData.email) {
        const existing = await ctx.db.user.findUnique({ where: { email: userData.email } });
        if (existing) throw new TRPCError({ code: 'CONFLICT', message: tErr(ctx, 'emailInUse') });
      }

      const { createHash } = await import('crypto');
      const salt = process.env.PASSWORD_SALT ?? 'maeum-salt';
      const passwordHash = createHash('sha256').update(password + salt).digest('hex');

      const user = await ctx.db.user.create({
        data: {
          ...userData,
          passwordHash,
          consentAnalytics,
          consentMarketing,
          consentAt: new Date(),
          lastSeenAt: new Date(),
          // 항목별 동의 기록 (동의여부 + 일시 + 약관 버전)
          consents: {
            create: [
              { type: 'privacy_required', agreed: true, version: POLICY_VERSION },
              { type: 'terms_required', agreed: true, version: POLICY_VERSION },
              { type: 'age_over_14', agreed: true, version: POLICY_VERSION },
              { type: 'analytics', agreed: consentAnalytics, version: POLICY_VERSION },
              { type: 'marketing', agreed: consentMarketing, version: POLICY_VERSION },
            ],
          },
        },
      });

      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const session = await ctx.db.session.create({ data: { userId: user.id, expiresAt } });

      // 전환 연결(stitching): 익명 방문자 → 가입 완료
      await recordConversion(ctx.db, { anonymousId: ctx.anonymousId, userId: user.id, type: 'signup_completed' });

      return { user: { id: user.id, name: user.name, role: user.role }, sessionToken: session.token };
    }),

  login: publicProcedure
    .input(z.object({
      emailOrPhone: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const parseEmails = (v?: string) =>
        (v ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);

      // 관리자 자격 세트: 화이트리스트(ADMIN_EMAILS*) ↔ 비밀번호(ADMIN_PASSWORD*) 쌍.
      // 접미사로 여러 세트를 둘 수 있다: ADMIN_EMAILS↔ADMIN_PASSWORD, ADMIN_EMAILS2↔ADMIN_PASSWORD2 ...
      // 관리자별 독립 비밀번호를 두기 위함. 이메일/비밀번호는 소스에 박지 않고 환경변수로만 관리한다.
      // ⚠️ 각 ADMIN_PASSWORD*는 강하고 무작위한 값이어야 하며('123456' 등 금지) 평문 하드코딩 금지.
      // TODO(보안 강화): 관리자 로그인 실패 횟수 제한(rate limit/lockout) + 2단계 인증(2FA/TOTP) 도입.
      const adminSets = Object.keys(process.env)
        .filter((k) => /^ADMIN_EMAILS\d*$/.test(k))
        .map((k) => ({
          emails: parseEmails(process.env[k]),
          password: process.env[`ADMIN_PASSWORD${k.slice('ADMIN_EMAILS'.length)}`] ?? '',
        }));
      const allAdminEmails = new Set(adminSets.flatMap((s) => s.emails));
      const loginId = input.emailOrPhone.trim().toLowerCase();

      // 로그인 이메일이 어떤 세트의 화이트리스트에 있고, 그 세트의 비밀번호와 일치하면 관리자 로그인.
      // 계정이 아직 없어도 즉시 생성하여 관리자 권한을 부여한다.
      const isAdminPasswordLogin = adminSets.some(
        (s) => s.password && input.password === s.password && s.emails.includes(loginId),
      );
      if (isAdminPasswordLogin) {
        let adminUser = await ctx.db.user.findUnique({ where: { email: loginId } });
        if (!adminUser) {
          adminUser = await ctx.db.user.create({
            data: { email: loginId, name: '관리자', role: 'both', lastSeenAt: new Date() },
          });
        }
        await ctx.db.user.update({ where: { id: adminUser.id }, data: { lastSeenAt: new Date() } });
        await ctx.db.admin.upsert({
          where: { userId: adminUser.id },
          create: { userId: adminUser.id },
          update: {},
        });

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const session = await ctx.db.session.create({ data: { userId: adminUser.id, expiresAt } });

        await ctx.db.accessLog.create({
          data: {
            userId: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
            ipAddress: ctx.clientIp ?? null,
            userAgent: ctx.clientUserAgent ?? null,
            path: '/login (admin)',
          },
        });

        await recordConversion(ctx.db, { anonymousId: ctx.anonymousId, userId: adminUser.id, type: 'first_login' });

        return {
          user: { id: adminUser.id, name: adminUser.name, role: adminUser.role },
          sessionToken: session.token,
        };
      }

      const user = await ctx.db.user.findFirst({
        where: {
          OR: [
            { email: input.emailOrPhone },
            { phone: input.emailOrPhone },
          ],
        },
      });

      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED', message: tErr(ctx, 'invalidCredentials') });

      const { createHash } = await import('crypto');
      const salt = process.env.PASSWORD_SALT ?? 'maeum-salt';
      const inputHash = createHash('sha256').update(input.password + salt).digest('hex');

      const isDemoLogin = process.env.NODE_ENV !== 'production' && input.password === 'demo';
      const isValidPassword = user.passwordHash ? user.passwordHash === inputHash : isDemoLogin;

      if (!isValidPassword) {
        console.error(`[auth.login] 비밀번호 불일치 userId=${user.id}`);
        throw new TRPCError({ code: 'UNAUTHORIZED', message: tErr(ctx, 'invalidCredentials') });
      }

      await ctx.db.user.update({ where: { id: user.id }, data: { lastSeenAt: new Date() } });

      // 어느 관리자 세트(ADMIN_EMAILS*)든 화이트리스트에 있으면 Admin 테이블에 자동 추가 (부트스트랩)
      if (user.email && allAdminEmails.has(user.email.toLowerCase())) {
        await ctx.db.admin.upsert({
          where: { userId: user.id },
          create: { userId: user.id },
          update: {},
        });
      }

      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const session = await ctx.db.session.create({ data: { userId: user.id, expiresAt } });

      // 동의한 사용자만 식별 정보를 포함한 접속 로그 기록
      await ctx.db.accessLog.create({
        data: {
          userId: user.id,
          email: user.consentAnalytics ? user.email : null,
          name: user.consentAnalytics ? user.name : null,
          ipAddress: user.consentAnalytics ? (ctx.clientIp ?? null) : null,
          userAgent: user.consentAnalytics ? (ctx.clientUserAgent ?? null) : null,
          path: '/login',
        },
      });

      // 전환 연결(stitching): 익명 방문자 → 로그인 도달 (이미 전환된 anon이면 1건만)
      await recordConversion(ctx.db, { anonymousId: ctx.anonymousId, userId: user.id, type: 'first_login' });

      return { user: { id: user.id, name: user.name, role: user.role }, sessionToken: session.token };
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.sessionToken) {
      await ctx.db.session.deleteMany({ where: { token: ctx.sessionToken } });
    }
    return { success: true };
  }),

  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId },
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true, locale: true, consentAnalytics: true, lastSeenAt: true },
    });
    if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
    return user;
  }),

  // 로그인 사용자의 선택 언어를 프로필에 저장 → 기기 간 유지
  setLocale: protectedProcedure
    .input(z.object({ locale: z.enum(['ko', 'en']) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({ where: { id: ctx.userId }, data: { locale: input.locale } });
      return { ok: true, locale: input.locale };
    }),
});
