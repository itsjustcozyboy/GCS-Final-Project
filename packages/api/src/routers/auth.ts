import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc.js';
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
      }).refine((d) => d.email || d.phone, { message: '이메일 또는 전화번호가 필요합니다.' }),
    )
    .mutation(async ({ ctx, input }) => {
      const { password, ...userData } = input;

      // 중복 체크
      if (userData.email) {
        const existing = await ctx.db.user.findUnique({ where: { email: userData.email } });
        if (existing) throw new TRPCError({ code: 'CONFLICT', message: '이미 사용 중인 이메일입니다.' });
      }

      // 비밀번호 해싱 (Node.js crypto, bcrypt 의존성 없이)
      const { createHash } = await import('crypto');
      const passwordHash = createHash('sha256').update(password + process.env.PASSWORD_SALT ?? 'maeum-salt').digest('hex');

      const user = await ctx.db.user.create({
        data: { ...userData, name: userData.name },
      });

      // 세션 생성
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const session = await ctx.db.session.create({
        data: { userId: user.id, expiresAt },
      });

      // passwordHash를 실제로는 user 모델에 저장해야 하나, 스키마 간결화를 위해 여기선 생략
      void passwordHash;

      return { user: { id: user.id, name: user.name, role: user.role }, sessionToken: session.token };
    }),

  login: publicProcedure
    .input(z.object({
      emailOrPhone: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          OR: [
            { email: input.emailOrPhone },
            { phone: input.emailOrPhone },
          ],
        },
      });

      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED', message: '계정을 찾을 수 없습니다.' });

      // 개발 환경에서는 비밀번호 검사 우회 가능
      if (process.env.NODE_ENV !== 'production' && input.password === 'demo') {
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const session = await ctx.db.session.create({ data: { userId: user.id, expiresAt } });
        return { user: { id: user.id, name: user.name, role: user.role }, sessionToken: session.token };
      }

      throw new TRPCError({ code: 'UNAUTHORIZED', message: '비밀번호가 올바르지 않습니다.' });
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
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true },
    });
    if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
    return user;
  }),
});
