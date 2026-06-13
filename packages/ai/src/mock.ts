import type {
  AIClient,
  QuestionContext,
  QuestionOutput,
  BookChapterInput,
  BookChapterOutput,
  QuestionFromKeywordsInput,
  AnswerFromKeywordsInput,
  AnswerFromKeywordsOutput,
  AnswerGuideInput,
  AnswerGuideOutput,
  Language,
} from './client';
import type { QuestionDepth } from '@maeum/shared';

const MOCK_QUESTIONS: Record<Language, Record<QuestionDepth, QuestionOutput>> = {
  ko: {
    1: { question: '어릴 때 제일 좋아한 반찬은 뭐였어요?', suggestedFormat: 'text', depth: 1, tags: { chapter: '유년기' } },
    2: { question: '지금 제일 아끼는 물건을 하나 사진 찍어 보내줄 수 있어요? 왜 그게 소중해요?', suggestedFormat: 'photo', depth: 2, tags: { chapter: '지금의 나' } },
    3: { question: '배우자를 처음 만났을 때 기억나요? 첫인상이 어땠어요?', suggestedFormat: 'text', depth: 3, tags: { chapter: '연애·결혼' } },
    4: { question: '살면서 제일 잘한 선택이 뭐라고 생각해요?', suggestedFormat: 'text', depth: 4, tags: { chapter: '지금의 나' } },
    5: { question: '나한테 꼭 해주고 싶은 말이 있어요? 평소에 하기 어려웠던 것도요.', suggestedFormat: 'text', depth: 5, tags: { chapter: '너에게' } },
  },
  en: {
    1: { question: 'What was your favorite dish to eat when you were little?', suggestedFormat: 'text', depth: 1, tags: { chapter: 'Childhood' } },
    2: { question: 'Could you take a photo of something you treasure most right now? Why is it special to you?', suggestedFormat: 'photo', depth: 2, tags: { chapter: 'Who you are now' } },
    3: { question: 'Do you remember the first time you met your spouse? What was your first impression?', suggestedFormat: 'text', depth: 3, tags: { chapter: 'Love & marriage' } },
    4: { question: 'What do you think is the best choice you ever made in life?', suggestedFormat: 'text', depth: 4, tags: { chapter: 'Who you are now' } },
    5: { question: "Is there something you've always wanted to tell me — even something that was hard to say?", suggestedFormat: 'text', depth: 5, tags: { chapter: 'To you' } },
  },
};

function englishKeyword(keyword: string): string {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(keyword) ? 'that memory' : keyword;
}

export class MockAIClient implements AIClient {
  async transcribeAudio(_input: { mediaUrl: string; mimeType?: string }): Promise<{ text: string; isMock: boolean }> {
    console.log('[MockAI] transcribeAudio 호출 (Mock 응답) — TODO: 실제 STT 연동');
    return {
      text: '(음성 답변이 도착했어요 — 자동 글 변환은 준비 중이에요. 재생 버튼을 눌러 들어보세요.)',
      isMock: true,
    };
  }

  async generateQuestion(ctx: QuestionContext): Promise<QuestionOutput> {
    console.log('[MockAI] generateQuestion 호출 (Mock 응답)');
    const depth = Math.max(1, Math.min(5, ctx.currentDepth)) as QuestionDepth;
    return { ...MOCK_QUESTIONS[ctx.language ?? 'ko'][depth] };
  }

  async generateQuestionFromKeywords(input: QuestionFromKeywordsInput): Promise<QuestionOutput> {
    console.log('[MockAI] generateQuestionFromKeywords 호출 (Mock 응답)');
    const lang = input.language ?? 'ko';
    const main = input.keywords[0] ?? (lang === 'en' ? 'a memory' : '추억');
    const rest = input.keywords.slice(1);
    if (lang === 'en') {
      const safeMain = englishKeyword(main);
      const safeRest = rest.map(englishKeyword);
      const question = input.tone === 'deep'
        ? `When you think of ${safeMain}${safeRest.length ? ` (and ${safeRest.join(', ')})` : ''}, what scene comes to mind first? I'd love to hear that story.`
        : `Does ${safeMain} bring back any memories?${safeRest.length ? ` I'm curious about ${safeRest.join(', ')} too.` : ''}`;
      return { question, suggestedFormat: 'text', depth: 2, tags: { chapter: 'Who you are now' } };
    }
    const question = input.tone === 'deep'
      ? `${main}${rest.length ? `(그리고 ${rest.join(', ')})` : ''} 하면 어떤 장면이 가장 먼저 떠오르세요? 그때 이야기를 들려주세요.`
      : `${main} 하면 떠오르는 추억이 있으세요?${rest.length ? ` ${rest.join(', ')} 이야기도 궁금해요.` : ''}`;
    return { question, suggestedFormat: 'text', depth: 2, tags: { chapter: '지금의 나' } };
  }

