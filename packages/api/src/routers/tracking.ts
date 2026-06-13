import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { recordVisit } from '../services/funnel';

const utmStr = z.string().max(200).optional();

export const trackingRouter = router({
  // 방문 기록 — 두 단계로 나눠 적재한다(개인정보 최소수집).
  //  1) 익명 비식별: anonymousId 쿠키 기준 VisitorEvent/Visitor (UTM·기기·ipHash). 동의 전에도 수집.
  //  2) 식별: 로그인 + 분석수집 동의(consentAnalytics) 사용자만 AccessLog에 원문 IP·이름·이메일 기록.
  log: publicProcedure
    .input(z.object({
      path: z.string().max(512),
      referrer: z.string().max(1024).optional(),
      utmSource: utmStr,
      utmMedium: utmStr,
      utmCampaign: utmStr,
      utmContent: utmStr,
      utmTerm: utmStr,
      fbclid: utmStr,
      gclid: utmStr,
    }))
    .mutation(async ({ ctx, input }) => {
      // (1) 익명 퍼널 적재 — 서버에서 anonymousId(쿠키)·IP·UA로 신뢰성 있게 기록
      await recordVisit(ctx.db, {
        anonymousId: ctx.anonymousId,
        path: input.path,
        referrer: input.referrer ?? null,
        utm: {
          source: input.utmSource,
          medium: input.utmMedium,
          campaign: input.utmCampaign,
          content: input.utmContent,
          term: input.utmTerm,
        },
        fbclid: input.fbclid ?? null,
        gclid: input.gclid ?? null,
        ip: ctx.clientIp ?? null,
        userAgent: ctx.clientUserAgent ?? null,
      });

      // (2) 식별 단계 — 로그인 사용자만. 원문 IP·이름·이메일은 분석수집 동의자에 한해 저장.
      if (ctx.userId) {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.userId },
          select: { email: true, name: true, consentAnalytics: true },
        });
        await ctx.db.user.update({ where: { id: ctx.userId }, data: { lastSeenAt: new Date() } });

        const consented = !!user?.consentAnalytics;
        await ctx.db.accessLog.create({
          data: {
            userId: ctx.userId,
            email: consented ? (user?.email ?? null) : null,
            name: consented ? (user?.name ?? null) : null,
            ipAddress: consented ? (ctx.clientIp ?? null) : null,
            userAgent: consented ? (ctx.clientUserAgent ?? null) : null,
            path: input.path,
            referrer: input.referrer || null,
          },
        });
      }

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
