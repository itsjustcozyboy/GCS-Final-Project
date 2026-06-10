'use client';

import { useState, useEffect } from 'react';
import HonestRevealModal from '@/components/HonestRevealModal';
import LeadForm from '@/components/LeadForm';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

type Plan = 'monthly' | 'onetime';

export default function Pc2SubscribePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showLead, setShowLead] = useState(false);

  useEffect(() => { initUtm(); track('page_view', { fd_id: 'pc2-subscribe' }); }, []);

  function handleSelect(plan: Plan) {
    setSelectedPlan(plan);
    track('subscribe_intent', { plan, fd_id: 'pc2-subscribe' });
    setShowModal(true);
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
      <div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">행정 알림 서비스</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3">30일간 오늘 해야 할 일을 카카오로</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          복잡한 사후 행정을 매일 아침 카카오 메시지로 챙겨드립니다. 놓치는 마감이 없도록 옆에서 도와드립니다.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
        {[
          { day: 'D+1', task: '사망신고 / 건강보험 자격 상실 신고' },
          { day: 'D+7', task: '금융 계좌 사망 신고 (은행별)' },
          { day: 'D+14', task: '부동산·자동차 명의 변경 착수' },
          { day: 'D+30', task: '상속 한정승인·포기 기한 확인' },
        ].map((item) => (
          <div key={item.day} className="flex gap-3 items-start">
            <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-0.5 rounded mt-0.5">{item.day}</span>
            <span className="text-sm text-gray-600">{item.task}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 rounded-2xl p-4">
          <div className="text-xl font-bold text-gray-800 mb-1">₩9,900<span className="text-sm font-normal text-gray-400">/월</span></div>
          <p className="text-xs text-gray-500 mb-3">월간 구독</p>
          <ul className="text-xs text-gray-500 space-y-1 mb-4">
            <li>✓ 매일 카카오 알림</li>
            <li>✓ 30일 행정 가이드</li>
          </ul>
          <button onClick={() => handleSelect('monthly')} className="w-full bg-gray-100 text-gray-700 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-200">
            시작하기
          </button>
        </div>
        <div className="border border-gray-700 rounded-2xl p-4 bg-gray-50">
          <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full mb-2 inline-block">인기</span>
          <div className="text-xl font-bold text-gray-800 mb-1">₩19,000</div>
          <p className="text-xs text-gray-500 mb-3">1회 완결</p>
          <ul className="text-xs text-gray-500 space-y-1 mb-4">
            <li>✓ 매일 카카오 알림</li>
            <li>✓ 30일 행정 가이드</li>
            <li>✓ 맞춤 체크리스트</li>
          </ul>
          <button onClick={() => handleSelect('onetime')} className="w-full bg-[color:var(--color-brand)] text-white rounded-xl py-2.5 text-sm font-medium">
            시작하기
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">베타 기간 중 — 현재 과금되지 않습니다</p>

      {showLead && (
        <div className="border-t border-gray-100 pt-6">
          <LeadForm fdId="pc2-subscribe" priceVariant={selectedPlan ?? undefined} />
        </div>
      )}

      <HonestRevealModal
        open={showModal}
        onClose={() => { setShowModal(false); setShowLead(true); }}
        title="대기 신청이 접수되었습니다"
        message="현재 베타 준비 중입니다. 지금은 과금되지 않으며, 오픈 시 우선 안내드립니다."
      />
    </main>
  );
}
