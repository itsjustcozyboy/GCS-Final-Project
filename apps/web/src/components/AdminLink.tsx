'use client';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { useEffect, useState } from 'react';

export function AdminLink() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // sessionToken이 없으면 쿼리를 실행하지 않음
  const hasToken = mounted && typeof window !== 'undefined' && !!localStorage.getItem('sessionToken');
  const { data } = trpc.admin.isAdmin.useQuery(undefined, { enabled: hasToken });

  if (!data?.isAdmin) return null;

  return (
    <Link
      href="/admin"
      className="block w-full py-3 rounded-2xl text-center text-sm font-medium border-2 transition-colors hover:bg-opacity-10"
      style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
    >
      🔐 관리자 대시보드
    </Link>
  );
}
