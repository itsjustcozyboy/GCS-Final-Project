'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '@/lib/trpc';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/feed';
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');

  const login = trpc.auth.login.useMutation({
    onSuccess(data) {
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('userId', data.user.id);
      router.push(next);
    },
    onError(err) {
      setError(err.message);
    },
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-sm w-full space-y-6">
        <div className="text-center space-y-1">
          <Link href="/" className="text-3xl">💌</Link>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>로그인</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 또는 전화번호</label>
            <input
              type="text"
              value={form.emailOrPhone}
              onChange={(e) => setForm((p) => ({ ...p, emailOrPhone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-base"
              style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
              placeholder="이메일 또는 010-xxxx-xxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-base"
              placeholder="비밀번호"
            />
            {process.env.NODE_ENV !== 'production' && (
              <p className="text-xs text-gray-400 mt-1">개발 환경: 비밀번호 "demo" 입력</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={() => login.mutate(form)}
            disabled={login.isPending}
            className="w-full py-4 rounded-2xl text-white text-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {login.isPending ? '로그인 중...' : '로그인'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          계정이 없으신가요?{' '}
          <Link href="/onboarding" className="font-medium" style={{ color: 'var(--color-primary)' }}>
            가입하기
          </Link>
        </p>
      </div>
    </main>
  );
}
