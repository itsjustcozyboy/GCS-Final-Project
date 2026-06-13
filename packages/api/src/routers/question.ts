import { z } from 'zod';
import { router, protectedProcedure, type Context } from '../trpc';
import { TRPCError } from '@trpc/server';
import { sendDailyQuestion, deliverQuestion, calcNextDepth } from '../services/question-engine';
import { createAIClient } from '@maeum/ai';
import type { Language } from '@maeum/ai';

type AnswerWithRelations = {
  id: string;
  questionId: string;
  format: string;
  body: string | null;
  mediaUrl: string | null;
  transcript: string | null;
  skipped: boolean;
  receivedVia: string;
  isPrivate: boolean;
  keywords: string[];
  aiComposed: boolean;
  createdAt: Date;
  updatedAt: Date;
  reactions?: unknown[];
};

// 비공개 답변은 작성자(부모)가 아니면 내용을 가린다
function maskAnswer<T extends AnswerWithRelations>(
  answer: T | null,
  viewerId: string,
  authorId: string,
): (T & { masked?: boolean }) | null {
  if (!answer) return null;
  if (!answer.isPrivate || viewerId === authorId) return answer;
  return {
    ...answer,
    body: null,
    mediaUrl: null,
    transcript: null,
    keywords: [],
    reactions: [],
    masked: true,
  };
}

function languageFromLocale(locale?: string | null): Language {
  return locale === 'en' ? 'en' : 'ko';
}

function questionLanguage(requestLocale?: string | null, targetLocale?: string | null): Language {
  return languageFromLocale(requestLocale ?? targetLocale);
}

async function getOwnedConnection(db: Context['db'], connectionId: string, userId: string) {
  const conn = await db.connection.findUnique({
    where: { id: connectionId },
    include: { fromUser: { select: { id: true, name: true, locale: true } } },
  });
  if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
  if (conn.fromUserId !== userId && conn.toUserId !== userId) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return conn;
}

export const questionRouter = router({
  // 오늘의 질문 가져오기 (부모용)
  today: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await getOwnedConnection(ctx.db, input.connectionId, ctx.userId);

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

      if (!existing) return null;
      return {
        ...existing,
        answer: maskAnswer(existing.answer, ctx.userId, conn.fromUserId),
      };
    }),

  // 질문 목록 (피드용) — 비공개 답변은 자녀에게 마스킹
  list: protectedProcedure
    .input(z.object({
      connectionId: z.string(),
      cursor: z.string().optional(),
      limit: z.number().int().min(1).max(50).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const conn = await getOwnedConnection(ctx.db, input.connectionId, ctx.userId);

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
        questions: questions.slice(0, input.limit).map((q) => ({
          ...q,
          answer: maskAnswer(q.answer, ctx.userId, conn.fromUserId),
        })),
        nextCursor: hasMore ? questions[input.limit - 1].id : undefined,
      };
    }),

  // (1) AI 추천 질문 3개 — 큐레이션 풀 + AI 생성
  suggest: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await getOwnedConnection(ctx.db, input.connectionId, ctx.userId);
      const language = questionLanguage(ctx.locale, conn.fromUser.locale);

      const depth = calcNextDepth(conn.currentDepth, conn.skipCount, conn.answerCount);
      const sent = await ctx.db.question.findMany({
        where: { connectionId: conn.id, sentAt: { not: null } },
        select: { body: true },
      });
      const usedBodies = sent.map((q) => q.body);

      // 큐레이션 풀에서 현재 깊이 ±1 범위의 미사용 질문
      const curated = await ctx.db.curatedQuestion.findMany({
        where: {
          language,
          depth: { gte: Math.max(1, depth - 1), lte: Math.min(5, depth + 1) },
          body: { notIn: usedBodies },
        },
        take: 12,
      });
      // 가볍게 섞어서 2개 선택
      const shuffled = curated.sort(() => Math.random() - 0.5).slice(0, 2);

      // AI 생성 1개
      const ai = createAIClient();
      const recentAnswers = await ctx.db.answer.findMany({
        where: { question: { connectionId: conn.id }, skipped: false, body: { not: null } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { body: true },
      });
      const generated = await ai.generateQuestion({
        parentName: conn.fromUser?.name ?? '부모님',
        intimacy: conn.intimacy,
        hasConflict: conn.hasConflict,
        tone: conn.tone,
        currentDepth: depth,
        recentAnswerSummary: recentAnswers.map((a) => a.body).filter(Boolean).join('. ') || undefined,
        language,
      });

      const suggestions = [
        {
          body: generated.question,
          depth: generated.depth,
          chapterTag: generated.tags.chapter,
          source: 'ai' as const,
        },
        ...shuffled.map((c) => ({
          body: c.body,
          depth: c.depth,
          chapterTag: c.chapterTag,
          source: 'curated' as const,
        })),
      ];

      // 중복 제거
      const seen = new Set<string>();
      return suggestions.filter((s) => {
        if (seen.has(s.body)) return false;
        seen.add(s.body);
        return true;
      });
    }),

  // (2) 키워드 → AI 질문 생성 (저장하지 않고 초안만 반환)
  generateFromKeywords: protectedProcedure
    .input(z.object({
      connectionId: z.string(),
      keywords: z.array(z.string().min(1).max(30)).min(1).max(8),
    }))
    .mutation(async ({ ctx, input }) => {
      const conn = await getOwnedConnection(ctx.db, input.connectionId, ctx.userId);
      const language = questionLanguage(ctx.locale, conn.fromUser.locale);

      const ai = createAIClient();
      const generated = await ai.generateQuestionFromKeywords({
        keywords: input.keywords,
        parentName: conn.fromUser?.name ?? '부모님',
        tone: conn.tone,
        language,
      });

      return {
        body: generated.question,
        depth: generated.depth,
        chapterTag: generated.tags.chapter,
        source: 'ai' as const,
      };
    }),

  // (1)(2)(3) 공용: 확정된 질문 본문을 발송
  sendCustom: protectedProcedure
    .input(z.object({
      connectionId: z.string(),
      body: z.string().min(2).max(500),
      depth: z.number().int().min(1).max(5).default(2),
      chapterTag: z.string().max(30).optional(),
      source: z.enum(['ai', 'curated', 'custom']).default('custom'),
    }))
    .mutation(async ({ ctx, input }) => {
      const conn = await getOwnedConnection(ctx.db, input.connectionId, ctx.userId);
      const language = questionLanguage(ctx.locale, conn.fromUser.locale);
      return deliverQuestion(ctx.db, input.connectionId, {
        body: input.body,
        depth: input.depth,
        chapterTag: input.chapterTag ?? (language === 'en' ? 'Who you are now' : '지금의 나'),
        source: input.source,
      });
    }),

  // 자동 발송 트리거 (기존 — 오늘의 질문 자동 선택)
  send: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await getOwnedConnection(ctx.db, input.connectionId, ctx.userId);
      return sendDailyQuestion(ctx.db, input.connectionId);
    }),
});
