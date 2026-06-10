'use client';

import { useState, useEffect, useRef } from 'react';
import QuizStep from '@/components/QuizStep';
import ResultBand, { Band } from '@/components/ResultBand';
import Disclaimer from '@/components/Disclaimer';
import PreorderOffer from '@/components/PreorderOffer';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';
import { CHANNEL_COPY, Pc1Channel, resolveChannel } from '@/lib/pc1-content';

const QUESTIONS = [
  {
    q: 'q1',
    question: '고인(돌아가신 분)에게 빚(대출, 보증, 카드빚 등)이 있었나요?',
    options: [
      { label: '있는 것 같다', value: 'yes' },
      { label: '없는 것 같다', value: 'no' },
      { label: '잘 모르겠다', value: 'unknown' },
    ],
  },
  {
    q: 'q2',
    question: '상속 한정승인·포기는 사망일로부터 3개월 이내에 해야 합니다. 이 기한을 알고 계셨나요?',
    options: [
      { label: '알고 있었다', value: 'knew' },
      { label: '몰랐다', value: 'didnt_know' },
      { label: '이미 기한이 지났다', value: 'expired' },
    ],
  },
  {
    q: 'q3',
    question: '고인의 금융 계좌·부동산 재산 현황을 파악하고 계신가요?',
    options: [
      { label: '대략 파악하고 있다', value: 'roughly' },
      { label: '전혀 모른다', value: 'no' },
      { label: '일부만 알고 있다', value: 'partial' },
    ],
  },
  {
    q: 'q4',
    question: '다른 상속인(형제자매, 배우자 등)이 있나요?',
    options: [
      { label: '있다', value: 'yes' },
      { label: '나만 상속인이다', value: 'only_me' },
      { label: '잘 모르겠다', value: 'unknown' },
    ],
  },
  {
    q: 'q5',
    question: '아직 해지하지 못한 구독 서비스, 건강보험료, 공과금 등 행정 처리가 남아 있나요?',
    options: [
      { label: '많이 남아 있다', value: 'many' },
      { label: '일부 남아 있다', value: 'some' },
      { label: '거의 다 처리했다', value: 'done' },
    ],
  },
];

type Stage = 'landing' | 'quiz' | 'result' | 'lead';

function calculateBand(answers: Record<string, string>): Band {
  let score = 0;
  if (answers.q1 === 'yes' || answers.q1 === 'unknown') score += 2;
  if (answers.q2 === 'didnt_know') score += 2;
  if (answers.q2 === 'expired') score += 3;
  if (answers.q3 === 'no') score += 2;
  if (answers.q3 === 'partial') score += 1;
  if (answers.q5 === 'many') score += 1;
  if (score >= 5) return 'red';
  if (score >= 2) return 'yellow';
  return 'green';
}

const BAND_RESULT: Record<Band, { title: string; description: string }> = {
  red: {
    title: '즉각 조치 필요',
    description: '상속 관련 여러 위험 요소가 발견되었습니다. 특히 기한(3개월)이 지났거나 빚 여부가 불분명한 경우 법적 불이익이 생길 수 있습니다. 전문가 확인을 권합니다.',
  },
  yellow: {
    title: '주의 필요',
    description: '몇 가지 확인이 필요한 항목이 있습니다. 서두를 필요는 없지만, 기한과 재산 파악을 조금 더 꼼꼼히 하시면 좋겠습니다.',
  },
  green: {
    title: '현재 양호',
    description: '주요 항목은 파악하고 계신 것 같습니다. 행정 처리 잔여 항목만 순차적으로 처리하시면 됩니다.',
  },
};

const RISK_ITEMS = [
  { id: 'debt', label: '빚·부채 위험', description: '고인의 부채를 상속받을 수 있습니다.' },
  { id: 'deadline', label: '3개월 기한', description: '한정승인·포기 기한을 놓치면 단순승인으로 처리됩니다.' },
  { id: 'assets', label: '재산 파악 미흡', description: '파악하지 못한 계좌·부동산이 있을 수 있습니다.' },
  { id: 'admin', label: '행정 미처리', description: '구독·건강보험·공과금 등 계속 청구될 수 있습니다.' },
];

