import { resources } from './resources';
import { defaultLocale, type Locale, type Namespace } from './config';

/* eslint-disable @typescript-eslint/no-explicit-any */
function getPath(obj: any, path: string): unknown {
  return path.split('.').reduce<any>((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

// 서버 컴포넌트/비-React 컨텍스트용 번역 함수. 누락 시 ko 폴백, 그래도 없으면 키 반환.
export function translate(
  locale: Locale,
  ns: Namespace,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const pick = (loc: Locale) => getPath((resources as any)[loc]?.[ns], key);
  let val = pick(locale);
  if (val == null && locale !== defaultLocale) val = pick(defaultLocale);
  if (typeof val !== 'string') return key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      val = (val as string).replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(v));
    }
  }
  return val as string;
}
