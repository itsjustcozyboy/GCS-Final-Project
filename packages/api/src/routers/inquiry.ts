import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { adminProcedure } from './admin';
import { TRPCError } from '@trpc/server';
import { sendInquiryNotification } from '../services/mailer';

// 간단한 인메모리 rate limit — 동일 IP/사용자당 10분에 3건
// (서버리스 인스턴스별로 독립이지만 최소한의 남용 방지선. TODO: 운영 강화 시 Upstash 등 외부 스토어)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const submitLog = new Map<string, number[]>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (submitLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  submitLog.set(key, recent);
  return true;
}

export const inquiryRouter = router({
  // 문의 제출 — 비로그인도 허용
  submit: publicProcedure
    .input(z.object({
      email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
      category: z.enum(['bug', 'feature', 'payment', 'privacy', 'etc']).optional(),
      message: z.string().trim().min(10, { message: '문의 내용을 10자 이상 적어주세요.' }).max(5000),
      website: z.string().max(0).optional(), // honeypot — 봇이 채우면 거부
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.website) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: '요청을 처리할 수 없어요.' });
      }

      const rateKey = ctx.userId ?? ctx.clientIp ?? 'anonymous';
      if (!checkRateLimit(rateKey)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: '문의가 너무 자주 접수됐어요. 잠시 후 다시 시도해주세요.',
        });
      }

      // IP·기기 정보는 분석 수집에 동의한 로그인 사용자만 저장 (PIPA 최소수집)
      let consented = false;
      if (ctx.userId) {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.userId },
          select: { consentAnalytics: true },
        });
        consented = !!user?.consentAnalytics;
      }

      const inquiry = await ctx.db.inquiry.create({
        data: {
          userId: ctx.userId ?? null,
          email: input.email,
          category: input.category,
          message: input.message,
          ipAddress: consented ? (ctx.clientIp ?? null) : null,
          userAgent: consented ? (ctx.clientUserAgent ?? null) : null,
        },
      });

      // 관리자 알림 메일 — 실패해도 DB 저장은 유지되고 사용자에게는 접수 성공으로 응답
      const sent = await sendInquiryNotification({
        category: inquiry.category,
        fromEmail: inquiry.email,
        message: inquiry.message,
        userId: inquiry.userId,
        ipAddress: inquiry.ipAddress,
        createdAt: inquiry.createdAt,
      });
      if (sent) {
        await ctx.db.inquiry.update({ where: { id: inquiry.id }, data: { emailSent: true } });
      }

      return { id: inquiry.id };
    }),

  // ── 이하 관리자 전용 ──
  list: adminProcedure
    .input(z.object({
      search: z.string().optional(), // 이메일/내용 검색
      category: z.enum(['bug', 'feature', 'payment', 'privacy', 'etc']).optional(),
      status: z.enum(['new', 'in_progress', 'resolved']).optional(),
      limit: z.number().int().min(1).max(200).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where = {
        ...(input.category ? { category: input.category } : {}),
        ...(input.status ? { status: input.status } : {}),
        ...(input.search
          ? {
              OR: [
                { email: { contains: input.search, mode: 'insensitive' as const } },
                { message: { contains: input.search, mode: 'insensitive' as const } },
              ],
            }
          : {}),
      };

      const inquiries = await ctx.db.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        skip: input.cursor ? 1 : 0,
      });

      let nextCursor: string | undefined;
      if (inquiries.length > input.limit) {
        nextCursor = inquiries.pop()!.id;
      }

      const counts = await ctx.db.inquiry.groupBy({ by: ['status'], _count: { _all: true } });
      const statusCounts = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));

      return { inquiries, nextCursor, statusCounts };
    }),

  setStatus: adminProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['new', 'in_progress', 'resolved']),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.inquiry.update({ where: { id: input.id }, data: { status: input.status } });
    }),

  deleteMany: adminProcedure
    .input(z.object({ ids: z.array(z.string()).min(1).max(200) }))
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.db.inquiry.deleteMany({ where: { id: { in: input.ids } } });
      await ctx.db.adminAudit.create({
        data: { adminId: ctx.userId, action: 'delete_inquiries', targetIds: input.ids },
      });
      return { deletedCount: count };
    }),
});
