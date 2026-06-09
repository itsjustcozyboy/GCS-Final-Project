'use client';

import { useState, useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

type Stage = 'landing' | 'quiz' | 'generating' | 'lead' | 'done';

const QUESTIONS = [
  { q: 'q1', label: '자녀 수', question: '자녀가 몇 명인가요?', options: ['없음', '1명', '2명', '3명 이상'] },
  { q: 'q2', label: '부동산', question: '고인 명의의 부동산(집, 토지 등)이 있나요?', options: ['있다', '없다', '모르겠다'], sensitive: true },
  { q: 'q3', label: '부채', question: '고인에게 대출, 보증 등 부채가 있나요?', options: ['있다', '없다', '모르겠다'], sensitive: true },
  { q: 'q4', label: '통신사', question: '고인 명의의 휴대폰 요금제를 해지하셨나요?', options: ['이미 처리', '아직 못 함', '해당 없음'] },
  { q: 'q5', label: '구독 서비스', question: '넷플릭스, 유튜브, 신문 등 구독 서비스를 해지하셨나요?', options: ['이미 처리', '아직 못 함', '해당 없음'] },
  { q: 'q6', label: '금융 계좌', question: '은행 계좌 정리(해지 또는 상속)를 하셨나요?', options: ['이미 처리', '진행 중', '아직 못 함'], sensitive: true },
  { q: 'q7', label: '기타', question: '그 외 처리하지 못한 것들이 많이 남아 있나요?', options: ['매우 많다', '조금 있다', '거의 없다'] },
];

export default function Pc2ChecklistPage() {
  const [stage, setStage] = useState<Stage>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [abandonTimer, setAbandonTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => { initUtm(); track('page_view', { fd_id: 'pc2-checklist' }); }, []);

  function handleStart() {
    track('cta_click', { cta_id: 'start_checklist', fd_id: 'pc2-checklist' });
    track('form_start', { fd_id: 'pc2-checklist' });
    setStage('quiz');
  }

  function startAbandonTimer(q: string) {
    if (abandonTimer) clearTimeout(abandonTimer);
    const t = setTimeout(() => {
      track('question_abandon', { q, fd_id: 'pc2-checklist' });
    }, 30000);
    setAbandonTimer(t);
  }

  function handleAnswer(value: string) {
    if (abandonTimer) clearTimeout(abandonTimer);
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.q]: value };
    setAnswers(newAnswers);

    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
      const next = QUESTIONS[currentQ + 1];
      if (next.sensitive) startAbandonTimer(next.q);
    } else {
      track('form_complete', { fd_id: 'pc2-checklist' });
      setStage('generating');
      setTimeout(() => setStage('lead'), 2500);
    }
  }

  useEffect(() => {
    if (stage === 'quiz' && QUESTIONS[currentQ]?.sensitive) {
      startAbandonTimer(QUESTIONS[currentQ].q);
    }
    return () => { if (abandonTimer) clearTimeout(abandonTimer); };
  }, [stage, currentQ]);

  if (stage === 'landing') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">맞춤 체크리스트</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3">해야 할 일이 너무 많을 때</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          상황에 맞는 30일 행정 체크리스트를 만들어드립니다. 카카오 또는 이메일로 받아보세요.
        </p>
        <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-2">
          {['부동산·금융 정리', '통신·구독 해지', '건강보험·연금 처리', '가족 역할 분담'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">📋</span> {item}
            </div>
          ))}
        </div>
        <button onClick={handleStart} className="w-full bg-gray-800 text-white rounded-xl py-4 font-medium">
          맞춤 체크리스트 만들기
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">약 3분 소요</p>
      </main>
    );
  }

  if (stage === 'quiz') {
    const q = QUESTIONS[currentQ];
    return (
      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="mb-2 flex justify-between text-xs text-gray-400">
          <span>{q.label}</span>
          <span>{currentQ + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
          <div className="bg-gray-700 h-1.5 rounded-full" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <h3 className="text-base font-medium text-gray-800 mb-4 leading-relaxed">{q.question}</h3>
        <div className="space-y-2">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full text-left border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            >
              {opt}
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (stage === 'generating') {
    return (
      <main className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4 animate-pulse">📋</div>
        <p className="text-gray-700 font-medium">맞춤 30일 목록 생성 중...</p>
        <p className="text-gray-400 text-sm mt-2">잠시만 기다려주세요</p>
      </main>
    );
  }

  if (stage === 'lead') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12">
        <h2 className="text-lg font-bold text-gray-800 mb-2">체크리스트가 준비되었습니다</h2>
        <p className="text-gray-500 text-sm mb-6">
          카카오 또는 이메일로 받아보실 수 있습니다. 잠시 후 보내드리겠습니다.
        </p>
        <LeadForm
          fdId="pc2-checklist"
          channel="checklist"
          extraData={{ answers }}
          onSuccess={() => setStage('done')}
          submitLabel="체크리스트 받기"
          placeholder="이메일 또는 카카오 ID"
        />
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-4xl mb-4">✅</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">곧 보내드립니다</h2>
      <p className="text-gray-500 text-sm">영업일 기준 1일 이내에 전달드리겠습니다.</p>
    </main>
  );
}
