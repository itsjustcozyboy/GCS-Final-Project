'use client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
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

  const roleLabel = me?.role === 'parent' ? '부모 · 이야기를 나누는 사람' : me?.role === 'child' ? '자식 · 이야기를 받는 사람' : '함께';

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">내 정보</h2>

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
            <dt className="text-gray-400">이메일</dt>
            <dd className="text-gray-700">{me?.email ?? '-'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">전화번호</dt>
            <dd className="text-gray-700">{me?.phone ?? '-'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">개인정보 수집 동의</dt>
            <dd className="text-gray-700">{me?.consentAnalytics ? '동의함' : '미동의'}</dd>
          </div>
        </dl>
      </div>

      {/* 약관·정책·도움말 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 divide-y divide-gray-100">
        {[
          { href: '/terms', icon: '📄', label: '이용약관' },
          { href: '/privacy', icon: '🔐', label: '개인정보 처리방침' },
          { href: '/faq', icon: '💬', label: '자주 묻는 질문 (FAQ)' },
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
        문의: <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>

      {adminData?.isAdmin && (
        <button
          onClick={() => router.push('/admin')}
          className="w-full py-3 rounded-2xl text-sm font-medium border-2"
          style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
        >
          🔐 관리자 대시보드
        </button>
      )}

      <button
        onClick={() => logout.mutate()}
        disabled={logout.isPending}
        className="w-full py-3 rounded-2xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
      >
        {logout.isPending ? '로그아웃 중...' : '로그아웃'}
      </button>
    </div>
  );
}
