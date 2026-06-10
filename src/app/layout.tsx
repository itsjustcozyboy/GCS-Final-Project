import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "사후관리 서비스",
  description: "유가족을 위한 상속·행정·가족 협력 지원",
  // 기본은 비색인(통합 메뉴·PC2/PC3·관리자는 데모/내부용).
  // 실제 사용자 진입점인 pc1-quiz만 자체 layout에서 색인 허용한다.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[color:var(--color-canvas)] text-[color:var(--color-ink)]">
        {/* React 19가 <head>로 자동 hoist. Pretendard 폰트 로드 (noonnu 스타일). */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          precedence="default"
        />
        <PostHogInit />
        {children}
      </body>
    </html>
  );
}
