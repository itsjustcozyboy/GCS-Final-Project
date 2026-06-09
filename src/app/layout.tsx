import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "사후관리 서비스",
  description: "유가족을 위한 상속·행정·가족 협력 지원",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        <PostHogInit />
        {children}
      </body>
    </html>
  );
}
