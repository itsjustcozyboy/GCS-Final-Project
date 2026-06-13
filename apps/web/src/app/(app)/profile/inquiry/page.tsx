import Link from 'next/link';
import type { Metadata } from 'next';
import { InquiryForm } from '@/components/InquiryForm';
import { getServerT } from '@/lib/i18n-server';

export const metadata: Metadata = { title: '서비스 문의 — 마음 잇기 / Contact — Maeum Itgi' };

// 서비스 문의 독립 페이지. 폼·DB 저장·관리자 알림 로직은 InquiryForm을 그대로 재사용한다.
export default async function InquiryPage() {
  const t = await getServerT('inquiry');
  return (
    <div className="space-y-5">
      <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-600">{t('pageBack')}</Link>

      <InquiryForm />

      <p className="text-center text-xs text-gray-400">
        {t('pageEmailHint')}{' '}
        <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>
    </div>
  );
}