export default function Pc1QuizPage() {
  // ch 채널 카피는 마케팅 변형일 뿐이라 SSR은 default로 렌더하고,
  // 마운트 후 URL의 ?ch= 값으로 보정한다. (useSearchParams를 쓰면 페이지 전체가
  // 프리렌더에서 제외되어 첫 화면이 빈 HTML로 나가므로 의도적으로 피한다.)
  const [ch, setCh] = useState<Pc1Channel>('default');
  const copy = CHANNEL_COPY[ch];

  const [stage, setStage] = useState<Stage>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [band, setBand] = useState<Band>('green');
  const topRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    initUtm();
    const params = new URLSearchParams(window.location.search);
    setCh(resolveChannel(params.get('ch')));
  }, []);

  useEffect(() => {
    if (stage === 'landing') {
      track('page_view', { fd_id: 'pc1-quiz', channel_variant: ch });
    }
  }, [stage, ch]);

  // 단계/문항 전환 시 화면 상단으로 이동 + 제목에 포커스(스크롤·포커스 튐 방지).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    topRef.current?.focus();
  }, [stage, currentQ]);

  function handleStart() {
    track('cta_click', { cta_id: 'start_quiz', fd_id: 'pc1-quiz', channel_variant: ch });
    track('quiz_start', { fd_id: 'pc1-quiz' });
    setStage('quiz');
  }

  function handleAnswer(value: string) {
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.q]: value };
    setAnswers(newAnswers);
    track('quiz_answer', { q: q.q, choice: value, fd_id: 'pc1-quiz' });

    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      const result = calculateBand(newAnswers);
      setBand(result);
      track('quiz_complete', { band: result, fd_id: 'pc1-quiz' });
      setStage('result');
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      setStage('landing');
    } else {
      setCurrentQ(currentQ - 1);
    }
  }

  function handleRiskItemClick(id: string) {
    track('result_item_click', { item: id, fd_id: 'pc1-quiz' });
  }

  if (stage === 'landing') {
    return (
      <main className="max-w-lg mx-auto px-4 py-10 sm:py-14">
        {/* 히어로 — 차분한 브랜드 톤. 상실을 겪은 이용자를 배려한 부드러운 카피 */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[color:var(--color-brand-tint)] to-white border border-[color:var(--color-line)] px-6 pt-8 pb-7 mb-6">
          <span className="chip mb-4">상속 리스크 자가진단</span>
          <h1 ref={topRef} tabIndex={-1} className="text-[1.7rem] font-bold text-[color:var(--color-ink)] leading-snug tracking-tight outline-none">
            {copy.headline}
          </h1>
          <p className="text-[color:var(--color-muted)] text-sm leading-relaxed mt-3">{copy.sub}</p>
        </section>

        {/* 진단 항목 미리보기 */}
        <p className="text-xs font-medium text-[color:var(--color-muted)] mb-3 px-1">이런 항목을 함께 살펴봐요</p>
        <div className="grid grid-cols-2 gap-2.5 mb-7">
          {[
            { icon: '💳', label: '빚·부채 상속 여부' },
            { icon: '⏳', label: '3개월 기한 준수' },
            { icon: '🏠', label: '재산 파악 현황' },
            { icon: '📄', label: '미처리 행정 항목' },
          ].map((item) => (
            <div key={item.label} className="card flex items-center gap-2.5 px-3.5 py-3">
              <span className="text-lg leading-none" aria-hidden>{item.icon}</span>
              <span className="text-[13px] text-[color:var(--color-ink)] leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-[color:var(--color-brand)] text-white rounded-2xl py-4 font-semibold text-[15px] shadow-sm transition-colors hover:bg-[color:var(--color-brand-dark)] active:scale-[0.99]"
        >
          내 위험도 확인하기 →
        </button>

        <div className="flex items-center justify-center gap-3 text-xs text-[color:var(--color-muted)] mt-4">
          <span className="flex items-center gap-1">⏱ 약 2분</span>
          <span className="w-px h-3 bg-[color:var(--color-line)]" />
          <span className="flex items-center gap-1">🔒 개인정보 수집 없음</span>
          <span className="w-px h-3 bg-[color:var(--color-line)]" />
          <span className="flex items-center gap-1">무료</span>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/admin"
            className="text-xs text-[color:var(--color-muted)] underline hover:no-underline"
          >
            관리자 대시보드
          </a>
        </div>
      </main>
    );
  }

  if (stage === 'quiz') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12">
        <QuizStep
          ref={topRef}
          question={QUESTIONS[currentQ].question}
          options={QUESTIONS[currentQ].options}
          current={currentQ + 1}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      </main>
    );
  }

  if (stage === 'result') {
    const result = BAND_RESULT[band];
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <h2 ref={topRef} tabIndex={-1} className="text-lg font-bold text-gray-800 outline-none">진단 결과</h2>
        <ResultBand band={band} title={result.title} description={result.description} />

        <div>
          <p className="text-sm text-gray-500 mb-3">당신의 상황 — 위험 항목 요약</p>
          <div className="space-y-2">
            {RISK_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleRiskItemClick(item.id)}
                className="w-full text-left border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 단일 명확한 CTA: 전문가 리포트 사전예약 */}
        <div className="border-t border-gray-100 pt-6">
          <PreorderOffer embedded />
        </div>

        {/* 신뢰 요소: 법적 고지 + 개인정보처리방침 */}
        <div className="border-t border-gray-100 pt-6 space-y-4">
          <Disclaimer />
          
          <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-600 space-y-1">
            <p>
              <strong>※ 법률·세무 자문 아님:</strong> 본 진단 결과는 교육용 정보이며, 개인의 상황에 맞춘 법률·세무 조언이 아닙니다. 
              중요한 결정 전에 전문가 상담을 권합니다.
            </p>
            <p className="mt-2">
              <a href="/privacy" className="underline hover:no-underline">개인정보 처리방침</a> · 
              <span className="text-gray-500 ml-1">운영: 유가족 서비스팀 · 문의: leokor1214@gachon.ac.kr</span>
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-12 text-center">
      <div className="text-4xl mb-4">🙏</div>
      <h2 ref={topRef} tabIndex={-1} className="text-xl font-bold text-gray-800 mb-2 outline-none">신청이 완료되었습니다</h2>
      <p className="text-gray-500 text-sm">베타 오픈 시 가장 먼저 안내드리겠습니다.</p>
    </main>
  );
}
