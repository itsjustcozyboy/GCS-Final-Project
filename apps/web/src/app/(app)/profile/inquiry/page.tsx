import Link from 'next/link';
import type { Metadata } from 'next';
import { InquiryForm } from '@/components/InquiryForm';

export const metadata: Metadata = { title: '서비스 문의 — 마음 잇기' };

// 서비스 문의 독립 페이지. 폼·DB 저장·관리자 알림 로직은 InquiryForm을 그대로 재사용한다.
export default function InquiryPage() {
  return (
    <div className="space-y-5">
      <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-600">← 내 정보</Link>

      <div>
        <h2 className="text-lg font-bold text-gray-900">서비스 문의</h2>
        <p className="text-sm text-gray-500 mt-1">불편한 점이나 궁금한 점을 남겨주세요. 입력하신 이메일로 답변드려요.</p>
      </div>

      <InquiryForm />

      <p className="text-center text-xs text-gray-400">
        이메일로 직접 문의하셔도 돼요:{' '}
        <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>
    </div>
  );
}
