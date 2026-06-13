'use client';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/lib/useLocale';
import { locales } from '@maeum/i18n';

// KO / EN 세그먼트 토글. 헤더·마이페이지·랜딩 공용.
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { t } = useTranslation('common');
  const { locale, setLocale } = useLocale();
  return (
    <div
      className={`inline-flex rounded-full border border-gray-200 bg-white p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label={t('language.toggleAria')}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className="min-h-8 px-2.5 py-1 rounded-full transition-colors"
          style={locale === l ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: '#9B9B9B' }}
        >
          {l === 'ko' ? 'KO' : 'EN'}
        </button>
      ))}
    </div>
  );
}
