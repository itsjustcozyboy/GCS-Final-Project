'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { AdminPayload, MasterRow, FunnelDetail, SegmentRow } from '@/lib/admin/aggregate';
import { VERDICT_BADGE, PRICE_VARIANTS, PC1_SAMPLE, PC1_CRITERIA } from '@/lib/admin/config';

interface Payload extends AdminPayload {
  utmSourceOptions: string[];
}

type SortKey = keyof Pick<MasterRow, 'fd_id' | 'visits' | 'cta' | 'start' | 'complete' | 'lead' | 'intent' | 'coreRate'>;

function pct(v: number | null): string {
  return v === null ? '—' : `${(v * 100).toFixed(1)}%`;
}
function num(v: number | null): string {
  return v === null ? '—' : String(v);
}

function downloadCsv(filename: string, rows: (string | number | null)[][]) {
  const esc = (c: string | number | null) => {
    const s = c === null ? '' : String(c);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = rows.map((r) => r.map(esc).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // filters
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [utmSource, setUtmSource] = useState('');

  // ui state
  const [sortKey, setSortKey] = useState<SortKey>('coreRate');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedFd, setSelectedFd] = useState<string>('pc1-quiz');
  const [interviewOnly, setInterviewOnly] = useState(false);

  async function fetchData(pw: string) {
    setLoading(true);
    setError('');
    try {
      const qs = new URLSearchParams({ password: pw });
      if (from) qs.set('from', from);
      if (to) qs.set('to', to);
      if (utmSource) qs.set('utm_source', utmSource);
      const res = await fetch(`/api/admin?${qs.toString()}`);
      if (!res.ok) {
        setError('비밀번호가 틀렸습니다.');
        return;
      }
      setData(await res.json());
    } catch {
      setError('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(password);
  }

  const sortedMaster = useMemo(() => {
    if (!data) return [];
    const rows = [...data.master];
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (sortKey === 'fd_id') return sortAsc ? a.fd_id.localeCompare(b.fd_id) : b.fd_id.localeCompare(a.fd_id);
      const an = av === null ? -1 : (av as number);
      const bn = bv === null ? -1 : (bv as number);
      return sortAsc ? an - bn : bn - an;
    });
    return rows;
  }, [data, sortKey, sortAsc]);

  if (!data) {
    return (
      <main className="max-w-sm mx-auto px-4 py-20">
        <h1 className="text-xl font-bold mb-6">관리자 대시보드</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full card px-4 py-3 text-sm"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[color:var(--color-brand)] text-white rounded-xl py-3 text-sm">
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </main>
    );
  }

  const selectedFunnel = data.funnels[selectedFd];
  const empty = data.total_events === 0;

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  function exportMaster() {
    const header = ['fd_id', '방문', 'CTA', '입력시작', '완주', '리드', '의향', '핵심전환율', '기준', '판정'];
    const rows = data!.master.map((m) => [
      m.fd_id,
      m.visits,
      num(m.cta),
      num(m.start),
      num(m.complete),
      m.lead,
      num(m.intent),
      m.coreRate === null ? '' : (m.coreRate * 100).toFixed(1) + '%',
      m.threshold === null ? '' : (m.threshold * 100).toFixed(0) + '%',
      VERDICT_BADGE[m.verdict].label,
    ]);
    downloadCsv('master.csv', [header, ...rows]);
  }

  function exportLeads() {
    const header = ['email', 'name', 'fd_id', 'utm_source', 'utm_medium', 'utm_term', 'interview_ok', 'contact', 'created_at'];
    const src = interviewOnly ? data!.leads.filter((l) => l.interview_ok) : data!.leads;
    const rows = src.map((l) => [l.email, l.name, l.fd_id, l.utm_source, l.utm_medium, l.utm_term, l.interview_ok ? 'Y' : '', l.contact, l.created_at]);
    downloadCsv(interviewOnly ? 'leads-interview.csv' : 'leads.csv', [header, ...rows]);
  }

  const sortHeaders: { key: SortKey; label: string }[] = [
    { key: 'fd_id', label: 'fd_id' },
    { key: 'visits', label: '방문' },
    { key: 'cta', label: 'CTA' },
    { key: 'start', label: '입력시작' },
    { key: 'complete', label: '완주' },
    { key: 'lead', label: '리드' },
    { key: 'intent', label: '의향' },
    { key: 'coreRate', label: '핵심전환율' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold">관리자 대시보드</h1>
        <Link href="/admin/links" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]">
          UTM 링크 빌더 →
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        총 이벤트: {data.total_events} · 총 리드: {data.total_leads}
      </p>

      {/* PC1 모니터링 카드 */}
      <Pc1Card data={data} />

      {/* 컨트롤 */}
      <div className="flex flex-wrap items-end gap-3 mb-8 p-4 bg-gray-50 rounded-xl">
        <label className="text-xs text-gray-600">
          시작일
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="block border border-[color:var(--color-line)] rounded-lg px-2 py-1 text-sm" />
        </label>
        <label className="text-xs text-gray-600">
          종료일
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="block border border-[color:var(--color-line)] rounded-lg px-2 py-1 text-sm" />
        </label>
        <label className="text-xs text-gray-600">
          utm_source
          <select value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className="block border border-[color:var(--color-line)] rounded-lg px-2 py-1 text-sm">
            <option value="">전체</option>
            {data.utmSourceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => fetchData(password)} className="bg-[color:var(--color-brand)] text-white rounded-lg px-4 py-2 text-sm">
          적용
        </button>
        <button onClick={exportMaster} className="border border-[color:var(--color-line)] rounded-lg px-4 py-2 text-sm">
          CSV 내보내기
        </button>
      </div>

      {empty && (
        <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-400 text-sm">
          선택한 조건에 해당하는 데이터가 없습니다.
        </div>
      )}

      {!empty && (
        <>
          {/* 섹션 A — 마스터 비교 테이블 */}
          <section className="mb-10">
            <h2 className="font-semibold mb-3">A. 마스터 비교 (9개 fd)</h2>
            <div className="overflow-x-auto card">
              <table className="w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    {sortHeaders.map((h, i) => (
                      <th
                        key={h.key}
                        onClick={() => toggleSort(h.key)}
                        className={`px-3 py-2 text-gray-600 cursor-pointer select-none ${i === 0 ? 'text-left sticky left-0 bg-gray-50 z-10' : 'text-right'}`}
                      >
                        {h.label}
                        {sortKey === h.key ? (sortAsc ? ' ▲' : ' ▼') : ''}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-gray-600 text-right">단계전환(방문→CTA→완주→리드)</th>
                    <th className="px-3 py-2 text-gray-600 text-right">기준</th>
                    <th className="px-3 py-2 text-gray-600 text-center sticky right-0 bg-gray-50 z-10">판정</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMaster.map((m) => {
                    const badge = VERDICT_BADGE[m.verdict];
                    const isSel = m.fd_id === selectedFd;
                    return (
                      <tr
                        key={m.fd_id}
                        onClick={() => setSelectedFd(m.fd_id)}
                        className={`border-t border-gray-100 cursor-pointer hover:bg-[color:var(--color-brand-tint)] ${isSel ? 'bg-[color:var(--color-brand-tint)]' : ''}`}
                      >
                        <td className={`px-3 py-2 text-left font-medium sticky left-0 z-10 ${isSel ? 'bg-[color:var(--color-brand-tint)]' : 'bg-white'}`}>{m.fd_id}</td>
                        <td className="px-3 py-2 text-right">{m.visits}</td>
                        <td className="px-3 py-2 text-right">{num(m.cta)}</td>
                        <td className="px-3 py-2 text-right">{num(m.start)}</td>
                        <td className="px-3 py-2 text-right">{num(m.complete)}</td>
                        <td className="px-3 py-2 text-right font-medium">{m.lead}</td>
                        <td className="px-3 py-2 text-right">
                          {num(m.intent)}
                          {m.intentLabel ? <span className="text-gray-400 text-xs"> {m.intentLabel}</span> : ''}
                        </td>
                        <td className="px-3 py-2 text-right font-semibold">{pct(m.coreRate)}</td>
                        <td className="px-3 py-2 text-right text-gray-400 text-xs">
                          {pct(m.stepRates.pageCta)} · {pct(m.stepRates.ctaComplete)} · {pct(m.stepRates.completeLead)}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-500">{m.threshold === null ? '미정' : `${(m.threshold * 100).toFixed(0)}%`}</td>
                        <td className={`px-3 py-2 text-center sticky right-0 z-10 ${isSel ? 'bg-[color:var(--color-brand-tint)]' : 'bg-white'}`} style={{ color: badge.color }}>
                          {badge.icon} {badge.label}
                          {!m.sampleOk && <span className="block text-[10px] text-gray-400">n 부족</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">행을 클릭하면 아래 퍼널 상세가 갱신됩니다. 핵심전환율 기본 내림차순.</p>
          </section>

          {/* 섹션 B — 퍼널 상세 */}
          <section className="mb-10">
            <h2 className="font-semibold mb-3">B. 퍼널 상세 — {selectedFd}</h2>
            {selectedFunnel && <FunnelView funnel={selectedFunnel} />}
          </section>

          {/* 섹션 C — 세그먼트 분해 */}
          <section className="mb-10">
            <h2 className="font-semibold mb-3">C. 세그먼트 분해</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <SegmentTable title="utm_source" rows={data.segments.byUtmSource} />
              <SegmentTable title="utm_medium" rows={data.segments.byUtmMedium} />
              <SegmentTable title="channel_variant" rows={data.segments.byChannelVariant} />
            </div>
            {selectedFd === 'pc1-preorder' && (
              <div className="mt-4">
                <SegmentTable
                  title="price variant (사전구매 의향 전환율)"
                  rows={data.segments.byPriceVariant.map((r) => ({ ...r, key: `${r.key} ${PRICE_VARIANTS[r.key] ?? ''}` }))}
                  visitLabel="price_view"
                  leadLabel="preorder_intent"
                />
              </div>
            )}
            {selectedFd === 'pc3-content' && (
              <div className="mt-4">
                <SegmentTable title="utm_term / slug (콘텐츠→리드)" rows={data.segments.byUtmTerm} visitLabel="content_view" leadLabel="lead" />
              </div>
            )}
          </section>

          {/* 섹션 D — 지불의사 & 리드 */}
          <section className="mb-10">
            <h2 className="font-semibold mb-3">D. 지불의사 & 리드</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Counter label="preorder_intent" value={data.intents.preorder_intent} highlight />
              <Counter label="subscribe_intent" value={data.intents.subscribe_intent} highlight />
              <Counter label="invite_click" value={data.intents.invite_click} />
              <Counter label="kakao_channel_click" value={data.intents.kakao_channel_click} />
            </div>

            {(() => {
              const shown = interviewOnly ? data.leads.filter((l) => l.interview_ok) : data.leads;
              const interviewCount = data.leads.filter((l) => l.interview_ok).length;
              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-sm">리드 ({shown.length})</h3>
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={interviewOnly}
                          onChange={(e) => setInterviewOnly(e.target.checked)}
                          className="w-4 h-4 accent-[color:var(--color-brand)]"
                        />
                        인터뷰 가능만 ({interviewCount})
                      </label>
                    </div>
                    <button onClick={exportLeads} disabled={shown.length === 0} className="border border-[color:var(--color-line)] rounded-lg px-3 py-1.5 text-xs disabled:opacity-40">
                      {interviewOnly ? '인터뷰 리드 CSV' : '리드 CSV 내보내기'}
                    </button>
                  </div>
                  {shown.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 text-sm">
                      {interviewOnly ? '인터뷰 가능 리드 없음' : '리드 데이터 없음'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto card">
                      <table className="w-full text-sm whitespace-nowrap">
                        <thead className="bg-gray-50">
                          <tr>
                            {['email', 'name', 'fd_id', 'utm_source', 'utm_medium', 'utm_term', '인터뷰', 'contact', 'created_at'].map((h) => (
                              <th key={h} className="px-3 py-2 text-left text-gray-600">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {shown.map((l, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="px-3 py-2">{l.email}</td>
                              <td className="px-3 py-2">{l.name}</td>
                              <td className="px-3 py-2">{l.fd_id}</td>
                              <td className="px-3 py-2">{l.utm_source}</td>
                              <td className="px-3 py-2">{l.utm_medium}</td>
                              <td className="px-3 py-2">{l.utm_term}</td>
                              <td className="px-3 py-2 text-center">{l.interview_ok ? '🟢' : ''}</td>
                              <td className="px-3 py-2">{l.contact}</td>
                              <td className="px-3 py-2 text-gray-400">{l.created_at}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              );
            })()}
          </section>
        </>
      )}
    </main>
  );
}

function FunnelView({ funnel }: { funnel: FunnelDetail }) {
  const top = funnel.stages[0]?.count ?? 0;
  if (top === 0) {
    return <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 text-sm">데이터 없음</div>;
  }
  return (
    <div className="space-y-2">
      {funnel.stages.map((s) => {
        const widthPct = top > 0 ? Math.max((s.count / top) * 100, 2) : 0;
        const isMaxDrop = s.key === funnel.maxDropStage;
        return (
          <div key={s.key} className="flex items-center gap-3">
            <div className="w-20 text-xs text-gray-600 shrink-0">{s.label}</div>
            <div className="flex-1 bg-gray-100 rounded-lg h-7 relative overflow-hidden">
              <div
                className="h-7 rounded-lg flex items-center px-2"
                style={{ width: `${widthPct}%`, backgroundColor: isMaxDrop ? '#fecaca' : '#c9bdff' }}
              >
                <span className="text-xs font-medium text-gray-700">{s.count}</span>
              </div>
            </div>
            <div className={`w-28 text-xs text-right shrink-0 ${isMaxDrop ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
              {s.rateFromPrev === null ? '—' : `${(s.rateFromPrev * 100).toFixed(0)}% 통과`}
              {isMaxDrop && s.dropFromPrev !== null ? ` (최대이탈 ${(s.dropFromPrev * 100).toFixed(0)}%)` : ''}
            </div>
          </div>
        );
      })}

      {funnel.questionAbandon && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">민감 문항별 이탈 (question_abandon)</h3>
          <div className="space-y-1">
            {Object.entries(funnel.questionAbandon).map(([q, c]) => (
              <div key={q} className="flex items-center gap-3">
                <div className="w-12 text-xs text-gray-600">{q}</div>
                <div className="flex-1 bg-gray-100 rounded h-5">
                  <div className="h-5 rounded bg-orange-200" style={{ width: `${Math.min(c * 10, 100)}%` }} />
                </div>
                <div className="w-10 text-xs text-right text-gray-500">{c}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SegmentTable({
  title,
  rows,
  visitLabel = '방문',
  leadLabel = '리드',
}: {
  title: string;
  rows: SegmentRow[];
  visitLabel?: string;
  leadLabel?: string;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">{title}</div>
      {rows.length === 0 ? (
        <div className="px-3 py-4 text-center text-gray-400 text-xs">데이터 없음</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs">
              <th className="text-left px-3 py-1 font-normal">key</th>
              <th className="text-right px-3 py-1 font-normal">{visitLabel}</th>
              <th className="text-right px-3 py-1 font-normal">{leadLabel}</th>
              <th className="text-right px-3 py-1 font-normal">전환율</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-gray-100">
                <td className="px-3 py-1.5">{r.key}</td>
                <td className="px-3 py-1.5 text-right">{r.visits}</td>
                <td className="px-3 py-1.5 text-right">{r.lead}</td>
                <td className="px-3 py-1.5 text-right font-medium">{pct(r.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Pc1Card({ data }: { data: Payload }) {
  const quiz = data.master.find((m) => m.fd_id === 'pc1-quiz');
  const preorder = data.master.find((m) => m.fd_id === 'pc1-preorder');
  if (!quiz) return null;

  const visits = quiz.visits;
  const complete = quiz.complete ?? 0;
  const lead = quiz.lead;
  const preorderIntent = data.intents.preorder_intent;

  const completeToLead = complete > 0 ? lead / complete : null;
  const preorderRate = preorder?.coreRate ?? null; // price_view → preorder_intent
  const visitToLead = visits > 0 ? lead / visits : null;

  const sampleShort = visits < PC1_SAMPLE.MIN_VISITS || complete < PC1_SAMPLE.MIN_COMPLETE;

  // 신호 해석
  const signal = sampleShort
    ? { icon: '⚪', text: '전환율 판단 보류', color: '#9ca3af' }
    : visitToLead !== null && visitToLead < PC1_CRITERIA.leadFloor
    ? { icon: '🔴', text: '신청률 미달', color: '#dc2626' }
    : (completeToLead ?? 0) >= PC1_CRITERIA.completeToLead && (preorderRate ?? 0) >= PC1_CRITERIA.preorderIntent
    ? { icon: '🟢', text: '수요 신호 양호', color: '#16a34a' }
    : { icon: '🟡', text: '주의 — 기준 일부 미달', color: '#ca8a04' };

  const top = data.segments.byUtmSource.slice(0, 5);

  return (
    <div className="card p-5 mb-8 bg-[color:var(--color-brand-tint)] border-[color:var(--color-brand)]/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[color:var(--color-brand-dark)]">PC1 현황 (자가진단 → 사전예약)</h2>
        <span className="text-sm font-semibold" style={{ color: signal.color }}>
          {signal.icon} {signal.text}
          {sampleShort && <span className="ml-1 text-xs text-gray-500">(방문&lt;{PC1_SAMPLE.MIN_VISITS} 또는 완주&lt;{PC1_SAMPLE.MIN_COMPLETE})</span>}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Counter label="방문" value={visits} />
        <Counter label="진단완주" value={complete} />
        <Counter label="신청(lead)" value={lead} highlight />
        <Counter label="사전예약의향" value={preorderIntent} highlight />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
        <RateBox label="완주→신청" value={completeToLead} target={PC1_CRITERIA.completeToLead} muted={sampleShort} />
        <RateBox label="사전예약의향(price_view→intent)" value={preorderRate} target={PC1_CRITERIA.preorderIntent} muted={sampleShort} />
        <RateBox label="방문→신청" value={visitToLead} target={PC1_CRITERIA.leadFloor} muted={sampleShort} />
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">utm_source별 (방문 / 리드)</div>
        <div className="flex flex-wrap gap-2">
          {top.length === 0 ? (
            <span className="text-xs text-gray-400">데이터 없음</span>
          ) : (
            top.map((s) => (
              <span key={s.key} className="bg-white border border-[color:var(--color-line)] rounded-lg px-2.5 py-1 text-xs">
                {s.key}: {s.visits} / {s.lead}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function RateBox({ label, value, target, muted }: { label: string; value: number | null; target: number; muted?: boolean }) {
  const ok = value !== null && value >= target;
  return (
    <div className="bg-white rounded-xl p-3 border border-[color:var(--color-line)]">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-lg font-bold ${muted ? 'text-gray-400' : ok ? 'text-green-600' : 'text-gray-800'}`}>
        {value === null ? '—' : `${(value * 100).toFixed(1)}%`}
        <span className="text-xs font-normal text-gray-400 ml-1">/ 목표 {(target * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

function Counter({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 border ${highlight ? 'border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand-tint)]' : 'border-[color:var(--color-line)]'}`}>
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-2xl font-bold ${highlight ? 'text-[color:var(--color-brand-dark)]' : 'text-gray-800'}`}>{value}</div>
    </div>
  );
}
