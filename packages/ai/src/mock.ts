import type { AIClient, QuestionContext, QuestionOutput, BookChapterInput, BookChapterOutput } from './client';
import type { QuestionDepth } from '@maeum/shared';

const MOCK_QUESTIONS: Record<QuestionDepth, QuestionOutput> = {
  1: {
    question: '어릴 때 제일 좋아한 반찬은 뭐였어요?',
    suggestedFormat: 'text',
    depth: 1,
    tags: { chapter: '유년기' },
  },
  2: {
    question: '지금 제일 아끼는 물건을 하나 사진 찍어 보내줄 수 있어요? 왜 그게 소중해요?',
    suggestedFormat: 'photo',
    depth: 2,
    tags: { chapter: '지금의 나' },
  },
  3: {
    question: '배우자를 처음 만났을 때 기억나요? 첫인상이 어땠어요?',
    suggestedFormat: 'text',
    depth: 3,
    tags: { chapter: '연애·결혼' },
  },
  4: {
    question: '살면서 제일 잘한 선택이 뭐라고 생각해요?',
    suggestedFormat: 'text',
    depth: 4,
    tags: { chapter: '지금의 나' },
  },
  5: {
    question: '나한테 꼭 해주고 싶은 말이 있어요? 평소에 하기 어려웠던 것도요.',
    suggestedFormat: 'text',
    depth: 5,
    tags: { chapter: '너에게' },
  },
};

export class MockAIClient implements AIClient {
  async generateQuestion(ctx: QuestionContext): Promise<QuestionOutput> {
    console.log('[MockAI] generateQuestion 호출 (Mock 응답)');
    const depth = Math.max(1, Math.min(5, ctx.currentDepth)) as QuestionDepth;
    return { ...MOCK_QUESTIONS[depth] };
  }

  async editBookChapter(input: BookChapterInput): Promise<BookChapterOutput> {
    console.log('[MockAI] editBookChapter 호출 (Mock 응답)');
    const lines = input.answers
      .filter((a) => !a.answer.startsWith('SKIP'))
      .map((a) => `**Q. ${a.question}**\n\n${a.answer}`)
      .join('\n\n---\n\n');

    return {
      markdown: `## ${input.chapterName}\n\n${lines || '아직 이야기가 모이지 않았습니다.'}`,
      followupQuestions: [
        `${input.chapterName}에서 가장 기억에 남는 장면을 더 자세히 들을 수 있을까요?`,
        '그때 곁에 있었던 사람은 누구예요?',
      ],
    };
  }
}