  async composeAnswerFromKeywords(input: AnswerFromKeywordsInput): Promise<AnswerFromKeywordsOutput> {
    console.log('[MockAI] composeAnswerFromKeywords 호출 (Mock 응답)');
    const kws = input.keywords.filter((k) => k.trim());
    if (kws.length === 0) return { answer: '' };
    if ((input.language ?? 'ko') === 'en') {
      const opening = `Now that you ask, a few things come back to me.`;
      const middle = kws.map((kw, i) => {
        if (i === 0) return `The first thing I think of is ${kw} — I can still picture it clearly.`;
        if (i === kws.length - 1 && kws.length > 1) return `And I can't leave out ${kw}; even if I can't put it all into words, it stays with me.`;
        return `${kw} comes back too. Looking back, those were precious times.`;
      }).join(' ');
      const closing = `Writing this down, I miss those days all over again. Thank you for asking.`;
      return { answer: `${opening} ${middle} ${closing}` };
    }
    const opening = `그 질문을 받고 보니 몇 가지가 떠오르네.`;
    const middle = kws.map((kw, i) => {
      if (i === 0) return `먼저 생각나는 건 ${kw}(이)야. 그때 일이 아직도 눈에 선해.`;
      if (i === kws.length - 1 && kws.length > 1) return `그리고 ${kw}(이)라는 것도 빼놓을 수 없지. 말로 다 못 해도 마음에 오래 남아 있어.`;
      return `${kw}(이)도 기억나. 지금 생각하면 참 소중한 시간이었어.`;
    }).join(' ');
    const closing = `이렇게 적고 보니 새삼 그 시절이 그립구나. 네가 물어봐 줘서 고마워.`;
    return { answer: `${opening} ${middle} ${closing}` };
  }

  async suggestAnswerGuide(input: AnswerGuideInput): Promise<AnswerGuideOutput> {
    console.log('[MockAI] suggestAnswerGuide 호출 (Mock 응답)');
    if ((input.language ?? 'ko') === 'en') {
      return { guides: [
        { format: 'text', title: '✍️ Answer in writing', tip: "It doesn't have to be perfect. Even one scene that comes to mind is plenty.", starter: 'When I look back on that time...' },
        { format: 'photo', title: '📸 Answer with a photo', tip: 'Snap an old photo or something you have now. One picture can say a thousand words.' },
        { format: 'audio', title: '🎤 Answer by voice', tip: "If writing feels like a chore, just speak naturally. Your everyday voice is the best answer." },
        { format: 'video', title: '🎥 Answer with a video', tip: 'If there’s something you’d like to show, a short clip is great. 30 seconds is enough.' },
      ] };
    }
    return { guides: [
      { format: 'text', title: '✍️ 글로 답하기', tip: '완벽한 문장이 아니어도 괜찮아요. 떠오르는 장면 하나만 적어도 충분해요.', starter: '그때를 떠올려 보면...' },
      { format: 'photo', title: '📸 사진으로 답하기', tip: '관련된 옛날 사진이나 지금의 물건을 한 장 찍어서 보내보세요. 사진 한 장이 천 마디 말을 대신해요.' },
      { format: 'audio', title: '🎤 목소리로 답하기', tip: '글쓰기가 번거로우면 말로 편하게 남겨보세요. 평소 말투 그대로가 가장 좋은 답이에요.' },
      { format: 'video', title: '🎥 영상으로 답하기', tip: '직접 보여주고 싶은 게 있다면 짧은 영상도 좋아요. 30초면 충분해요.' },
    ] };
  }

  async editBookChapter(input: BookChapterInput): Promise<BookChapterOutput> {
    console.log('[MockAI] editBookChapter 호출 (Mock 응답)');
    const en = (input.language ?? 'ko') === 'en';
    const lines = input.answers
      .filter((a) => !a.answer.startsWith('SKIP'))
      .map((a) => `**Q. ${a.question}**\n\n${a.answer}`)
      .join('\n\n---\n\n');
    const emptyMsg = en ? 'No stories have gathered yet.' : '아직 이야기가 모이지 않았습니다.';
    return {
      markdown: `## ${input.chapterName}\n\n${lines || emptyMsg}`,
      followupQuestions: en
        ? [`Could you tell me more about the most memorable moment in “${input.chapterName}”?`, 'Who was by your side back then?']
        : [`${input.chapterName}에서 가장 기억에 남는 장면을 더 자세히 들을 수 있을까요?`, '그때 곁에 있었던 사람은 누구예요?'],
    };
  }
}
