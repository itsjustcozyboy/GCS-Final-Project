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

export interface AIClient {
  generateQuestion(ctx: QuestionContext): Promise<QuestionOutput>;
  editBookChapter(input: BookChapterInput): Promise<BookChapterOutput>;
}
