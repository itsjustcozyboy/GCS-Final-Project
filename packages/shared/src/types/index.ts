export type Role = 'child' | 'parent' | 'both';
export type Tone = 'light' | 'deep';
export type SensitiveStatus = 'active' | 'paused_health' | 'deceased' | 'memorial';
export type AnswerFormat = 'text' | 'photo' | 'video' | 'audio';
export type BookStatus = 'draft' | 'generated' | 'delivered';
export type BookEditionType = 'interim' | 'final';
export type QuestionSource = 'ai' | 'curated' | 'followup' | 'custom';
export type QuestionDepth = 1 | 2 | 3 | 4 | 5;
export type ResponseChannel = 'app' | 'kakao' | 'sms';

// 약관·개인정보 처리방침 버전 — 문서 개정 시 함께 올린다 (동의 기록에 저장됨)
export const POLICY_VERSION = 'v1.0 (2026-06-12)';

export interface QuestionTags {
  chapter: string;
  person?: string;
  era?: string;
}
