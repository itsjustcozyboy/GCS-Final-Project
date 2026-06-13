'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import { isLocale } from '@maeum/i18n';
import { persistLocaleCookie } from '@/lib/useLocale';

// 로그인 사용자가 프로필에 저장한 언어를 앱 진입 시 적용 → 기기 간 유지.
export function LocaleSync() {
  const { i18n } = useTranslation();
  const { data: me } = trpc.auth.me.useQuery(undefined, { retry: false, staleTime: 60_000 });
  useEffect(() => {
    if (me && isLocale(me.locale) && me.locale !== i18n.language) {
      void i18n.changeLanguage(me.locale);
      persistLocaleCookie(me.locale);
    }
  }, [me, i18n]);
  return null;
}
