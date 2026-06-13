import { cookies, headers } from 'next/headers';
import { resolveLocale, LOCALE_COOKIE, translate, type Locale, type Namespace } from '@maeum/i18n';

export async function getLocale(): Promise<Locale> {
  const c = await cookies();
  const h = await headers();
  return resolveLocale({ cookie: c.get(LOCALE_COOKIE)?.value, acceptLanguage: h.get('accept-language') });
}

// 서버 컴포넌트용 t(). const t = await getServerT('common'); t('key', { name })
export async function getServerT(ns: Namespace) {
  const locale = await getLocale();
  return (key: string, vars?: Record<string, string | number>) => translate(locale, ns, key, vars);
}
