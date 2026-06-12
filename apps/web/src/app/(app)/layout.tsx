'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trpc } from '@/lib/trpc';

const NAV = [
  { href: '/feed', icon: '📬', label: '피드' },
  { href: '/today', icon: '❓', label: '오늘의 질문' },
  { href: '/book', icon: '📖', label: '책' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: adminData } = trpc.admin.isAdmin.useQuery();

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--color-background)' }}>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/feed" className="text-lg font-bold" style={{ color: 'var(--color-primary-dark)' }}>
          💌 마음 잇기
        </Link>
        <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
          👤
        </Link>
      </header>

      {/* 콘텐츠 */}
      <main className="max-w-lg mx-auto px-4 py-6">{children}</main>

      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors"
              style={{ color: active ? 'var(--color-primary)' : '#9B9B9B' }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
