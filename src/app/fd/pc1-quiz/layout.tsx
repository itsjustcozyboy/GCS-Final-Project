import type { Metadata } from 'next';

// PC1-1 자가진단 = 유일한 사용자 진입점. 색인 허용 + 공유 OG 메타.
// 클라이언트 컴포넌트(page.tsx)에서 metadata를 export할 수 없어 layout에서 처리한다.
const TITLE = '2분 상속 리스크 자가진단';
const DESCRIPTION = '빚·3개월 기한·재산 파악… 지금 내가 처한 상속 위험 수준을 5문항으로 확인하세요. 개인정보 없이 2분.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'ko_KR',
    siteName: '상속 사후관리 서비스',
    // opengraph-image.tsx가 자동으로 og:image를 채운다.
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Pc1QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
