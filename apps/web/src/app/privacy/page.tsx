import type { Metadata } from 'next';
import { getLocale } from '@/lib/i18n-server';
import { resources } from '@maeum/i18n';
import { LegalDoc, type LegalContent } from '@/components/LegalDoc';

// 본 처리방침 초안은 법률 자문(변호사 검토)을 대체하지 않습니다.
// TODO: legal review for non-KR jurisdictions — 개인정보 보호책임자·수탁자 확정 후 전체 검토
export const metadata: Metadata = { title: '개인정보 처리방침 — 토닥 / Privacy — To-dak' };

export default async function PrivacyPage() {
  const locale = await getLocale();
  const L = resources[locale].legal;
  return (
    <LegalDoc
      locale={locale}
      backLink={L.backLink}
      disclaimer={L.disclaimer}
      content={L.privacy as unknown as LegalContent}
      crossLinkHref="/terms"
      crossLinkLabel={resources[locale].common.legalLinks.terms}
    />
  );
}
