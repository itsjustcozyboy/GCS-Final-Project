'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import QuizStep from '@/components/QuizStep';
import ResultBand, { Band } from '@/components/ResultBand';
import LeadForm from '@/components/LeadForm';
import Disclaimer from '@/components/Disclaimer';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

const CHANNEL_COPY: Record<string, { headline: string; sub: string }> = {
  search: {
    headline: '지금 상속 결정 기한이 남았나요?',
    sub: '3개월 안에 반드시 결정해야 하는 것들을 놓치고 계실 수 있습니다.',
  },
  community: {
    headline: '막막한 상속 절차, 내 상황 먼저 파악하세요',
    sub: '2분 자가진단으로 지금 내가 처한 위험 수준을 확인하세요.',
  },
  partner: {
    headline: '전문가가 먼저 확인해드립니다',
    sub: '아래 질문에 답하시면 위험 항목을 짚어드립니다.',
  },
  default: {
    headline: '상속 리스크, 지금 바로 확인하세요',
    sub: '간단한 5문항으로 상속 절차의 위험 수준을 파악해보세요.',
  },
};

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

function Pc1QuizInner() {
  const searchParams = useSearchParams();
  const ch = searchParams.get('ch') ?? 'default';
  const copy = CHANNEL_COPY[ch] ?? CHANNEL_COPY.default;

  const [stage, setStage] = useState<Stage>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [band, setBand] = useState<Band>('green');

  useEffect(() => { initUtm(); }, []);

  useEffect(() => {
    if (stage === 'landing') {
      track('page_view', { fd_id: 'pc1-quiz', channel_variant: ch });
    }
  }, [stage, ch]);

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

  function handleRiskItemClick(id: string) {
    track('result_item_click', { item: id, fd_id: 'pc1-quiz' });
  }

  if (stage === 'landing') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="mb-8">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">상속 리스크 자가진단</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3 leading-snug">{copy.headline}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">{copy.sub}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
          {['빚·부채 상속 여부', '3개월 기한 준수', '재산 파악 현황', '미처리 행정 항목'].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center font-medium">{i + 1}</div>
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="w-full bg-gray-800 text-white rounded-xl py-4 font-medium"
        >
          내 위험도 확인하기 →
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">2분 소요 · 개인정보 수집 없음</p>
      </main>
    );
  }

  if (stage === 'quiz') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12">
        <QuizStep
          question={QUESTIONS[currentQ].question}
          options={QUESTIONS[currentQ].options}
          current={currentQ + 1}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      </main>
    );
  }

  if (stage === 'result') {
    const result = BAND_RESULT[band];
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">진단 결과</h2>
        <ResultBand band={band} title={result.title} description={result.description} />

        <div>
          <p className="text-sm text-gray-500 mb-3">위험 항목을 클릭하면 자세한 설명을 볼 수 있습니다.</p>
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

        <Disclaimer />

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-800 mb-1">전문가 정밀 리포트 신청 (무료 베타)</h3>
          <p className="text-sm text-gray-500 mb-4">
            진단 결과를 바탕으로 전문가가 상세 검토한 리포트를 무료로 보내드립니다.
          </p>
          <LeadForm
            fdId="pc1-quiz"
            channel={ch}
            extraData={{ band, answers }}
            onSuccess={() => setStage('lead')}
            submitLabel="무료 리포트 신청하기"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-12 text-center">
      <div className="text-4xl mb-4">🙏</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">신청이 완료되었습니다</h2>
      <p className="text-gray-500 text-sm">베타 오픈 시 가장 먼저 안내드리겠습니다.</p>
    </main>
  );
}

export default function Pc1QuizPage() {
  return (
    <Suspense>
      <Pc1QuizInner />
    </Suspense>
  );
}
