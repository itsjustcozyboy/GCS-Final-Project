'use client';

import { useState, useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import Disclaimer from '@/components/Disclaimer';
import { track } from '@/lib/analytics';
import { initUtm } from '@/lib/utm';

type Stage = 'input' | 'preview' | 'lead' | 'done';

export default function Pc3SettlePage() {
  const [stage, setStage] = useState<Stage>('input');
  const [total, setTotal] = useState('');
  const [funeral, setFuneral] = useState('');
  const [heirs, setHeirs] = useState('');
  const [preview, setPreview] = useState<{ perPerson: number; net: number } | null>(null);

  useEffect(() => { initUtm(); track('page_view', { fd_id: 'pc3-settle' }); }, []);

  function handleCompute(e: React.FormEvent) {
    e.preventDefault();
    const t = parseInt(total.replace(/,/g, ''), 10);
    const f = parseInt(funeral.replace(/,/g, ''), 10) || 0;
    const h = parseInt(heirs, 10) || 1;
    if (isNaN(t) || h < 1) return;
    track('tool_start', { fd_id: 'pc3-settle' });
    const net = t - f;
    const perPerson = Math.floor(net / h);
    track('tool_compute', { fd_id: 'pc3-settle', total: t, funeral: f, heirs: h });
    setPreview({ perPerson, net });
    setStage('preview');
    track('preview_view', { fd_id: 'pc3-settle' });
  }

  function fmt(n: number) {
    return n.toLocaleString('ko-KR');
  }

  if (stage === 'input') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">부의금 정산기</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-3">공평하게 나누는 방법</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            부의금 총액과 장례 비용을 입력하면 상속인 1인당 몫을 미리 확인할 수 있습니다.
          </p>
        </div>
        <form onSubmit={handleCompute} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">부의금 총액 (원)</label>
            <input
              type="text"
              placeholder="예: 3,000,000"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">장례 비용 (원, 선택)</label>
            <input
              type="text"
              placeholder="예: 1,500,000"
              value={funeral}
              onChange={(e) => setFuneral(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상속인 수</label>
            <input
              type="number"
              placeholder="예: 3"
              min="1"
              value={heirs}
              onChange={(e) => setHeirs(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <button type="submit" className="w-full bg-[color:var(--color-brand)] text-white rounded-xl py-4 font-medium">
            계산하기
          </button>
        </form>
        <Disclaimer />
      </main>
    );
  }

  if (stage === 'preview' && preview) {
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">미리보기 결과</h2>
        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">장례 비용 제외 후</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">순 부의금: ₩{fmt(preview.net)}</p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-1">1인당 예상 몫</p>
            <p className="text-3xl font-bold text-gray-800">₩{fmt(preview.perPerson)}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 relative overflow-hidden">
          <div className="blur-sm select-none">
            <p className="text-sm font-medium text-gray-700 mb-3">전체 정산표</p>
            {['상속인 A', '상속인 B', '상속인 C'].map((name, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-100 text-sm text-gray-600">
                <span>{name}</span>
                <span>₩{fmt(preview.perPerson)}</span>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-3">+ 답례 명단 · 세금 계산 포함</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <button
              onClick={() => { track('cta_click', { cta_id: 'unlock_settle', fd_id: 'pc3-settle' }); setStage('lead'); }}
              className="bg-[color:var(--color-brand)] text-white rounded-xl px-6 py-3 text-sm font-medium"
            >
              전체 정산표 + 답례 명단 받기
            </button>
          </div>
        </div>
        <Disclaimer />
      </main>
    );
  }

  if (stage === 'lead') {
    return (
      <main className="max-w-lg mx-auto px-4 py-12 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">전체 정산표 받기</h2>
        <p className="text-sm text-gray-500">상속인별 정산표와 답례 명단을 이메일로 보내드립니다.</p>
        <LeadForm
          fdId="pc3-settle"
          channel="settle"
          extraData={{ total, funeral, heirs }}
          onSuccess={() => setStage('done')}
          submitLabel="정산표 받기"
        />
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-4xl mb-4">📊</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">곧 보내드립니다</h2>
      <p className="text-gray-500 text-sm">영업일 기준 1일 이내에 전달드리겠습니다.</p>
    </main>
  );
}
