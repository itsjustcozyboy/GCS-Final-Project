'use client';

import PreorderOffer from '@/components/PreorderOffer';

// PC1-2 사전예약. 독립 진입점이 아니며(루트 layout 기본 noindex 상속),
// 실제 사용자 흐름은 pc1-quiz 결과 화면에 임베드된 PreorderOffer로 이어진다.
// 이 라우트는 디자인 미리보기/QA 용도로만 유지한다.
export default function Pc1PreorderPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <PreorderOffer />
    </main>
  );
}
