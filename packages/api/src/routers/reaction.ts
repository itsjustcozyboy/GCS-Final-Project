import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const reactionRouter = router({
  add: protectedProcedure
    .input(z.object({
      answerId: z.string(),
      emoji: z.string().max(10).optional(),
      comment: z.string().max(500).optional(),
      isFollowup: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const answer = await ctx.db.answer.findUnique({
        where: { id: input.answerId },
        include: { question: { include: { connection: true } } },
      });
      if (!answer) throw new TRPCError({ code: 'NOT_FOUND' });

      // 자식(toUser)만 반응 가능
      if (answer.question.connection.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const reaction = await ctx.db.reaction.create({
        data: { ...input, userId: ctx.userId },
      });

      // 되묻기: 후속 질문 큐에 추가
      if (input.isFollowup && input.comment) {
        await ctx.db.question.create({
          data: {
            connectionId: answer.question.connectionId,
            body: input.comment,
            depth: answer.question.depth,
            chapterTag: answer.question.chapterTag ?? '지금의 나',
            source: 'followup',
          },
        });
      }

      return reaction;
    }),

  // 부모에게 반응 알림 목록
  forParent: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.connectionId } });
      if (!conn || conn.fromUserId !== ctx.userId) throw new TRPCError({ code: 'FORBIDDEN' });

      return ctx.db.reaction.findMany({
        where: {
          answer: { question: { connectionId: input.connectionId } },
          notified: false,
        },
        include: {
          user: { select: { name: true } },
          answer: { include: { question: { select: { body: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }),

  markNotified: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.reaction.updateMany({
        where: { id: { in: input.ids } },
        data: { notified: true },
      });
      return { updated: input.ids.length };
    }),
});
