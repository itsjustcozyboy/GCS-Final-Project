'use client';

import { useState, useEffect } from 'react';
import HonestRevealModal from '@/components/HonestRevealModal';
import LeadForm from '@/components/LeadForm';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

type Stage = 'landing' | 'invite' | 'reveal' | 'lead';

export default function Pc3BoardPage() {
  const [stage, setStage] = useState<Stage>('landing');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { initUtm(); track('page_view', { fd_id: 'pc3-board' }); }, []);

  function handleCreate() {
    track('board_create_attempt', { fd_id: 'pc3-board' });
    setStage('invite');
  }

  function handleInvite() {
    track('invite_click', { fd_id: 'pc3-board' });
    setShowModal(true);
  }

  if (stage === 'landing') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">가족 역할 보드</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3">누가 무엇을 언제까지</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            가족끼리 역할을 나누고 진행 상황을 함께 확인하는 공유 보드입니다. 서로 묻지 않아도 알 수 있습니다.
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">김씨 가족 역할 보드</p>
          </div>
          {[
            { role: '장남 (김철수)', task: '사망신고·금융 계좌 정리', status: '진행 중', color: 'text-yellow-600' },
            { role: '장녀 (김영희)', task: '구독 서비스 해지·통신사 처리', status: '완료', color: 'text-green-600' },
            { role: '배우자 (박순자)', task: '건강보험·국민연금 신고', status: '대기', color: 'text-gray-400' },
          ].map((item, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400">{item.role}</p>
                  <p className="text-sm text-gray-700">{item.task}</p>
                </div>
                <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleCreate}
          className="w-full bg-gray-800 text-white rounded-xl py-4 font-medium"
        >
          가족 보드 만들기
        </button>
      </main>
    );
  }

  if (stage === 'invite') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">보드가 만들어졌습니다</h2>
        <p className="text-gray-500 text-sm">가족을 초대해서 함께 역할을 나누세요.</p>

        <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
          <p className="text-sm text-gray-500">초대 방법</p>
          <div className="flex gap-3">
            <div className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-400 bg-white">
              https://app.example.com/board/xxxx
            </div>
            <button
              onClick={handleInvite}
              className="bg-gray-800 text-white rounded-xl px-4 py-2 text-sm font-medium"
            >
              초대 링크 복사
            </button>
          </div>
          <p className="text-xs text-gray-400">또는 카카오로 공유</p>
          <button
            onClick={handleInvite}
            className="w-full bg-[#FEE500] text-gray-800 rounded-xl py-3 text-sm font-medium"
          >
            💬 카카오로 가족 초대하기
          </button>
        </div>

        <HonestRevealModal
          open={showModal}
          onClose={() => setStage('lead')}
          title="곧 출시됩니다"
          message="가족 협업 보드는 현재 개발 준비 중입니다. 출시 시 먼저 사용하실 수 있도록 안내드리겠습니다."
        />
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-12 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">베타 출시 알림 신청</h2>
      <p className="text-sm text-gray-500">출시 시 가장 먼저 초대장을 보내드립니다.</p>
      <LeadForm fdId="pc3-board" channel="board" submitLabel="출시 알림 신청" />
    </main>
  );
}
