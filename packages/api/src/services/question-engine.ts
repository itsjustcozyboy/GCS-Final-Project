import type { prisma as PrismaType } from '@maeum/db';
import { createAIClient } from '@maeum/ai';
import type { Language } from '@maeum/ai';
import { createChannelAdapter } from '@maeum/channel';
import type { QuestionDepth } from '@maeum/shared';

type DB = typeof PrismaType;

// M6: 발송 게이트 — SensitiveStatus 체크
function isSendBlocked(status: string): boolean {
  return status === 'paused_health' || status === 'deceased' || status === 'memorial';
}

function languageFromLocale(locale?: string | null): Language {
  return locale === 'en' ? 'en' : 'ko';
}

// M2: 적응형 깊이 조정
export function calcNextDepth(
  currentDepth: number,
  skipCount: number,
  answerCount: number,
): QuestionDepth {
  // 최근 응답률이 낮으면 깊이 낮추기
  const recentRatio = answerCount / Math.max(answerCount + skipCount, 1);
  if (recentRatio < 0.4 && currentDepth > 1) return (currentDepth - 1) as QuestionDepth;
  // 응답률이 높으면 점진적으로 깊이 올리기 (max 5, 천천히)
  if (recentRatio > 0.75 && answerCount >= 5 && currentDepth < 5) {
    return (currentDepth + 1) as QuestionDepth;
  }
  return Math.max(1, Math.min(5, currentDepth)) as QuestionDepth;
}

export async function selectQuestion(db: DB, connectionId: string) {
  const connection = await db.connection.findUniqueOrThrow({
    where: { id: connectionId },
    include: {
      fromUser: true,
      questions: {
        where: { sentAt: { not: null } },
        orderBy: { sentAt: 'desc' },
        take: 20,
        include: { answer: true },
      },
    },
  });

  // M6: 발송 게이트
  if (isSendBlocked(connection.sensitiveStatus)) {
    return { blocked: true, reason: connection.sensitiveStatus };
  }

  const language = languageFromLocale(connection.fromUser.locale);
  const depth = calcNextDepth(
    connection.currentDepth,
    connection.skipCount,
    connection.answerCount,
  );

  // 이미 발송된 큐레이션 풀 질문 ID 제외
  const usedBodies = connection.questions.map((q) => q.body);

  // 큐레이션 풀에서 미사용 질문 선택
  const candidate = await db.curatedQuestion.findFirst({
    where: {
      language,
      depth,
      body: { notIn: usedBodies },
    },
    orderBy: { id: 'asc' },
  });

  if (candidate) {
    return {
      blocked: false,
      question: {
        body: candidate.body,
        depth,
        chapterTag: candidate.chapterTag,
        personTag: candidate.personTag ?? undefined,
        eraTag: candidate.eraTag ?? undefined,
        source: 'curated' as const,
      },
    };
  }

  // 큐레이션 풀 소진 시 AI 생성
  const ai = createAIClient();
  const recentAnswers = connection.questions
    .filter((q) => q.answer && !q.answer.skipped)
    .map((q) => q.answer?.body ?? '')
    .filter(Boolean)
    .slice(0, 5)
    .join('. ');

  const skippedTopics = connection.questions
    .filter((q) => q.answer?.skipped)
    .map((q) => q.chapterTag ?? '')
    .filter(Boolean);

  const generated = await ai.generateQuestion({
    parentName: connection.fromUser.name,
    intimacy: connection.intimacy,
    hasConflict: connection.hasConflict,
    tone: connection.tone,
    currentDepth: depth,
    recentAnswerSummary: recentAnswers || undefined,
    recentSkippedTopics: skippedTopics.length ? skippedTopics : undefined,
    language,
  });

  return {
    blocked: false,
    question: {
      body: generated.question,
      depth: generated.depth,
      chapterTag: generated.tags.chapter,
      personTag: generated.tags.person,
      eraTag: generated.tags.era,
      source: 'ai' as const,
    },
  };
}

export interface QuestionPayload {
  body: string;
  depth: number;
  chapterTag?: string | null;
  personTag?: string | null;
  eraTag?: string | null;
  source: 'ai' | 'curated' | 'followup' | 'custom';
}

// 질문 저장 + 채널 발송 (자동 선택/키워드 생성/직접 입력 공용)
export async function deliverQuestion(db: DB, connectionId: string, payload: QuestionPayload) {
  const connection = await db.connection.findUniqueOrThrow({
    where: { id: connectionId },
    include: { fromUser: true },
  });

  if (isSendBlocked(connection.sensitiveStatus)) {
    return { sent: false as const, reason: connection.sensitiveStatus };
  }

  const question = await db.question.create({
    data: {
      connectionId,
      body: payload.body,
      depth: payload.depth,
      chapterTag: payload.chapterTag,
      personTag: payload.personTag,
      eraTag: payload.eraTag,
      source: payload.source,
      sentAt: new Date(),
    },
  });

  const channel = createChannelAdapter(connection.responseChannel as 'app' | 'kakao' | 'sms');
  const target = connection.fromUser.phone ?? connection.fromUser.email ?? 'unknown';
  await channel.send({
    to: target,
    templateId: 'daily_question',
    channel: connection.responseChannel as 'app' | 'kakao' | 'sms',
    variables: { name: connection.fromUser.name, question: question.body, questionId: question.id },
  });

  return { sent: true as const, questionId: question.id, question };
}

export async function sendDailyQuestion(db: DB, connectionId: string) {
  // 자녀의 되묻기(후속 질문) 큐가 있으면 최우선으로 발송
  const pendingFollowup = await db.question.findFirst({
    where: { connectionId, source: 'followup', sentAt: null },
    orderBy: { createdAt: 'asc' },
  });
  if (pendingFollowup) {
    const connection = await db.connection.findUniqueOrThrow({
      where: { id: connectionId },
      include: { fromUser: true },
    });
    if (isSendBlocked(connection.sensitiveStatus)) {
      return { sent: false, reason: connection.sensitiveStatus };
    }
    const question = await db.question.update({
      where: { id: pendingFollowup.id },
      data: { sentAt: new Date() },
    });
    const channel = createChannelAdapter(connection.responseChannel as 'app' | 'kakao' | 'sms');
    await channel.send({
      to: connection.fromUser.phone ?? connection.fromUser.email ?? 'unknown',
      templateId: 'daily_question',
      channel: connection.responseChannel as 'app' | 'kakao' | 'sms',
      variables: { name: connection.fromUser.name, question: question.body, questionId: question.id },
    });
    return { sent: true, questionId: question.id };
  }

  const result = await selectQuestion(db, connectionId);

  if (result.blocked) {
    console.log(`[QuestionEngine] 발송 차단 (${result.reason}): ${connectionId}`);
    return { sent: false, reason: result.reason };
  }

  const delivered = await deliverQuestion(db, connectionId, result.question!);
  if (!delivered.sent) return delivered;

  // 깊이 업데이트
  const connection = await db.connection.findUniqueOrThrow({ where: { id: connectionId } });
  const newDepth = calcNextDepth(connection.currentDepth, connection.skipCount, connection.answerCount);
  await db.connection.update({
    where: { id: connectionId },
    data: { currentDepth: newDepth },
  });

  return { sent: true, questionId: delivered.questionId };
}
