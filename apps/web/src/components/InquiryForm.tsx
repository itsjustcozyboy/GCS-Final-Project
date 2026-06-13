'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';

const CATEGORY_VALUES = ['', 'bug', 'feature', 'payment', 'privacy', 'etc'] as const;

type Category = 'bug' | 'feature' | 'payment' | 'privacy' | 'etc';

// 서비스 문의 폼 — FAQ 하단. 비로그인도 제출 가능, 로그인 시 이메일 자동 채움.
export function InquiryForm() {
  const { t } = useTranslation('inquiry');
  const { t: tc } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'' | Category>('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — 사람 눈에 보이지 않음
  const [done, setDone] = useState(false);

  // 로그인 사용자는 계정 이메일 자동 채움 (수정 가능). 비로그인이면 쿼리 비활성화.
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('sessionToken');
  const me = trpc.auth.me.useQuery(undefined, { enabled: hasToken, retry: false });
  useEffect(() => {
    if (me.data?.email && !email) setEmail(me.data.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.data?.email]);

  const submit = trpc.inquiry.submit.useMutation({
    onSuccess: () => {
      setDone(true);
      setMessage('');
      setCategory('');
    },
  });

  const canSubmit = email.includes('@') && message.trim().length >= 10 && !submit.isPending;

  if (done) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 p-6 text-center space-y-3">
        <div className="text-4xl" aria-hidden>📬</div>
        <p className="text-lg font-bold text-gray-900">{t('doneTitle')}</p>
        <p className="text-base text-gray-500">{t('doneBody')}</p>
        <button
          onClick={() => setDone(false)}
          className="text-sm underline text-gray-400 hover:text-gray-600"
        >
          {t('doneAnother')}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{t('title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      <div>
        <label htmlFor="inquiry-email" className="block text-base font-medium text-gray-700 mb-1">
          {t('emailLabel')} <span className="text-red-500" aria-hidden>*</span>
        </label>
        <input
          id="inquiry-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none"
          placeholder="answer@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="inquiry-category" className="block text-base font-medium text-gray-700 mb-1">
          {t('categoryLabel')}
        </label>
        <select
          id="inquiry-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as '' | Category)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base bg-white focus:outline-none"
        >
          {CATEGORY_VALUES.map((c) => (
            <option key={c} value={c}>{c === '' ? t('category.placeholder') : t(`category.${c}`)}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="inquiry-message" className="block text-base font-medium text-gray-700 mb-1">
          {t('messageLabel')} <span className="text-red-500" aria-hidden>*</span>
        </label>
        <textarea
          id="inquiry-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
          style={{ minHeight: '120px' }}
          placeholder={t('messagePlaceholder')}
        />
        {message.trim().length > 0 && message.trim().length < 10 && (
          <p className="text-xs text-gray-400 mt-1">{t('tooShort')}</p>
        )}
      </div>

      {/* honeypot — 봇 차단용 숨김 필드 */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
      />

      {submit.isError && (
        <p className="text-sm text-red-500" role="alert">
          {submit.error.message || t('submitError')}
        </p>
      )}

      <button
        onClick={() => submit.mutate({
          email: email.trim(),
          category: category || undefined,
          message: message.trim(),
          website: website || undefined,
        })}
        disabled={!canSubmit}
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold disabled:opacity-50"
        style={{ backgroundColor: 'var(--color-primary)' }}
        aria-label={t('submit')}
      >
        {submit.isPending ? t('submitting') : t('submit')}
      </button>

      <p className="text-xs text-gray-400">
        {t('privacyNotePre')}
        <Link href="/privacy" className="underline">{tc('legalLinks.privacy')}</Link>{t('privacyNotePost')}
      </p>
    </div>
  );
}
