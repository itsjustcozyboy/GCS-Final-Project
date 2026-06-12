import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// 부모가 먼저 자녀에게 남기는 메시지 ("먼저 마음 전하기")
// 기존 Question/Answer 파이프라인을 재사용:
//  - Question.source = 'parent_message' (피드·책에 그대로 흐름)
//  - Answer.origin   = 'parent_initiated' (질문 응답과 구분)
// 챕터는 '너에게'로 분류되어 책 생성(M5)에 포함된다.
export const messageRouter = router({
  sendToChild: protectedProcedure
    .input(z.object({
      connectionId: z.string(),
      format: z.enum(['text', 'photo', 'video', 'audio']).default('text'),
      body: z.string().max(5000).optional(),
      mediaUrl: z.string().url().optional(),
      transcript: z.string().max(5000).optional(),
      isPrivate: z.boolean().default(false),
    }).refine((d) => (d.body && d.body.trim().length > 0) || d.mediaUrl, {
      message: '전하고 싶은 글이나 사진·영상·음성을 담아주세요.',
    }))
    .mutation(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.connectionId } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      // 부모(fromUser)만 자발 메시지를 보낼 수 있다
      if (conn.fromUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN', message: '부모님만 먼저 마음을 전할 수 있어요.' });
      }

      const question = await ctx.db.question.create({
        data: {
          connectionId: conn.id,
          body: '먼저 전한 마음', // 피드에서는 source로 구분해 별도 카드로 렌더링
          depth: 1,
          chapterTag: '너에게',
          source: 'parent_message',
          sentAt: new Date(),
        },
      });

      const answer = await ctx.db.answer.create({
        data: {
          questionId: question.id,
          origin: 'parent_initiated',
          format: input.format,
          body: input.body?.trim() || null,
          mediaUrl: input.mediaUrl,
          transcript: input.transcript,
          isPrivate: input.isPrivate,
          receivedVia: 'app',
        },
      });

      // TODO: 자녀에게 푸시/채널 알림 발송 — 현재는 피드 polling(30초)으로 전달됨

      return { questionId: question.id, answerId: answer.id };
    }),
});
