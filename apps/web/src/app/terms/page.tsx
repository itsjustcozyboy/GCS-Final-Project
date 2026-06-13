import type { Metadata } from 'next';
import { getLocale } from '@/lib/i18n-server';
import { resources } from '@maeum/i18n';
import { LegalDoc, type LegalContent } from '@/components/LegalDoc';

// 본 약관 초안은 법률 자문(변호사 검토)을 대체하지 않습니다.
// TODO: legal review for non-KR jurisdictions — 운영 주체 확정 후 전 조항 검토
export const metadata: Metadata = { title: '이용약관 — 마음 잇기 / Terms — Maeum Itgi' };

export default async function TermsPage() {
  const locale = await getLocale();
  const L = resources[locale].legal;
  return (
    <LegalDoc
      locale={locale}
      backLink={L.backLink}
      disclaimer={L.disclaimer}
      content={L.terms as unknown as LegalContent}
      crossLinkHref="/privacy"
      crossLinkLabel={resources[locale].common.legalLinks.privacy}
    />
  );
}
