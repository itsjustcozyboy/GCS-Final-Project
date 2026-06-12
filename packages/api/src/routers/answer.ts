import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const answerRouter = router({
  // 답변 제출
  submit: protectedProcedure
    .input(z.object({
      questionId: z.string(),
      format: z.enum(['text', 'photo', 'video', 'audio']),
      body: z.string().optional(),
      mediaUrl: z.string().url().optional(),
      transcript: z.string().optional(),
      receivedVia: z.enum(['app', 'kakao', 'sms']).default('app'),
    }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.db.question.findUnique({
        where: { id: input.questionId },
        include: { connection: true },
      });
      if (!question) throw new TRPCError({ code: 'NOT_FOUND' });
      if (question.connection.fromUserId !== ctx.userId && question.connection.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN', message: '본인의 연결에만 답변할 수 있습니다.' });
      }

      const answer = await ctx.db.answer.upsert({
        where: { questionId: input.questionId },
        create: { ...input, skipped: false },
        update: { ...input, skipped: false },
      });

      // 응답 카운터 업데이트
      await ctx.db.connection.update({
        where: { id: question.connectionId },
        data: { answerCount: { increment: 1 } },
      });

      return answer;
    }),

  // 건너뛰기
  skip: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.db.question.findUnique({
        where: { id: input.questionId },
        include: { connection: true },
      });
      if (!question) throw new TRPCError({ code: 'NOT_FOUND' });
      if (question.connection.fromUserId !== ctx.userId && question.connection.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const answer = await ctx.db.answer.upsert({
        where: { questionId: input.questionId },
        create: { questionId: input.questionId, format: 'text', skipped: true },
        update: { skipped: true },
      });

      await ctx.db.connection.update({
        where: { id: question.connectionId },
        data: { skipCount: { increment: 1 } },
      });

      return answer;
    }),
});
