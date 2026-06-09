'use client';

import { useState, useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

export default function Pc2KakaoPage() {
  const [showLead, setShowLead] = useState(false);

  useEffect(() => { initUtm(); track('page_view', { fd_id: 'pc2-kakao' }); }, []);

  function handleKakaoClick() {
    track('kakao_channel_click', { fd_id: 'pc2-kakao' });
    const url = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? 'https://pf.kakao.com/_xxxxx';
    window.open(url, '_blank');
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
      <div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">카카오 컨시어지</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3">막막하면 메시지 주세요</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          사후 행정, 상속, 가족 역할 분담 — 무엇이든 질문하세요. 전문 코디네이터가 직접 답변드립니다.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 space-y-3">
        {[
          '"어머니 돌아가신 후 통장 어떻게 해야 하나요?"',
          '"상속 포기 기한이 지났는데 어떻게 되나요?"',
          '"형제끼리 역할 분담을 어떻게 해야 할지 모르겠어요"',
        ].map((q, i) => (
          <div key={i} className="bg-white rounded-xl px-4 py-3 text-sm text-gray-600 shadow-sm">
            {q}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleKakaoClick}
          className="w-full bg-[#FEE500] text-gray-800 rounded-xl py-4 font-medium flex items-center justify-center gap-2"
        >
          <span>💬</span> 카카오 채널 추가하기
        </button>
        <p className="text-xs text-gray-400 text-center">무료 베타 · 영업일 기준 1일 이내 답변</p>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="font-semibold text-gray-800 mb-2">앱 출시 우선 알림 신청</h3>
        <p className="text-sm text-gray-500 mb-4">정식 앱 출시 시 가장 먼저 안내드립니다.</p>
        {!showLead ? (
          <button
            onClick={() => { track('cta_click', { cta_id: 'notify_signup', fd_id: 'pc2-kakao' }); setShowLead(true); }}
            className="w-full border border-gray-200 text-gray-700 rounded-xl py-3 text-sm font-medium hover:bg-gray-50"
          >
            출시 알림 신청하기
          </button>
        ) : (
          <LeadForm fdId="pc2-kakao" channel="kakao" submitLabel="알림 신청하기" />
        )}
      </div>
    </main>
  );
}
