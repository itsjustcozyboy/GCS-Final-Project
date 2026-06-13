'use client';
import { useTranslation } from 'react-i18next';
import { trpc } from './trpc';
import { LOCALE_COOKIE, LOCALE_STORAGE_KEY, isLocale, defaultLocale, type Locale } from '@maeum/i18n';

const ONE_YEAR = 60 * 60 * 24 * 365;

export function persistLocaleCookie(loc: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE}=${loc}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
  }
}

// 현재 로케일 + 전환기. 전환 시: i18next 즉시 반영 + 쿠키/로컬 저장 + (로그인 시) 프로필 저장.
export function useLocale() {
  const { i18n } = useTranslation();
  const setLocaleMutation = trpc.auth.setLocale.useMutation();
  const locale: Locale = isLocale(i18n.language) ? i18n.language : defaultLocale;

  const setLocale = (loc: Locale) => {
    if (loc === locale) return;
    void i18n.changeLanguage(loc);
    persistLocaleCookie(loc);
    try { localStorage.setItem(LOCALE_STORAGE_KEY, loc); } catch { /* ignore */ }
    if (typeof window !== 'undefined' && localStorage.getItem('sessionToken')) {
      setLocaleMutation.mutate({ locale: loc });
    }
  };

  return { locale, setLocale };
}
