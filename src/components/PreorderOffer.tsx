'use client';

import { useState, useEffect } from 'react';
import HonestRevealModal from '@/components/HonestRevealModal';
import LeadForm from '@/components/LeadForm';
import Disclaimer from '@/components/Disclaimer';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

type PriceVariant = 'A' | 'B' | 'C';

const PRICE_OPTIONS: Record<PriceVariant, { price: string; label: string; features: string[]; highlighted: boolean }> = {
  A: {
    price: '₩9,900',
    label: '기본 리포트',
    features: ['전문가 검토 상속 리포트', '위험 항목 요약', '30일 체크리스트'],
    highlighted: false,
  },
  B: {
    price: '₩29,000',
    label: '표준 패키지',
    features: ['전문가 검토 상속 리포트', '30일 액션플랜', '1회 전화 상담(30분)', '맞춤 행정 목록'],
    highlighted: true,
  },
  C: {
    price: '₩49,000',
    label: '프리미엄 패키지',
    features: ['전문가 검토 상속 리포트', '30일 액션플랜', '2회 전화 상담(각 1시간)', '맞춤 행정 목록', '우선 응답 지원'],
    highlighted: false,
  },
};

function assignVariant(): PriceVariant {
  const r = Math.random();
  if (r < 0.33) return 'A';
  if (r < 0.66) return 'B';
  return 'C';
}

interface Props {
  /** result 화면에 임베드될 때 헤더 톤을 약간 다르게 하려면 사용 */
  embedded?: boolean;
}

/**
 * PC1-2 사전예약 오퍼. 독립 라우트(/fd/pc1-preorder)와 PC1-1 결과 화면 양쪽에서 재사용.
 * 이벤트명·variant 로직은 기존 스키마 그대로 유지(fd_id: 'pc1-preorder').
 * embedded=true일 때는 단일 명확한 CTA로 표시.
 */
export default function PreorderOffer({ embedded = false }: Props) {
  const [variant, setVariant] = useState<PriceVariant>('B');
  const [showModal, setShowModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<PriceVariant | null>(null);
  const [showLead, setShowLead] = useState(false);

  useEffect(() => {
    initUtm();
    const v = assignVariant();
    setVariant(v);
    track('page_view', { fd_id: 'pc1-preorder' });
    track('price_view', { variant: v, fd_id: 'pc1-preorder' });
  }, []);

  function handlePreorder(v: PriceVariant) {
    setSelectedVariant(v);
    track('preorder_intent', { variant: v, fd_id: 'pc1-preorder' });
    setShowModal(true);
  }

  const opt = PRICE_OPTIONS[variant];

  // embedded 모드: 단일 집중된 CTA
  if (embedded) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">전문가 정밀 리포트</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            당신의 진단 결과를 바탕으로 변호사·세무사 네트워크가 검토한 맞춤형 리포트와 30일 액션플랜을 제공합니다.
          </p>
        </div>

        <div className="border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand-tint)] rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-2 mb-5">
            {['📋 맞춤 상속 리포트', '⏱️ 30일 액션플랜', '✓ 우선순위 정리', '🤝 법정 체크리스트'].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-5">
            <div className="text-3xl font-bold text-[color:var(--color-brand-dark)] mb-1">{opt.price}</div>
            <div className="text-sm text-gray-600">{opt.label}</div>
            <p className="text-xs text-gray-400 mt-2">베타 기간 중 — 현재 과금되지 않습니다</p>
          </div>

          <button
            onClick={() => {
              setSelectedVariant(variant);
              track('preorder_intent', { variant, fd_id: 'pc1-preorder' });
              setShowLead(true);
            }}
            className="w-full bg-[color:var(--color-brand)] text-white rounded-xl py-4 font-semibold text-[15px] hover:bg-[color:var(--color-brand-dark)] active:scale-[0.99] transition-all"
          >
            무료로 사전예약하기 →
          </button>
        </div>

        {showLead && (
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <h4 className="font-semibold text-gray-800 text-sm">연락처를 남겨주세요</h4>
            <p className="text-xs text-gray-500">베타 오픈 시 가장 먼저 안내드리겠습니다.</p>
            <LeadForm fdId="pc1-preorder" priceVariant={selectedVariant ?? variant} interview />
          </div>
        )}
      </div>
    );
  }

  // 일반 모드: 전체 가격 옵션 표시
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">전문가 정밀 리포트</span>
        <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2">상속 전문가가 직접 검토합니다</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          자가진단 결과를 바탕으로 변호사·세무사 네트워크가 검토한 맞춤 리포트와 30일 액션플랜을 제공합니다.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
        {['전문가 검토 상속 리스크 리포트', '빚·기한·재산별 우선순위 정리', '30일 단계별 행정 액션플랜', '가족 갈등 예방 체크리스트'].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span className="text-sm text-gray-600">{item}</span>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-1">
          {opt.highlighted && (
            <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">인기</span>
          )}
        </div>
        <div className="text-3xl font-bold text-gray-800 mb-1">{opt.price}</div>
        <div className="text-sm text-gray-500 mb-4">{opt.label}</div>
        <ul className="space-y-1.5 mb-5">
          {opt.features.map((f, i) => (
            <li key={i} className="text-sm text-gray-600 flex gap-2">
              <span className="text-gray-400">✓</span> {f}
            </li>
          ))}
        </ul>
        <button
          onClick={() => handlePreorder(variant)}
          className="w-full bg-[color:var(--color-brand)] text-white rounded-xl py-4 font-medium"
        >
          사전예약하기
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">베타 기간 중 — 현재 과금되지 않습니다</p>
      </div>

      <Disclaimer />

      {showLead && (
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-800 mb-3">이메일로 안내받기</h3>
          <LeadForm fdId="pc1-preorder" priceVariant={selectedVariant ?? variant} interview />
        </div>
      )}

      <HonestRevealModal
        open={showModal}
        onClose={() => { setShowModal(false); setShowLead(true); }}
        title="사전예약이 접수되었습니다"
        message={`베타 오픈 준비 중입니다. 현재는 과금되지 않으며, ${opt.price} 패키지로 베타 오픈 시 가장 먼저 안내드립니다.`}
      />
    </div>
  );
}
