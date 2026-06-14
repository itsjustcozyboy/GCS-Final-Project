'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/Toast';

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
  anonymousId?: string | null;
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
  const { t } = useTranslation('admin');
  const toast = useToast();
  const [orderBy, setOrderBy] = useState<'lastVisit_desc' | 'visitCount_desc'>('lastVisit_desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.admin.getVisitors.useQuery({
    search: search || undefined,
    orderBy,
  }, {
    refetchInterval: 10_000,
  });

  const deleteMutation = trpc.admin.deleteVisitors.useMutation({
    onSuccess: (result) => {
      setSelected(new Set());
      setShowDeleteModal(false);
      toast.success(t('common.deleted', { n: result.deletedCount }));
      void Promise.all([
        refetch(),
        utils.admin.funnelSummary.invalidate(),
        utils.admin.channelStats.invalidate(),
        utils.admin.anonymousVisitors.invalidate(),
        utils.admin.convertedVisitors.invalidate(),
        utils.admin.visitorTrend.invalidate(),
      ]);
    },
    onError: () => toast.error(t('common.deleteFailed')),
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
      anonymousIds: chosen.filter((v) => !v.userId && v.anonymousId).map((v) => v.anonymousId!),
    });
  }

  const selectedVisitCount = visitors
    .filter((v) => selected.has(v.key))
    .reduce((s, v) => s + v.visitCount, 0);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {t('visitors.summaryPre')} <strong>{visitors.length}</strong>{t('visitors.summaryMid')} <strong>{data?.totalLogs ?? 0}</strong>{t('visitors.summaryPost')}
          {selected.size > 0 && ` · ${t('visitors.selectedSuffix', { n: selected.size })}`}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as typeof orderBy)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="lastVisit_desc">{t('visitors.orderRecent')}</option>
            <option value="visitCount_desc">{t('visitors.orderCount')}</option>
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              {t('common.selectDelete')} ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">{t('common.loading')}</div>
        ) : visitors.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">{t('visitors.empty')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thName')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thEmail')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thIp')}</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">{t('visitors.thVisitCount')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thLastVisit')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thFirstVisit')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thDevice')}</th>
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
                            title={v.isOnline ? t('visitors.online') : t('visitors.offline')}
                            style={{ backgroundColor: v.isOnline ? '#22C55E' : '#D1D5DB' }}
                          />
                        )}
                        {v.name ?? <span className="text-gray-300">{t('common.notLoggedIn')}</span>}
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
            <h2 className="text-lg font-bold text-gray-900">{t('common.confirmTitle')}</h2>
            <p className="text-sm text-gray-500">
              {t('visitors.deleteDescPre')} <strong>{selected.size}</strong>{t('visitors.deleteDescMid')}{' '}
              <strong>{selectedVisitCount}</strong>{t('visitors.deleteDescPost')}
            </p>
            {deleteMutation.isError && (
              <p className="text-sm text-red-500">{deleteMutation.error.message}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? t('common.deleting') : t('common.delete')}
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
  const { t } = useTranslation('admin');
  const toast = useToast();
  const [orderBy, setOrderBy] = useState<'createdAt_desc' | 'createdAt_asc'>('createdAt_desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const utils = trpc.useUtils();
  const { data, isLoading, refetch } = trpc.admin.getLogs.useQuery({
    search: search || undefined,
    orderBy,
    limit: 100,
  }, {
    refetchInterval: 10_000,
  });

  const deleteMutation = trpc.admin.deleteLogs.useMutation({
    onSuccess: (result) => {
      setSelected(new Set());
      setShowDeleteModal(false);
      toast.success(t('common.deleted', { n: result.deletedCount }));
      void Promise.all([
        refetch(),
        utils.admin.getVisitors.invalidate(),
        utils.admin.funnelSummary.invalidate(),
        utils.admin.channelStats.invalidate(),
        utils.admin.anonymousVisitors.invalidate(),
        utils.admin.convertedVisitors.invalidate(),
        utils.admin.visitorTrend.invalidate(),
      ]);
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
          {t('logs.countPre')} <strong>{logs.length}</strong>{t('logs.countPost')}{selected.size > 0 && ` · ${t('logs.selectedSuffix', { n: selected.size })}`}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as typeof orderBy)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="createdAt_desc">{t('logs.orderNewest')}</option>
            <option value="createdAt_asc">{t('logs.orderOldest')}</option>
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              {t('common.selectDelete')} ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">{t('common.loading')}</div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">{t('logs.empty')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thName')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thEmail')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thIp')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('logs.thPath')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('logs.thReferrer')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('visitors.thDevice')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('logs.thAccessedAt')}</th>
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
                    <td className="px-4 py-3 text-gray-800">{log.name ?? <span className="text-gray-300">{t('logs.consentNone')}</span>}</td>
                    <td className="px-4 py-3 text-gray-600">{log.email ?? <span className="text-gray-300">{t('logs.consentNone')}</span>}</td>
                    <td className="px-4 py-3 font-mono text-gray-600 text-xs">{log.ipAddress ?? <span className="text-gray-300">-</span>}</td>
                    <td className="px-4 py-3 text-gray-600">{log.path ?? '-'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate" title={log.referrer ?? ''}>
                      {log.referrer ? log.referrer : <span className="text-gray-300">{t('logs.directVisit')}</span>}
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
            <h2 className="text-lg font-bold text-gray-900">{t('common.confirmTitle')}</h2>
            <p className="text-sm text-gray-500">
              {t('logs.deleteDescPre')} <strong>{selected.size}</strong>{t('logs.deleteDescPost')}
            </p>
            {deleteMutation.isError && (
              <p className="text-sm text-red-500">{deleteMutation.error.message}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => deleteMutation.mutate({ ids: Array.from(selected) })}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? t('common.deleting') : t('common.delete')}
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

const INQUIRY_STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  new: { bg: '#FEE2E2', fg: '#DC2626' },
  in_progress: { bg: '#FEF3C7', fg: '#B45309' },
  resolved: { bg: '#D1FAE5', fg: '#047857' },
};

function InquiriesView({ search }: { search: string }) {
  const { t } = useTranslation('admin');
  const INQUIRY_CATEGORY_LABEL: Record<string, string> = {
    bug: t('inquiries.category.bug'), feature: t('inquiries.category.feature'), payment: t('inquiries.category.payment'), privacy: t('inquiries.category.privacy'), etc: t('inquiries.category.etc'),
  };
  const INQUIRY_STATUS_LABEL: Record<string, string> = {
    new: t('inquiries.status.new'), in_progress: t('inquiries.status.in_progress'), resolved: t('inquiries.status.resolved'),
  };
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
  }, {
    refetchInterval: 10_000,
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
          {t('inquiries.summaryNew')} <strong>{statusCounts.new ?? 0}</strong> · {t('inquiries.summaryProgress')} <strong>{statusCounts.in_progress ?? 0}</strong> · {t('inquiries.summaryResolved')} <strong>{statusCounts.resolved ?? 0}</strong>
          {selected.size > 0 && ` · ${t('inquiries.selectedSuffix', { n: selected.size })}`}
        </p>
        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
            aria-label={t('inquiries.categoryFilterAria')}
          >
            <option value="">{t('inquiries.allCategories')}</option>
            {Object.entries(INQUIRY_CATEGORY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
            aria-label={t('inquiries.statusFilterAria')}
          >
            <option value="">{t('inquiries.allStatus')}</option>
            {Object.entries(INQUIRY_STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              {t('common.selectDelete')} ({selected.size})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">{t('common.loading')}</div>
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">{t('inquiries.empty')}</div>
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
                      aria-label={t('inquiries.selectAllAria')}
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('inquiries.thReceivedAt')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('inquiries.thCategory')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('inquiries.thEmail')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('inquiries.thContent')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('inquiries.thNotify')}</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t('inquiries.thStatus')}</th>
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
                        title={t('inquiries.expandTitle')}
                      >
                        {expanded === q.id ? (
                          <span className="whitespace-pre-wrap">{q.message}</span>
                        ) : (
                          <span className="block truncate">{q.message}</span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3" title={q.emailSent ? t('inquiries.emailSentTitle') : t('inquiries.emailFailTitle')}>
                      {q.emailSent ? '📧' : <span className="text-red-400 text-xs font-medium">{t('inquiries.fail')}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => setStatusMutation.mutate({ id: q.id, status: e.target.value as Inquiry['status'] })}
                        disabled={setStatusMutation.isPending}
                        className="px-2 py-1 rounded-lg text-xs font-medium border-0 focus:outline-none"
                        style={{ backgroundColor: INQUIRY_STATUS_COLOR[q.status].bg, color: INQUIRY_STATUS_COLOR[q.status].fg }}
                        aria-label={t('inquiries.statusChangeAria')}
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
            <h2 className="text-lg font-bold text-gray-900">{t('common.confirmTitle')}</h2>
            <p className="text-sm text-gray-500">
              {t('inquiries.deleteDescPre')} <strong>{selected.size}</strong>{t('inquiries.deleteDescPost')}
            </p>
            {deleteMutation.isError && <p className="text-sm text-red-500">{deleteMutation.error.message}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => deleteMutation.mutate({ ids: Array.from(selected) })}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? t('common.deleting') : t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── 방문자 분석(퍼널) 뷰 ─────────────────────────────────────
function pct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

function FunnelView({ search }: { search: string }) {
  const { t } = useTranslation('admin');
  const PERIODS = [
    { value: 1, label: t('funnel.today') },
    { value: 7, label: t('funnel.d7') },
    { value: 30, label: t('funnel.d30') },
  ];
  const [days, setDays] = useState<number>(7);
  const [seg, setSeg] = useState<'anon' | 'converted'>('anon');

  const liveQuery = { refetchInterval: 10_000 };
  const summary = trpc.admin.funnelSummary.useQuery({ days }, liveQuery);
  const channels = trpc.admin.channelStats.useQuery({ days }, liveQuery);
  const anon = trpc.admin.anonymousVisitors.useQuery({ days, search: search || undefined, limit: 100 }, liveQuery);
  const converted = trpc.admin.convertedVisitors.useQuery({ days, limit: 100 }, liveQuery);
  const trend = trpc.admin.visitorTrend.useQuery({ days: Math.min(days, 30) }, liveQuery);

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
          { label: t('funnel.cardVisitors'), value: s ? s.totalVisitors.toLocaleString() : '—', hint: t('funnel.cardVisitorsHint') },
          { label: t('funnel.cardConversions'), value: s ? s.conversions.toLocaleString() : '—', hint: t('funnel.cardConversionsHint') },
          { label: t('funnel.cardRate'), value: s ? pct(s.conversionRate) : '—', hint: t('funnel.cardRateHint') },
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
        <div className="px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-800">{t('funnel.channelTitle')}</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.thSource')}</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">{t('funnel.thVisits')}</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">{t('funnel.thConversions')}</th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">{t('funnel.thRate')}</th>
              </tr>
            </thead>
            <tbody>
              {(channels.data ?? []).length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">{t('funnel.noData')}</td></tr>
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
          <p className="text-sm font-semibold text-gray-800 mb-3">{t('funnel.trendTitle')}</p>
          <div className="space-y-1.5">
            {(trend.data ?? []).map((d) => (
              <div key={d.date} className="flex items-center gap-2 text-xs">
                <span className="w-12 text-gray-400 shrink-0">{d.date.slice(5)}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.visitors / maxTrend) * 100}%`, backgroundColor: 'var(--color-primary-light)' }} />
                </div>
                <span className="w-24 text-right text-gray-500 shrink-0">{d.visitors}{t('funnel.trendVisitors')} · {d.conversions}{t('funnel.trendConversions')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 세그먼트 토글 */}
      <div className="flex rounded-xl border border-gray-200 bg-white p-1 text-sm font-medium w-fit">
        {[
          { value: 'anon', label: t('funnel.segAnon') },
          { value: 'converted', label: t('funnel.segConverted') },
        ].map((segOpt) => (
          <button
            key={segOpt.value}
            onClick={() => setSeg(segOpt.value as typeof seg)}
            className="px-4 py-1.5 rounded-lg transition-colors"
            style={seg === segOpt.value ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: '#6B7280' }}
          >
            {segOpt.label}
          </button>
        ))}
      </div>

      {seg === 'anon' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.anonThVisitor')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.anonThSource')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.anonThEntry')}</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-600">{t('funnel.anonThVisits')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.anonThDevice')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.anonThFirst')}</th>
                </tr>
              </thead>
              <tbody>
                {anon.isLoading ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">{t('common.loading')}</td></tr>
                ) : (anon.data ?? []).length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">{t('funnel.anonEmpty')}</td></tr>
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
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.convThName')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.convThEmail')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.convThSource')}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">{t('funnel.convThAt')}</th>
                </tr>
              </thead>
              <tbody>
                {converted.isLoading ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">{t('common.loading')}</td></tr>
                ) : (converted.data ?? []).length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">{t('funnel.convEmpty')}</td></tr>
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
        {t('funnel.privacyNote')}
      </p>
    </div>
  );
}

// ─── 페이지 ──────────────────────────────────────────────────
export default function AdminPage() {
  const { t } = useTranslation('admin');
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
      <div className="min-h-dvh flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <p className="text-gray-400">{t('checkingAuth')}</p>
      </div>
    );
  }

  if (!adminCheck?.isAdmin) return null;

  return (
    <div className="min-h-dvh" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/feed')} className="text-gray-400 hover:text-gray-600 text-sm">{t('header.back')}</button>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>{t('header.title')}</h1>
        </div>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">ADMIN</span>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* 탭 & 검색 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex rounded-xl border border-gray-200 bg-white p-1 text-sm font-medium">
            {[
              { value: 'funnel', label: t('tabs.funnel') },
              { value: 'visitors', label: t('tabs.visitors') },
              { value: 'logs', label: t('tabs.logs') },
              { value: 'inquiries', label: t('tabs.inquiries') },
            ].map((tabOpt) => (
              <button
                key={tabOpt.value}
                onClick={() => setTab(tabOpt.value as typeof tab)}
                className="px-4 py-1.5 rounded-lg transition-colors"
                style={
                  tab === tabOpt.value
                    ? { backgroundColor: 'var(--color-primary)', color: 'white' }
                    : { color: '#6B7280' }
                }
              >
                {tabOpt.label}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              tab === 'inquiries'
                ? t('search.inquiries')
                : tab === 'funnel'
                  ? t('search.funnel')
                  : t('search.default')
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
