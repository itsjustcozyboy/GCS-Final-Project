import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const trackingRouter = router({
  // 방문 기록 — 로그인 여부와 무관하게 접속 경로/IP/리퍼러/기기 정보를 수집한다.
  // 로그인한 사용자라면 이름·이메일도 함께 남겨 관리자 대시보드에서 식별할 수 있다.
  log: publicProcedure
    .input(z.object({
      path: z.string().max(512),
      referrer: z.string().max(1024).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      let email: string | null = null;
      let name: string | null = null;

      if (ctx.userId) {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.userId },
          select: { email: true, name: true },
        });
        if (user) {
          email = user.email ?? null;
          name = user.name;
        }
        await ctx.db.user.update({
          where: { id: ctx.userId },
          data: { lastSeenAt: new Date() },
        });
      }

      await ctx.db.accessLog.create({
        data: {
          userId: ctx.userId ?? null,
          email,
          name,
          ipAddress: ctx.clientIp ?? null,
          userAgent: ctx.clientUserAgent ?? null,
          path: input.path,
          referrer: input.referrer || null,
        },
      });

      return { ok: true };
    }),

  heartbeat: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({
      where: { id: ctx.userId },
      data: { lastSeenAt: new Date() },
    });

    return { ok: true };
  }),
});
