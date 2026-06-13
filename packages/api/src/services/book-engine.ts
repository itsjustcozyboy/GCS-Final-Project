import type { prisma as PrismaType } from '@maeum/db';
import { createAIClient } from '@maeum/ai';
import type { Language } from '@maeum/ai';
import { CHAPTERS_BY_LOCALE } from '@maeum/shared';

type DB = typeof PrismaType;

function languageFromLocale(locale?: string | null): Language {
  return locale === 'en' ? 'en' : 'ko';
}

export async function generateBook(db: DB, connectionId: string, editionType: 'interim' | 'final') {
  const connection = await db.connection.findUniqueOrThrow({
    where: { id: connectionId },
    include: {
      fromUser: { select: { locale: true } },
      questions: {
        where: { sentAt: { not: null } },
        include: { answer: true },
        orderBy: { sentAt: 'asc' },
      },
    },
  });

  const ai = createAIClient();
  const chapterData: Record<string, { markdown: string; followupQuestions: string[] }> = {};
  const language = languageFromLocale(connection.fromUser.locale);
  const emptyMessage = language === 'en' ? 'No stories have gathered yet.' : '아직 이야기가 모이지 않았습니다.';
  const baseChapters = [...CHAPTERS_BY_LOCALE[language]];
  const chapterNames = [
    ...new Set([
      ...baseChapters,
      ...connection.questions.map((q) => q.chapterTag).filter((tag): tag is string => !!tag),
    ]),
  ];

  for (const chapterName of chapterNames) {
    // 비공개 답변은 책에서 제외 (부모가 공개로 전환하면 다음 판부터 포함)
    const chapterQuestions = connection.questions.filter(
      (q) => q.chapterTag === chapterName && q.answer && !q.answer.skipped && !q.answer.isPrivate,
    );

    if (chapterQuestions.length === 0) {
      chapterData[chapterName] = {
        markdown: `## ${chapterName}\n\n${emptyMessage}`,
        followupQuestions: [
          language === 'en'
            ? `Could you share a story about "${chapterName}"?`
            : `${chapterName}에 대한 이야기를 들려주실 수 있어요?`,
        ],
      };
      continue;
    }

    const styleSample = chapterQuestions
      .slice(0, 3)
      .map((q) => q.answer?.body ?? '')
      .filter(Boolean)
      .join('\n');

    const result = await ai.editBookChapter({
      chapterName,
      answers: chapterQuestions.map((q) => ({
        question: q.body,
        answer: q.answer?.body ?? q.answer?.transcript ?? '',
        format: q.answer?.format ?? 'text',
      })),
      styleSample,
      language,
    });

    chapterData[chapterName] = result;
  }

  const edition = await db.bookEdition.create({
    data: {
      connectionId,
      rangeFrom: connection.questions[0]?.sentAt ?? new Date(),
      rangeTo: editionType === 'interim' ? new Date() : undefined,
      status: 'generated',
      editionType,
      chapterData,
    },
  });

  return edition;
}
