'use client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { data: me, isLoading } = trpc.auth.me.useQuery();
  const { data: adminData } = trpc.admin.isAdmin.useQuery();

  const logout = trpc.auth.logout.useMutation({
    onSettled: () => {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('userId');
      // 사용자 종속 캐시를 모두 비운다 — 다음 로그인 계정이 이전 계정 데이터를 보지 않도록.
      queryClient.clear();
      router.push('/');
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-40 text-gray-400"><span className="animate-spin text-2xl">🌀</span></div>;
  }

  const roleLabel = me?.role === 'parent' ? t('role.parent') : me?.role === 'child' ? t('role.child') : t('role.both');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{t('heading')}</h2>
        <LanguageToggle />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">👤</div>
          <div>
            <p className="font-semibold text-gray-900">{me?.name ?? '-'}</p>
            <p className="text-sm text-gray-400">{roleLabel}</p>
          </div>
        </div>

        <dl className="space-y-2 text-sm border-t border-gray-100 pt-4">
          <div className="flex justify-between">
            <dt className="text-gray-400">{t('email')}</dt>
            <dd className="text-gray-700">{me?.email ?? '-'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">{t('phone')}</dt>
            <dd className="text-gray-700">{me?.phone ?? '-'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">{t('consentLabel')}</dt>
            <dd className="text-gray-700">{me?.consentAnalytics ? t('consentYes') : t('consentNo')}</dd>
          </div>
        </dl>
      </div>

      {/* 약관·정책·도움말 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 divide-y divide-gray-100">
        {[
          { href: '/terms', icon: '📄', label: tc('legalLinks.terms') },
          { href: '/privacy', icon: '🔐', label: tc('legalLinks.privacy') },
          { href: '/faq', icon: '❓', label: tc('legalLinks.faq') },
          { href: '/profile/inquiry', icon: '💬', label: tc('legalLinks.inquiry') },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-5 py-4 text-base text-gray-700 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </span>
            <span className="text-gray-300" aria-hidden>›</span>
          </Link>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center">
        {tc('contactLabel')} <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>

      {adminData?.isAdmin && (
        <button
          onClick={() => router.push('/admin')}
          className="w-full py-3 rounded-2xl text-sm font-medium border-2"
          style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
        >
          {t('adminDashboard')}
        </button>
      )}

      <button
        onClick={() => logout.mutate()}
        disabled={logout.isPending}
        className="w-full py-3 rounded-2xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
      >
        {logout.isPending ? t('loggingOut') : t('logout')}
      </button>
    </div>
  );
}
