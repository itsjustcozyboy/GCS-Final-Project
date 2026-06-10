import Link from 'next/link';

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

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <span className="chip mb-4">Fake Door MVP</span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[color:var(--color-ink)] mb-3 mt-2">
        유가족 사후관리 서비스
      </h1>
      <p className="text-[color:var(--color-muted)] text-base mb-10 leading-relaxed">
        상속·행정·가족 협력 서비스의 수요를 측정하는 9개 테스트 라우트
      </p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {FD_LIST.map((fd) => (
          <li key={fd.id}>
            <Link
              href={fd.path}
              className="card flex items-center justify-between px-5 py-4 transition-colors hover:border-[color:var(--color-brand)] group"
            >
              <span className="text-sm font-medium text-[color:var(--color-ink)] group-hover:text-[color:var(--color-brand)]">
                {fd.label}
              </span>
              <span className="text-[color:var(--color-muted)] text-xs font-mono">{fd.id}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 pt-6 border-t border-[color:var(--color-line)]">
        <Link href="/admin" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]">
          관리자 대시보드 →
        </Link>
      </div>
    </main>
  );
}
