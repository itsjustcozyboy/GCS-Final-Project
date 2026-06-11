import { z } from 'zod';
import { router, protectedProcedure } from '../trpc.js';
import { TRPCError } from '@trpc/server';
import { sendDailyQuestion } from '../services/question-engine.js';

export const questionRouter = router({
  // 오늘의 질문 가져오기 (부모용)
  today: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.connectionId } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      // 오늘 이미 발송된 질문이 있으면 반환
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const existing = await ctx.db.question.findFirst({
        where: {
          connectionId: input.connectionId,
          sentAt: { gte: today },
        },
        include: { answer: true },
      });

      return existing;
    }),

  // 질문 목록 (자식 피드용)
  list: protectedProcedure
    .input(z.object({
      connectionId: z.string(),
      cursor: z.string().optional(),
      limit: z.number().int().min(1).max(50).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.connectionId } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const questions = await ctx.db.question.findMany({
        where: {
          connectionId: input.connectionId,
          sentAt: { not: null },
          ...(input.cursor ? { id: { lt: input.cursor } } : {}),
        },
        include: {
          answer: { include: { reactions: { include: { user: { select: { id: true, name: true } } } } } },
        },
        orderBy: { sentAt: 'desc' },
        take: input.limit + 1,
      });

      const hasMore = questions.length > input.limit;
      return {
        questions: questions.slice(0, input.limit),
        nextCursor: hasMore ? questions[input.limit - 1].id : undefined,
      };
    }),

  // 수동 발송 트리거 (개발·테스트용)
  send: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return sendDailyQuestion(ctx.db, input.connectionId);
    }),
});
