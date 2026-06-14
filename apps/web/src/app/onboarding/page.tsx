'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import { trackCompleteRegistration } from '@/components/MarketingPixels';

type Step = 'role' | 'info' | 'connect' | 'done';
type ConsentKey = 'privacy' | 'terms' | 'age14' | 'analytics' | 'marketing';

const CONSENT_META: Array<{ key: ConsentKey; required: boolean; link?: string; hasDesc: boolean }> = [
  { key: 'privacy', required: true, link: '/privacy', hasDesc: true },
  { key: 'terms', required: true, link: '/terms', hasDesc: false },
  { key: 'age14', required: true, hasDesc: true },
  { key: 'analytics', required: false, link: '/privacy', hasDesc: true },
  { key: 'marketing', required: false, hasDesc: false },
];

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation('onboarding');
  const { t: tc } = useTranslation('common');
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'child' | 'parent'>('child');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [consents, setConsents] = useState({
    privacy: false, terms: false, age14: false, analytics: false, marketing: false,
  });
  const [inviteCode, setInviteCode] = useState('');
  const [tone, setTone] = useState<'light' | 'deep'>('light');
  const [error, setError] = useState('');

  const requiredConsented = consents.privacy && consents.terms && consents.age14;
  const allConsented = requiredConsented && consents.analytics && consents.marketing;

  const createInvite = trpc.connection.createInvite.useMutation({
    onSuccess(data) { setInviteCode(data.code); setError(''); },
    onError(err) { setError(err.message); },
  });
  const acceptInvite = trpc.connection.acceptInvite.useMutation({
    onSuccess() { setError(''); setStep('done'); },
    onError(err) { setError(err.message); },
  });
  const register = trpc.auth.register.useMutation({
    onSuccess(data) {
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('userId', data.user.id);
      queryClient.clear();
      trackCompleteRegistration();
      setStep('connect');
      if (role === 'child') createInvite.mutate({ tone });
    },
    onError(err) { setError(err.message); },
  });

  if (step === 'role') {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-8 sm:px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-8">
          <button onClick={() => router.push('/')} className="min-h-11 text-gray-400 text-sm">{tc('actions.back')}</button>
          <div className="text-center space-y-2 break-keep">
            <div className="text-4xl sm:text-5xl">💌</div>
            <h1 className="text-2xl font-bold leading-snug" style={{ color: 'var(--color-primary-dark)' }}>{t('role.title')}</h1>
            <p className="text-gray-500 text-sm leading-relaxed">{t('role.subtitle')}</p>
          </div>
          <div className="space-y-3">
            {[
              { value: 'child', icon: '👶', title: t('role.child.title'), desc: t('role.child.desc') },
              { value: 'parent', icon: '👴', title: t('role.parent.title'), desc: t('role.parent.desc') },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setRole(opt.value as 'child' | 'parent'); setStep('info'); }}
                className="w-full min-h-16 flex items-start gap-3 sm:gap-4 p-4 rounded-2xl bg-white border-2 text-left transition-all hover:shadow-md"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="shrink-0 text-2xl sm:text-3xl">{opt.icon}</span>
                <div className="min-w-0 break-keep">
                  <p className="font-semibold text-gray-900 leading-snug">{opt.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (step === 'info') {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-8 sm:px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-6">
          <button onClick={() => setStep('role')} className="min-h-11 text-gray-400 text-sm">{tc('actions.back')}</button>
          <h2 className="text-xl font-bold text-gray-900 leading-snug break-keep">{t('info.title')}</h2>

          <div className="space-y-4">
            {[
              { key: 'name', type: 'text' },
              { key: 'email', type: 'email' },
              { key: 'password', type: 'password' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t(`info.${f.key}.label`)}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full min-h-12 px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none"
                  placeholder={t(`info.${f.key}.placeholder`)}
                />
              </div>
            ))}

            {role === 'child' && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">{t('info.tone.label')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'light', label: t('info.tone.light.label'), desc: t('info.tone.light.desc') },
                    { value: 'deep', label: t('info.tone.deep.label'), desc: t('info.tone.deep.desc') },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTone(opt.value as 'light' | 'deep')}
                      className="min-h-16 p-3 rounded-xl border-2 text-center text-sm transition-all break-keep"
                      style={{ borderColor: tone === opt.value ? 'var(--color-primary)' : 'var(--color-border)', backgroundColor: tone === opt.value ? '#EFF7F2' : 'white' }}
                    >
                      <div className="font-medium leading-snug">{opt.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 개인정보 수집·이용 동의 (필수/선택 분리) */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer pb-2 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={allConsented}
                  onChange={(e) => {
                    const v = e.target.checked;
                    setConsents({ privacy: v, terms: v, age14: v, analytics: v, marketing: v });
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                  aria-label={t('consent.all')}
                />
                <span className="text-sm font-semibold text-gray-800 break-keep">{t('consent.all')}</span>
              </label>

              {CONSENT_META.map((item) => (
                <div key={item.key}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consents[item.key]}
                      onChange={(e) => setConsents((p) => ({ ...p, [item.key]: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 accent-[var(--color-primary)]"
                      aria-label={t(`consent.${item.key}.label`)}
                    />
                    <span className="min-w-0 text-sm text-gray-700 flex-1 leading-relaxed break-keep">
                      <strong className={item.required ? 'text-red-500' : 'text-gray-400'}>
                        [{item.required ? t('consent.required') : t('consent.optional')}]
                      </strong>{' '}
                      {t(`consent.${item.key}.label`)}
                      {item.link && (
                        <>
                          {' '}
                          <a href={item.link} target="_blank" className="underline" style={{ color: 'var(--color-primary)' }}>
                            {t('consent.viewFull')}
                          </a>
                        </>
                      )}
                    </span>
                  </label>
                  {item.hasDesc && <p className="text-xs text-gray-400 pl-7 mt-0.5 leading-relaxed break-keep">{t(`consent.${item.key}.desc`)}</p>}
                </div>
              ))}
            </div>

            {!requiredConsented && (
              <p className="text-xs text-gray-400 leading-relaxed break-keep">{t('consent.requiredNotice')}</p>
            )}

            {error && <p className="text-sm text-red-500 leading-relaxed break-keep">{error}</p>}

            <button
              onClick={() =>
                register.mutate({
                  ...form,
                  role,
                  consentPrivacy: true,
                  consentTerms: true,
                  ageOver14: true,
                  consentAnalytics: consents.analytics,
                  consentMarketing: consents.marketing,
                })
              }
              disabled={register.isPending || !requiredConsented}
              className="w-full min-h-12 px-4 py-3 rounded-2xl text-white font-semibold text-base sm:text-lg transition-opacity hover:opacity-90 disabled:opacity-50 break-keep"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {register.isPending ? t('info.submitting') : requiredConsented ? t('info.continue') : t('info.needConsent')}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 'connect') {
    const normalizedInviteCode = inviteCode.replace(/[\s-]/g, '').toUpperCase();
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-8 sm:px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-6">
          <div className="text-center space-y-2 break-keep">
            <div className="text-4xl">🔗</div>
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {role === 'child' ? t('connect.child.title') : t('connect.parent.title')}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {role === 'child' ? t('connect.child.subtitle') : t('connect.parent.subtitle')}
            </p>
          </div>

          {role === 'child' ? (
            <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 text-center space-y-4">
              <p className="text-sm text-gray-500">{t('connect.child.codeLabel')}</p>
              <div className="text-2xl sm:text-3xl font-bold tracking-[0.16em] sm:tracking-[0.25em] text-gray-900 font-mono break-all">
                {createInvite.isPending ? t('connect.generating') : inviteCode || '--------'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => createInvite.mutate({ tone, regenerate: true })}
                  disabled={createInvite.isPending}
                  className="flex-1 min-h-11 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-50"
                >
                  {t('connect.regenerate')}
                </button>
                {inviteCode ? (
                  <CopyButton
                    value={inviteCode}
                    className="flex-1 min-h-11 px-3 py-2 rounded-xl text-white text-sm font-semibold"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                ) : (
                  <button
                    disabled
                    className="flex-1 min-h-11 px-3 py-2 rounded-xl text-white text-sm font-semibold opacity-50"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {tc('actions.copy')}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('connect.parent.codeLabel')}</label>
              <input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full min-h-12 px-4 py-3 rounded-xl border border-gray-200 text-base font-mono tracking-widest text-center"
                placeholder="XXXXXXXX"
                maxLength={12}
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500 leading-relaxed break-keep">{error}</p>}

          <div className="space-y-3">
            {role === 'parent' && (
              <button
                onClick={() => acceptInvite.mutate({ inviteCode: normalizedInviteCode })}
                disabled={acceptInvite.isPending || normalizedInviteCode.length < 4}
                className="w-full min-h-12 px-4 py-3 rounded-2xl text-white font-semibold text-base sm:text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {acceptInvite.isPending ? t('connect.connecting') : t('connect.connect')}
              </button>
            )}
            <button
              onClick={() => setStep('done')}
              className="w-full min-h-12 px-4 py-3 rounded-2xl text-gray-500 font-medium break-keep"
            >
              {role === 'child' ? t('connect.child.sent') : t('connect.parent.later')}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // done
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-8 sm:px-6" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-sm w-full text-center space-y-8">
        <div className="text-5xl sm:text-6xl animate-bounce">🎉</div>
        <div className="space-y-2 break-keep">
          <h2 className="text-2xl font-bold leading-snug" style={{ color: 'var(--color-primary-dark)' }}>{t('done.title')}</h2>
          <p className="text-gray-500 leading-relaxed">
            {role === 'child' ? t('done.child') : t('done.parent')}
          </p>
        </div>
        <button
          onClick={() => router.push('/feed')}
          className="w-full min-h-12 px-4 py-3 rounded-2xl text-white font-semibold text-base sm:text-lg"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {t('done.goFeed')}
        </button>
      </div>
    </main>
  );
}
