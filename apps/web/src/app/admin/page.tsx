'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';

type Log = {
  id: string;
  email: string | null;
  name: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  path: string | null;
  referrer: string | null;
  createdAt: string | Date;
};

type Visitor = {
  key: string;
  userId: string | null;
  ipAddress: string | null;
  name: string | null;
  email: string | null;
  userAgent: string | null;
  lastPath: string | null;
  visitCount: number;
  firstVisit: string | Date;
  lastVisit: string | Date;
  isOnline: boolean;
};

function formatDate(d: string | Date) {
  return new Date(d as string).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

function shortUA(ua: string | null) {
  if (!ua) return '-';
  const m = ua.match(/\(([^)]+)\)/);
  return m ? m[1].slice(0, 40) : ua.slice(0, 40);
}

// ─── 방문자 통합 뷰 ───────────────────────────────────────────
function VisitorsView({ search }: { search: string }) {
  const [orderBy, setOrderBy] = useState<'lastVisit_desc' | 'visitCount_desc'>('lastVisit_desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, refetch } = trpc.admin.getVisitors.useQuery({
    search: search || undefined,
    orderBy,
  });

  const deleteMutation = trpc.admin.deleteVisitors.useMutation({
    onSuccess: () => {
      setSelected(new Set());
      setShowDeleteModal(false);
      void refetch();
    },
  });

  const visitors: Visitor[] = (data?.visitors ?? []) as Visitor[];
  const allKeys = visitors.map((v) => v.key);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.has(k));

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allKeys));
  }

  function toggleOne(key: string) {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelected(next);
  }

  function confirmDelete() {
    const chosen = visitors.filter((v) => selected.has(v.key));
    deleteMutation.mutate({
      userIds: chosen.filter((v) => v.userId).map((v) => v.userId!),
      ipAddresses: chosen.filter((v) => !v.userId && v.ipAddress).map((v) => v.ipAddress!),
    });
  }

  const selectedVisitCount = visitors
    .filter((v) => selected.has(v.key))
    .reduce((s, v) => s + v.visitCount, 0);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          방문자 <strong>{visitors.length}</strong>명 · 총 방문 <strong>{data?.totalLogs ?? 0}</strong>회
          {selected.size > 0 && ` · ${selected.size}명 선택됨`}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as typeof orderBy)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="lastVisit_desc">최근 방문순</option>
            <option value="visitCount_desc">방문 횟수순</option>
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              선택 삭제 ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">로딩 중...</div>
        ) : visitors.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">방문자가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">이름</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">이메일</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">IP</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">방문 횟수</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">최근 방문</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">첫 방문</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">기기</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, i) => (
                  <tr
                    key={v.key}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected.has(v.key) ? 'bg-red-50' : i % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(v.key)}
                        onChange={() => toggleOne(v.key)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      <span className="inline-flex items-center gap-1.5">
                        {v.userId && (
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            title={v.isOnline ? '접속중' : '미접속중'}
                            style={{ backgroundColor: v.isOnline ? '#22C55E' : '#D1D5DB' }}
                          />
                        )}
                        {v.name ?? <span className="text-gray-300">비로그인</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{v.email ?? <span className="text-gray-300">-</span>}</td>
                    <td className="px-4 py-3 font-mono text-gray-600 text-xs">{v.ipAddress ?? <span className="text-gray-300">-</span>}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-block min-w-[2.25rem] px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: v.visitCount >= 10 ? 'var(--color-primary-dark)' : 'var(--color-primary)' }}
                      >
                        {v.visitCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(v.lastVisit)}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{formatDate(v.firstVisit)}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate" title={v.userAgent ?? ''}>
                      {shortUA(v.userAgent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">정말 삭제하시겠습니까?</h2>
            <p className="text-sm text-gray-500">
              선택한 <strong>{selected.size}명</strong>의 접속 기록 총{' '}
              <strong>{selectedVisitCount}건</strong>이 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>
            {deleteMutation.isError && (
              <p className="text-sm text-red-500">{deleteMutation.error.message}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── 전체 기록 뷰 ─────────────────────────────────────────────
function LogsView({ search }: { search: string }) {
  const [orderBy, setOrderBy] = useState<'createdAt_desc' | 'createdAt_asc'>('createdAt_desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, refetch } = trpc.admin.getLogs.useQuery({
    search: search || undefined,
    orderBy,
    limit: 100,
  });

  const deleteMutation = trpc.admin.deleteLogs.useMutation({
    onSuccess: () => {
      setSelected(new Set());
      setShowDeleteModal(false);
      void refetch();
    },
  });

  const logs: Log[] = (data?.logs ?? []) as Log[];
  const allIds = logs.map((l) => l.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allIds));
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          총 <strong>{logs.length}</strong>건{selected.size > 0 && ` · ${selected.size}개 선택됨`}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as typeof orderBy)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="createdAt_desc">최신순</option>
            <option value="createdAt_asc">오래된순</option>
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              선택 삭제 ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">로딩 중...</div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">기록이 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">이름</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">이메일</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">IP</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">접속 경로</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">유입 경로</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">기기</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">접속 일시</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={log.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected.has(log.id) ? 'bg-red-50' : i % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(log.id)}
                        onChange={() => toggleOne(log.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-800">{log.name ?? <span className="text-gray-300">미동의</span>}</td>
                    <td className="px-4 py-3 text-gray-600">{log.email ?? <span className="text-gray-300">미동의</span>}</td>
                    <td className="px-4 py-3 font-mono text-gray-600 text-xs">{log.ipAddress ?? <span className="text-gray-300">-</span>}</td>
                    <td className="px-4 py-3 text-gray-600">{log.path ?? '-'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate" title={log.referrer ?? ''}>
                      {log.referrer ? log.referrer : <span className="text-gray-300">직접 방문</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate" title={log.userAgent ?? ''}>
                      {shortUA(log.userAgent)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(log.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">정말 삭제하시겠습니까?</h2>
            <p className="text-sm text-gray-500">
              선택한 <strong>{selected.size}개</strong>의 접속 로그가 영구 삭제됩니다.
              이 작업은 되돌릴 수 없습니다.
            </p>
            {deleteMutation.isError && (
              <p className="text-sm text-red-500">{deleteMutation.error.message}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => deleteMutation.mutate({ ids: Array.from(selected) })}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── 문의 관리 뷰 ─────────────────────────────────────────────
type Inquiry = {
  id: string;
  userId: string | null;
  email: string;
  category: 'bug' | 'feature' | 'payment' | 'privacy' | 'etc' | null;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  emailSent: boolean;
  createdAt: string | Date;
};

const INQUIRY_CATEGORY_LABEL: Record<string, string> = {
  bug: '버그/오류', feature: '기능 제안', payment: '결제', privacy: '개인정보', etc: '기타',
};
const INQUIRY_STATUS_LABEL: Record<string, string> = {
  new: '신규', in_progress: '처리 중', resolved: '완료',
};
const INQUIRY_STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  new: { bg: '#FEE2E2', fg: '#DC2626' },
  in_progress: { bg: '#FEF3C7', fg: '#B45309' },
  resolved: { bg: '#D1FAE5', fg: '#047857' },
};

function InquiriesView({ search }: { search: string }) {
  const [category, setCategory] = useState<'' | 'bug' | 'feature' | 'payment' | 'privacy' | 'etc'>('');
  const [status, setStatus] = useState<'' | 'new' | 'in_progress' | 'resolved'>('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, refetch } = trpc.inquiry.list.useQuery({
    search: search || undefined,
    category: category || undefined,
    status: status || undefined,
    limit: 100,
  });

  const setStatusMutation = trpc.inquiry.setStatus.useMutation({ onSuccess: () => void refetch() });
  const deleteMutation = trpc.inquiry.deleteMany.useMutation({
    onSuccess: () => {
      setSelected(new Set());
      setShowDeleteModal(false);
      void refetch();
    },
  });

  const inquiries: Inquiry[] = (data?.inquiries ?? []) as Inquiry[];
  const allIds = inquiries.map((q) => q.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));
  const statusCounts = (data?.statusCounts ?? {}) as Record<string, number>;

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-gray-500">
          신규 <strong>{statusCounts.new ?? 0}</strong> · 처리 중 <strong>{statusCounts.in_progress ?? 0}</strong> · 완료 <strong>{statusCounts.resolved ?? 0}</strong>
          {selected.size > 0 && ` · ${selected.size}건 선택됨`}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
            aria-label="유형 필터"
          >
            <option value="">전체 유형</option>
            {Object.entries(INQUIRY_CATEGORY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
            aria-label="상태 필터"
          >
            <option value="">전체 상태</option>
            {Object.entries(INQUIRY_STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              선택 삭제 ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">로딩 중...</div>
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">접수된 문의가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => setSelected(allSelected ? new Set() : new Set(allIds))}
                      className="w-4 h-4"
                      aria-label="전체 선택"
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">접수일</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">유형</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">이메일</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">내용</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">알림</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">상태</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((q, i) => (
                  <tr
                    key={q.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors align-top ${selected.has(q.id) ? 'bg-red-50' : i % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(q.id)} onChange={() => toggleOne(q.id)} className="w-4 h-4" />
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(q.createdAt)}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {q.category ? INQUIRY_CATEGORY_LABEL[q.category] : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <a href={`mailto:${q.email}`} className="underline decoration-gray-300 hover:text-gray-900">{q.email}</a>
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-[320px]">
                      <button
                        onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                        className="text-left w-full"
                        title="눌러서 전문 보기"
                      >
                        {expanded === q.id ? (
                          <span className="whitespace-pre-wrap">{q.message}</span>
                        ) : (
                          <span className="block truncate">{q.message}</span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3" title={q.emailSent ? '관리자 메일 발송됨' : '메일 발송 실패 — DB에는 저장됨'}>
                      {q.emailSent ? '📧' : <span className="text-red-400 text-xs font-medium">실패</span>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => setStatusMutation.mutate({ id: q.id, status: e.target.value as Inquiry['status'] })}
                        disabled={setStatusMutation.isPending}
                        className="px-2 py-1 rounded-lg text-xs font-medium border-0 focus:outline-none"
                        style={{ backgroundColor: INQUIRY_STATUS_COLOR[q.status].bg, color: INQUIRY_STATUS_COLOR[q.status].fg }}
                        aria-label="상태 변경"
                      >
                        {Object.entries(INQUIRY_STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">정말 삭제하시겠습니까?</h2>
            <p className="text-sm text-gray-500">
              선택한 <strong>{selected.size}건</strong>의 문의가 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>
            {deleteMutation.isError && <p className="text-sm text-red-500">{deleteMutation.error.message}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => deleteMutation.mutate({ ids: Array.from(selected) })}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── 방문자 분석(퍼널) 뷰 ─────────────────────────────────────
const PERIODS = [
  { value: 1, label: '오늘' },
  { value: 7, label: '7일' },
  { value: 30, label: '30일' },
] as const;

function pct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

function FunnelView({ search }: { search: string }) {
  const [days, setDays] = useState<number>(7);
  const [seg, setSeg] = useState<'anon' | 'converted'>('anon');

  const summary = trpc.admin.funnelSummary.useQuery({ days });
  const channels = trpc.admin.channelStats.useQuery({ days });
  const anon = trpc.admin.anonymousVisitors.useQuery({ days, search: search || undefined, limit: 100 });
  const converted = trpc.admin.convertedVisitors.useQuery({ days, limit: 100 });
  const trend = trpc.admin.visitorTrend.useQuery({ days: Math.min(days, 30) });

  const s = summary.data;
  const maxTrend = Math.max(1, ...(trend.data ?? []).map((d) => d.visitors));

  return (
    <div className="space-y-4">
      {/* 기간 필터 */}
      <div className="flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setDays(p.value)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={days === p.value ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: '#6B7280', border: '1px solid #E5E7EB' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '총 방문자', value: s ? s.totalVisitors.toLocaleString() : '—', hint: '고유 익명 방문자' },
          { label: '전환 수', value: s ? s.conversions.toLocaleString() : '—', hint: '가입/로그인 도달' },
          { label: '전환율', value: s ? pct(s.conversionRate) : '—', hint: '전환 / 방문자' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400">{c.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{c.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{c.hint}</p>
          </div>
        ))}
      </div>

      {/* 채널별 표 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-800">채널별 전환 (first-touch)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">출처</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">방문</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">전환</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">전환율</th>
              </tr>
            </thead>
            <tbody>
              {(channels.data ?? []).length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">데이터가 없습니다.</td></tr>
              ) : (channels.data ?? []).map((c) => (
                <tr key={c.source} className="border-b border-gray-50">
                  <td className="px-4 py-2 text-gray-800">{c.source}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{c.visits.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{c.conversions.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-medium" style={{ color: 'var(--color-primary-dark)' }}>{pct(c.conversionRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 일자별 추이 */}
      {(trend.data ?? []).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">일자별 방문 / 전환</p>
          <div className="space-y-1.5">
            {(trend.data ?? []).map((d) => (
              <div key={d.date} className="flex items-center gap-2 text-xs">
                <span className="w-12 text-gray-400 shrink-0">{d.date.slice(5)}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.visitors / maxTrend) * 100}%`, backgroundColor: 'var(--color-primary-light)' }} />
                </div>
                <span className="w-24 text-right text-gray-500 shrink-0">{d.visitors}명 · {d.conversions}전환</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 세그먼트 토글 */}
      <div className="flex rounded-xl border border-gray-200 bg-white p-1 text-sm font-medium w-fit">
        {[
          { value: 'anon', label: '비로그인 방문자' },
          { value: 'converted', label: '전환 사용자' },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => setSeg(t.value as typeof seg)}
            className="px-4 py-1.5 rounded-lg transition-colors"
            style={seg === t.value ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: '#6B7280' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {seg === 'anon' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">방문자(익명)</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">출처</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">진입 경로</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-600">방문</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">기기</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">첫 방문</th>
                </tr>
              </thead>
              <tbody>
                {anon.isLoading ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">로딩 중...</td></tr>
                ) : (anon.data ?? []).length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">아직 전환되지 않은 방문자가 없습니다.</td></tr>
                ) : (anon.data ?? []).map((v) => (
                  <tr key={v.anonymousId} className="border-b border-gray-50">
                    <td className="px-4 py-2 font-mono text-xs text-gray-400">{v.anonymousId.slice(0, 8)}…</td>
                    <td className="px-4 py-2 text-gray-700">{v.source}</td>
                    <td className="px-4 py-2 text-gray-500">{v.lastPath ?? '-'}</td>
                    <td className="px-4 py-2 text-center text-gray-600">{v.visitCount}</td>
                    <td className="px-4 py-2 text-gray-500">{v.deviceType ?? '-'}</td>
                    <td className="px-4 py-2 text-gray-400 text-xs whitespace-nowrap">{formatDate(v.firstSeen)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">이름</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">이메일</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">유입 출처</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">전환 시각</th>
                </tr>
              </thead>
              <tbody>
                {converted.isLoading ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">로딩 중...</td></tr>
                ) : (converted.data ?? []).length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">전환된 사용자가 없습니다.</td></tr>
                ) : (converted.data ?? []).map((v) => (
                  <tr key={v.anonymousId} className="border-b border-gray-50">
                    <td className="px-4 py-2 text-gray-800">{v.name ?? <span className="text-gray-300">-</span>}</td>
                    <td className="px-4 py-2 text-gray-600">{v.email ?? <span className="text-gray-300">-</span>}</td>
                    <td className="px-4 py-2 text-gray-700">{v.source}</td>
                    <td className="px-4 py-2 text-gray-400 text-xs whitespace-nowrap">{v.convertedAt ? formatDate(v.convertedAt) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">
        익명 방문자는 개인 식별 정보 없이 무작위 ID로만 집계됩니다. IP 원문은 저장하지 않아요(해시만).
      </p>
    </div>
  );
}

// ─── 페이지 ──────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'funnel' | 'visitors' | 'logs' | 'inquiries'>('funnel');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // 로그인 토큰이 없으면 로그인 페이지로 보낸다
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null;
    if (!token) {
      router.replace('/login?next=/admin');
    } else {
      setHasToken(true);
    }
  }, [router]);

  const { data: adminCheck, isLoading: adminLoading, error: adminError } = trpc.admin.isAdmin.useQuery(undefined, {
    enabled: hasToken === true,
    retry: false,
  });
  const checkingAdmin = hasToken === null || (hasToken === true && adminLoading);

  useEffect(() => {
    // 로그인은 했지만 관리자가 아닌 경우 피드로
    if (hasToken && !adminLoading && (adminError || (adminCheck && !adminCheck.isAdmin))) {
      router.replace('/feed');
    }
  }, [adminCheck, adminLoading, adminError, hasToken, router]);

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <p className="text-gray-400">권한 확인 중...</p>
      </div>
    );
  }

  if (!adminCheck?.isAdmin) return null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/feed')} className="text-gray-400 hover:text-gray-600 text-sm">← 피드</button>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>관리자 대시보드</h1>
        </div>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">ADMIN</span>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* 탭 & 검색 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex rounded-xl border border-gray-200 bg-white p-1 text-sm font-medium">
            {[
              { value: 'funnel', label: '📈 방문자 분석' },
              { value: 'visitors', label: '👥 방문자별' },
              { value: 'logs', label: '📋 전체 기록' },
              { value: 'inquiries', label: '💬 문의 관리' },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value as typeof tab)}
                className="px-4 py-1.5 rounded-lg transition-colors"
                style={
                  tab === t.value
                    ? { backgroundColor: 'var(--color-primary)', color: 'white' }
                    : { color: '#6B7280' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              tab === 'inquiries'
                ? '이메일 또는 문의 내용 검색...'
                : tab === 'funnel'
                  ? '출처(utm_source) 또는 방문자 ID 검색...'
                  : '이름, 이메일 또는 IP 검색...'
            }
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
          />
        </div>

        {tab === 'funnel' ? (
          <FunnelView search={debouncedSearch} />
        ) : tab === 'visitors' ? (
          <VisitorsView search={debouncedSearch} />
        ) : tab === 'logs' ? (
          <LogsView search={debouncedSearch} />
        ) : (
          <InquiriesView search={debouncedSearch} />
        )}
      </main>
    </div>
  );
}
