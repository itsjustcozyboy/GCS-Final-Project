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
    <main className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">유가족 사후관리 서비스</h1>
      <p className="text-gray-500 text-sm mb-8">Fake Door MVP — 9개 테스트 라우트</p>
      <ul className="space-y-2">
        {FD_LIST.map((fd) => (
          <li key={fd.id}>
            <Link
              href={fd.path}
              className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{fd.label}</span>
              <span className="text-gray-400 text-xs">{fd.id}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600">
          관리자 대시보드 →
        </Link>
      </div>
    </main>
  );
}
