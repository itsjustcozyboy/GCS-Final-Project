import { locales, defaultLocale, isLocale, type Locale } from './config';

// Accept-Language 헤더에서 q-가중치 순으로 지원 로케일을 고른다.
export function parseAcceptLanguage(header?: string | null): Locale | null {
  if (!header) return null;
  const parsed = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      const weight = q ? parseFloat(q.split('=')[1]) : 1;
      return { primary: tag.trim().toLowerCase().split('-')[0], weight: Number.isNaN(weight) ? 1 : weight };
    })
    .sort((a, b) => b.weight - a.weight);
  for (const { primary } of parsed) {
    if (isLocale(primary)) return primary;
  }
  return null;
}

// 우선순위: 명시 선택(쿠키) > Accept-Language 추정 > 기본 ko
export function resolveLocale(input: { cookie?: string | null; acceptLanguage?: string | null }): Locale {
  if (isLocale(input.cookie)) return input.cookie;
  return parseAcceptLanguage(input.acceptLanguage) ?? defaultLocale;
}

export { locales, defaultLocale, isLocale };
export type { Locale };
