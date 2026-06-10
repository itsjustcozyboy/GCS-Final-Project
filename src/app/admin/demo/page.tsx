import Link from 'next/link';
import type { Metadata } from 'next';
import { getActiveTiers, tierOf } from '@/lib/active';

// 내부 데모용 전체 MVP 메뉴(공개 진입점 아님). noindex.
export const metadata: Metadata = {
  title: '내부 데모 — 전체 MVP',
  robots: { index: false, follow: false },
};

const FD_LIST = [
  { id: 'pc1-quiz', label: 'PC1-1 상속 리스크 자가진단', path: '/fd/pc1-quiz' },
  { id: 'pc1-preorder', label: 'PC1-2 전문가 리포트 사전예약', path: '/fd/pc1-preorder' },
  { id: 'pc2-checklist', label: 'PC2-1 맞춤 체크리스트 생성', path: '/fd/pc2-checklist' },
  { id: 'pc2-subscribe', label: 'PC2-2 행정 알림 구독', path: '/fd/pc2-subscribe' },
  { id: 'pc2-kakao', label: 'PC2-3 카카오 컨시어지', path: '/fd/pc2-kakao' },
  { id: 'pc3-settle', label: 'PC3-1 부의금 정산기', path: '/fd/pc3-settle' },
  { id: 'pc3-board', label: 'PC3-2 가족 역할 보드', path: '/fd/pc3-board' },
  { id: 'pc3-content', label: 'PC3-3 정보 콘텐츠', path: '/fd/pc3-content/burial-fund-split' },
];

export default function DemoMenuPage() {
  const active = getActiveTiers();
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <span className="chip mb-4">내부 데모 · 비공개</span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[color:var(--color-ink)] mb-3 mt-2">
        전체 MVP 메뉴
      </h1>
      <p className="text-[color:var(--color-muted)] text-base mb-2 leading-relaxed">
        상속·행정·가족 협력 서비스의 수요를 측정하는 테스트 라우트 (내부 검토용).
      </p>
      <p className="text-xs text-[color:var(--color-muted)] mb-10">
        현재 공개(ACTIVE_PCS): <span className="font-mono text-[color:var(--color-brand-dark)]">{active.join(', ')}</span> · 그 외 티어는 프로덕션에서 루트로 리다이렉트됩니다.
      </p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {FD_LIST.map((fd) => {
          const isActive = active.includes(tierOf(fd.id)!);
          return (
            <li key={fd.id}>
              <Link
                href={fd.path}
                className="card flex items-center justify-between px-5 py-4 transition-colors hover:border-[color:var(--color-brand)] group"
              >
                <span className="text-sm font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-brand)]">
                  {fd.label}
                </span>
                <span className="flex items-center gap-2">
                  {isActive ? (
                    <span className="chip">공개</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-400 text-xs px-2.5 py-1">비공개</span>
                  )}
                  <span className="text-[color:var(--color-muted)] text-xs font-mono">{fd.id}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 pt-6 border-t border-[color:var(--color-line)]">
        <Link href="/admin" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]">
          관리자 대시보드 →
        </Link>
      </div>
    </main>
  );
}
