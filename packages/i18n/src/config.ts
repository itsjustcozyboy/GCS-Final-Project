// 지원 로케일 정의 — 여기에 코드만 추가하면 언어 확장 가능 (확장성 핵심).
export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

// 기본 언어: 한국어. 누락 키는 항상 ko로 폴백.
export const defaultLocale: Locale = 'ko';

// 번역 네임스페이스 — 화면/도메인 단위로 분리.
export const namespaces = [
  'common', 'onboarding', 'feed', 'today', 'book',
  'profile', 'legal', 'faq', 'inquiry', 'admin', 'auth', 'errors',
] as const;
export type Namespace = (typeof namespaces)[number];

// 로케일 저장 쿠키/스토리지 키 (웹·모바일 공통 규약)
export const LOCALE_COOKIE = 'maeum_locale';
export const LOCALE_STORAGE_KEY = 'maeum_locale';

export function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (locales as readonly string[]).includes(v);
}
