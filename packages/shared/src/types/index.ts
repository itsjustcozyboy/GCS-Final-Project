export type Role = 'child' | 'parent' | 'both';
export type Tone = 'light' | 'deep';
export type SensitiveStatus = 'active' | 'paused_health' | 'deceased' | 'memorial';
export type AnswerFormat = 'text' | 'photo' | 'video' | 'audio';
export type BookStatus = 'draft' | 'generated' | 'delivered';
export type BookEditionType = 'interim' | 'final';
export type QuestionSource = 'ai' | 'curated' | 'followup' | 'custom';
export type QuestionDepth = 1 | 2 | 3 | 4 | 5;
export type ResponseChannel = 'app' | 'kakao' | 'sms';

export interface QuestionTags {
  chapter: string;
  person?: string;
  era?: string;
}
