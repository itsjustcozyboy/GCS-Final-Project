import type { prisma as PrismaType } from '@maeum/db';
import { createAIClient } from '@maeum/ai';
import { CHAPTERS } from '@maeum/shared';

type DB = typeof PrismaType;

export async function generateBook(db: DB, connectionId: string, editionType: 'interim' | 'final') {
  const connection = await db.connection.findUniqueOrThrow({
    where: { id: connectionId },
    include: {
      questions: {
        where: { sentAt: { not: null } },
        include: { answer: true },
        orderBy: { sentAt: 'asc' },
      },
    },
  });

  const ai = createAIClient();
  const chapterData: Record<string, { markdown: string; followupQuestions: string[] }> = {};

  for (const chapterName of CHAPTERS) {
    const chapterQuestions = connection.questions.filter(
      (q) => q.chapterTag === chapterName && q.answer && !q.answer.skipped,
    );

    if (chapterQuestions.length === 0) {
      chapterData[chapterName] = {
        markdown: `## ${chapterName}\n\n아직 이야기가 모이지 않았습니다.`,
        followupQuestions: [`${chapterName}에 대한 이야기를 들려주실 수 있어요?`],
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
