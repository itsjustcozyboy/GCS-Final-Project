'use client';
import i18n, { type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, defaultLocale, namespaces, type Locale } from '@maeum/i18n';

// 클라이언트/SSR 공용 i18next 인스턴스. 리소스를 번들에 포함(동기 init)해
// 서버 첫 렌더와 클라이언트 첫 렌더의 로케일이 일치 → 하이드레이션 불일치 방지.
export function createI18n(locale: Locale): I18nInstance {
  const instance = i18n.createInstance();
  instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: defaultLocale, // 누락 키는 항상 ko로 폴백
    supportedLngs: ['ko', 'en'],
    ns: namespaces as unknown as string[],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false,
    saveMissing: process.env.NODE_ENV !== 'production',
    missingKeyHandler: (lngs, ns, key) => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[i18n] missing key → ${ns}:${key} (requested: ${lngs.join(',')}) — ko로 폴백됨`);
      }
    },
  });
  return instance;
}
