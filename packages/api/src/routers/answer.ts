import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { createAIClient, RateLimitError } from '@maeum/ai';

export const answerRouter = router({
  // 답변 제출 — 공개/비공개는 부모(작성자)가 선택
  submit: protectedProcedure
    .input(z.object({
      questionId: z.string(),
      format: z.enum(['text', 'photo', 'video', 'audio']),
      body: z.string().optional(),
      mediaUrl: z.string().url().optional(),
      transcript: z.string().optional(),
      receivedVia: z.enum(['app', 'kakao', 'sms']).default('app'),
      isPrivate: z.boolean().default(false),
      keywords: z.array(z.string().max(30)).max(8).default([]),
      aiComposed: z.boolean().default(false),
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

  // (2) 키워드 → AI 답변 합성 (핵심 훅 — 저장하지 않고 초안만 반환, 부모가 수정 후 제출)
  composeFromKeywords: protectedProcedure
    .input(z.object({
      questionId: z.string(),
      keywords: z.array(z.string().min(1).max(30)).min(1).max(8),
    }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.db.question.findUnique({
        where: { id: input.questionId },
        include: { connection: { include: { fromUser: { select: { name: true } } } } },
      });
      if (!question) throw new TRPCError({ code: 'NOT_FOUND' });
      if (question.connection.fromUserId !== ctx.userId && question.connection.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const ai = createAIClient();
      try {
        const composed = await ai.composeAnswerFromKeywords({
          question: question.body,
          keywords: input.keywords,
          parentName: question.connection.fromUser?.name,
        });
        return { draft: composed.answer, keywords: input.keywords };
      } catch (e) {
        // 한도 초과 — 쉬운 말로 안내. 키워드는 화면에 그대로 남아 잠시 후 다시 시도할 수 있다.
        if (e instanceof RateLimitError) {
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: '지금은 이야기를 엮는 요청이 많아요. 적어주신 단어는 그대로 두었으니 잠시 뒤 다시 눌러주세요.',
          });
        }
        throw e;
      }
    }),

  // (1) 질문에 맞는 형식별 답변 가이드
  guide: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const question = await ctx.db.question.findUnique({
        where: { id: input.questionId },
        include: { connection: true },
      });
      if (!question) throw new TRPCError({ code: 'NOT_FOUND' });
      if (question.connection.fromUserId !== ctx.userId && question.connection.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const ai = createAIClient();
      return ai.suggestAnswerGuide({ question: question.body });
    }),

  // 공개/비공개 전환 — 작성자(부모)만 가능
  setVisibility: protectedProcedure
    .input(z.object({ answerId: z.string(), isPrivate: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const answer = await ctx.db.answer.findUnique({
        where: { id: input.answerId },
        include: { question: { include: { connection: true } } },
      });
      if (!answer) throw new TRPCError({ code: 'NOT_FOUND' });
      if (answer.question.connection.fromUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN', message: '답변 작성자만 공개 설정을 바꿀 수 있습니다.' });
      }

      return ctx.db.answer.update({
        where: { id: input.answerId },
        data: { isPrivate: input.isPrivate },
      });
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
