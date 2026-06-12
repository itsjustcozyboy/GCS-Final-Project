import type { QuestionDepth, QuestionTags } from '@maeum/shared';

export interface QuestionContext {
  parentName: string;
  parentAge?: number;
  intimacy: number;
  hasConflict: boolean;
  tone: 'light' | 'deep';
  currentDepth: QuestionDepth;
  recentAnswerSummary?: string;
  recentSkippedTopics?: string[];
  recentWellAnsweredTopics?: string[];
  dayOfWeek?: string;
  season?: string;
}

export interface QuestionOutput {
  question: string;
  suggestedFormat: 'text' | 'photo' | 'video';
  depth: QuestionDepth;
  tags: QuestionTags;
}

export interface BookChapterInput {
  chapterName: string;
  answers: Array<{ question: string; answer: string; format: string }>;
  styleSample?: string;
}

export interface BookChapterOutput {
  markdown: string;
  followupQuestions: string[];
}

// 자녀: 키워드 → 질문 생성
export interface QuestionFromKeywordsInput {
  keywords: string[];
  parentName: string;
  tone: 'light' | 'deep';
}

// 부모: 키워드 → 답변 합성 (핵심 훅 — 낯간지러운 이야기를 키워드만으로)
export interface AnswerFromKeywordsInput {
  question: string;
  keywords: string[];
  parentName?: string;
}

export interface AnswerFromKeywordsOutput {
  answer: string;
}

// 부모: 형식별 답변 가이드 (글/사진/영상/음성)
export interface AnswerGuideInput {
  question: string;
}

export interface AnswerGuideOutput {
  guides: Array<{
    format: 'text' | 'photo' | 'video' | 'audio';
    title: string;
    tip: string;
    starter?: string; // 글 형식일 때 첫 문장 예시
  }>;
}

// 음성 답변 자동 전사 (STT)
export interface TranscribeInput {
  mediaUrl: string;
  mimeType?: string;
}

export interface TranscribeOutput {
  text: string;
  isMock?: boolean; // 실제 전사 엔진이 아닌 자리표시 텍스트인 경우
}

export interface AIClient {
  // TODO: 실제 STT 연동(Whisper API 등) 전까지 Mock으로 동작
  transcribeAudio(input: TranscribeInput): Promise<TranscribeOutput>;
  generateQuestion(ctx: QuestionContext): Promise<QuestionOutput>;
  generateQuestionFromKeywords(input: QuestionFromKeywordsInput): Promise<QuestionOutput>;
  composeAnswerFromKeywords(input: AnswerFromKeywordsInput): Promise<AnswerFromKeywordsOutput>;
  suggestAnswerGuide(input: AnswerGuideInput): Promise<AnswerGuideOutput>;
  editBookChapter(input: BookChapterInput): Promise<BookChapterOutput>;
}
