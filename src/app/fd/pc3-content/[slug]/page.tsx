'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import Disclaimer from '@/components/Disclaimer';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

const CONTENT: Record<string, {
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
  ctaLabel: string;
}> = {
  'burial-fund-split': {
    title: '부의금 분배, 누구 몫? 형제 싸움 막는 3원칙',
    subtitle: '장례 직후 가장 많이 생기는 갈등 중 하나가 부의금 정산입니다.',
    sections: [
      {
        heading: '원칙 1: 장례 비용 먼저, 나머지를 나눈다',
        body: '부의금은 장례 비용에 우선 충당하는 것이 관례입니다. 나머지 금액을 상속인 수로 나누되, 실제로 장례를 준비하느라 더 많이 수고한 사람의 몫을 인정하는 것이 갈등을 줄입니다.',
      },
      {
        heading: '원칙 2: 액수보다 과정의 투명성이 중요하다',
        body: '영수증 없이 "내가 이만큼 썼다"는 주장은 갈등의 씨앗이 됩니다. 장례 비용은 영수증으로 기록하고, 부의금 수령 내역도 메모해두세요. 나중에 정산이 훨씬 쉬워집니다.',
      },
      {
        heading: '원칙 3: 먼저 합의 기준을 정한다',
        body: '금액 분배에 앞서 "어떤 기준으로 나눌지"를 먼저 합의하세요. 균등 분배, 기여도 반영, 법정 상속 비율 중 무엇을 따를지 가족 모두가 납득하는 기준이 있어야 다툼이 생기지 않습니다.',
      },
    ],
    ctaLabel: '부의금 정산 도구 사전신청',
  },
  'inheritance-checklist': {
    title: '상속 한정승인, 3개월 안에 꼭 해야 하는 이유',
    subtitle: '이 기한을 모르고 지나치면 고인의 빚을 모두 떠안게 될 수 있습니다.',
    sections: [
      {
        heading: '한정승인이란?',
        body: '상속인이 상속받은 재산의 범위 안에서만 고인의 빚을 갚겠다는 의사 표시입니다. 재산보다 빚이 많을 때 한정승인을 해야 자신의 재산을 지킬 수 있습니다.',
      },
      {
        heading: '3개월 기한이 왜 중요한가?',
        body: '사망일로부터 3개월 이내에 가정법원에 한정승인 또는 상속포기를 신청해야 합니다. 이 기간이 지나면 단순승인으로 간주되어 고인의 빚 전액을 물려받게 됩니다.',
      },
      {
        heading: '지금 당장 해야 할 일',
        body: '①고인의 금융정보 조회(안심상속 원스톱 서비스) →②재산과 부채 규모 파악 →③한정승인 여부 결정 →④가정법원 신청. 행정 절차가 복잡하게 느껴진다면 전문가 도움을 받는 것도 방법입니다.',
      },
    ],
    ctaLabel: '상속 리스크 진단 받기',
  },
  'admin-chaos': {
    title: '부모님 돌아가신 뒤 첫 2주, 해야 할 일 총정리',
    subtitle: '막막한 사후 행정 절차를 단계별로 정리했습니다.',
    sections: [
      {
        heading: '사망 직후 (D+1 ~ D+3)',
        body: '사망신고(시청·구청), 사망보험금 청구, 건강보험 자격 상실 신고. 사망신고는 1개월 이내가 기한이지만 빠를수록 이후 절차가 수월합니다.',
      },
      {
        heading: '1주 이내 (D+4 ~ D+7)',
        body: '은행 계좌 사망 신고(잔고 동결 해제 위해 상속 절차 시작), 핸드폰 요금제 해지, 주요 구독 서비스 해지. 계좌는 사망 신고 후 동결될 수 있으니 미리 준비하세요.',
      },
      {
        heading: '2주 이내 (D+8 ~ D+14)',
        body: '국민연금·기초연금 수급 정지 신고, 의료급여 자격 정지, 자동차보험 명의 변경. 연금을 계속 수령하면 부당 수급으로 반환 의무가 생깁니다.',
      },
    ],
    ctaLabel: '맞춤 체크리스트 신청하기',
  },
};

const CTA_LINK: Record<string, string> = {
  'burial-fund-split': '/fd/pc3-settle',
  'inheritance-checklist': '/fd/pc1-quiz',
  'admin-chaos': '/fd/pc2-checklist',
};

export default function ContentPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const content = CONTENT[slug];

  useEffect(() => {
    initUtm();
    if (slug) track('content_view', { slug, fd_id: 'pc3-content' });
  }, [slug]);

  function handleCtaClick() {
    track('content_cta_click', { slug, fd_id: 'pc3-content' });
  }

  if (!content) {
    return (
      <main className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">콘텐츠를 찾을 수 없습니다.</p>
        <Link href="/" className="text-gray-600 underline text-sm mt-4 block">홈으로</Link>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
      <div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">유가족 가이드</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3 leading-snug">{content.title}</h1>
        <p className="text-gray-500 text-sm leading-relaxed">{content.subtitle}</p>
      </div>

      <div className="space-y-6">
        {content.sections.map((sec, i) => (
          <div key={i}>
            <h2 className="font-semibold text-gray-800 mb-2">{sec.heading}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{sec.body}</p>
          </div>
        ))}
      </div>

      <Disclaimer />

      <div className="border-t border-gray-100 pt-6">
        <Link
          href={CTA_LINK[slug] ?? '/'}
          onClick={handleCtaClick}
          className="block w-full bg-gray-800 text-white rounded-xl py-4 font-medium text-center"
        >
          {content.ctaLabel} →
        </Link>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="font-semibold text-gray-800 mb-2">관련 도구 사전 신청</h3>
        <p className="text-sm text-gray-500 mb-4">베타 출시 시 우선 안내드립니다.</p>
        <LeadForm fdId="pc3-content" channel={slug} extraData={{ slug }} submitLabel="사전 신청하기" />
      </div>

      <div className="pt-4 space-y-2">
        <p className="text-xs text-gray-400 font-medium">다른 글 읽기</p>
        {Object.entries(CONTENT)
          .filter(([s]) => s !== slug)
          .map(([s, c]) => (
            <Link key={s} href={`/fd/pc3-content/${s}`} className="block text-sm text-gray-600 hover:text-gray-800 underline">
              {c.title}
            </Link>
          ))}
      </div>
    </main>
  );
}
