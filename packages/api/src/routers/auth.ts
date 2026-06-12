import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        email: z.string().email().optional(),
        phone: z.string().regex(/^010\d{8}$/).optional(),
        role: z.enum(['child', 'parent', 'both']),
        password: z.string().min(6),
        consentAnalytics: z.boolean().default(false),
      }).refine((d) => d.email || d.phone, { message: '이메일 또는 전화번호가 필요합니다.' }),
    )
    .mutation(async ({ ctx, input }) => {
      const { password, consentAnalytics, ...userData } = input;

      if (userData.email) {
        const existing = await ctx.db.user.findUnique({ where: { email: userData.email } });
        if (existing) throw new TRPCError({ code: 'CONFLICT', message: '이미 사용 중인 이메일입니다.' });
      }

      const { createHash } = await import('crypto');
      const salt = process.env.PASSWORD_SALT ?? 'maeum-salt';
      const passwordHash = createHash('sha256').update(password + salt).digest('hex');

      const user = await ctx.db.user.create({
        data: {
          ...userData,
          passwordHash,
          consentAnalytics,
          consentAt: consentAnalytics ? new Date() : null,
          lastSeenAt: new Date(),
        },
      });

      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const session = await ctx.db.session.create({ data: { userId: user.id, expiresAt } });

      return { user: { id: user.id, name: user.name, role: user.role }, sessionToken: session.token };
    }),

  login: publicProcedure
    .input(z.object({
      emailOrPhone: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const adminEmails = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      const adminPassword = process.env.ADMIN_PASSWORD ?? '';
      const loginId = input.emailOrPhone.trim().toLowerCase();

      // 관리자 비밀번호 로그인: ADMIN_EMAILS에 등록된 이메일 + 공용 관리자 비밀번호
      // 계정이 아직 없어도 즉시 생성하여 관리자 권한을 부여한다.
      if (adminPassword && input.password === adminPassword && adminEmails.includes(loginId)) {
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

      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED', message: '이메일 또는 비밀번호가 올바르지 않습니다.' });

      const { createHash } = await import('crypto');
      const salt = process.env.PASSWORD_SALT ?? 'maeum-salt';
      const inputHash = createHash('sha256').update(input.password + salt).digest('hex');

      const isDemoLogin = process.env.NODE_ENV !== 'production' && input.password === 'demo';
      const isValidPassword = user.passwordHash ? user.passwordHash === inputHash : isDemoLogin;

      if (!isValidPassword) {
        console.error(`[auth.login] 비밀번호 불일치 userId=${user.id}`);
        throw new TRPCError({ code: 'UNAUTHORIZED', message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      }

      await ctx.db.user.update({ where: { id: user.id }, data: { lastSeenAt: new Date() } });

      // ADMIN_EMAILS에 등록된 이메일이면 Admin 테이블에 자동 추가 (부트스트랩)
      if (user.email && adminEmails.includes(user.email.toLowerCase())) {
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
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true, consentAnalytics: true, lastSeenAt: true },
    });
    if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
    return user;
  }),
});
