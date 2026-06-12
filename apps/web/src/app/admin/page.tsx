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

export default function AdminPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<'createdAt_desc' | 'createdAt_asc'>('createdAt_desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const { data, isLoading, refetch } = trpc.admin.getLogs.useQuery(
    { search: debouncedSearch || undefined, orderBy, limit: 100 },
    { enabled: !!adminCheck?.isAdmin },
  );

  const deleteMutation = trpc.admin.deleteLogs.useMutation({
    onSuccess: () => {
      setSelected(new Set());
      setShowDeleteModal(false);
      void refetch();
    },
  });

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <p className="text-gray-400">권한 확인 중...</p>
      </div>
    );
  }

  if (!adminCheck?.isAdmin) return null;

  const logs: Log[] = (data?.logs ?? []) as Log[];

  const allIds = logs.map((l) => l.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function handleDelete() {
    if (selected.size === 0) return;
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    deleteMutation.mutate({ ids: Array.from(selected) });
  }

  function formatDate(d: string | Date) {
    return new Date(d as string).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  }

  function shortUA(ua: string | null) {
    if (!ua) return '-';
    const m = ua.match(/\(([^)]+)\)/);
    return m ? m[1].slice(0, 40) : ua.slice(0, 40);
  }

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
        {/* 검색 & 정렬 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름 또는 이메일 검색..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
          />
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as typeof orderBy)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="createdAt_desc">최신순</option>
            <option value="createdAt_asc">오래된순</option>
          </select>
        </div>

        {/* 선택 삭제 버튼 */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            총 <strong>{logs.length}</strong>건{selected.size > 0 && ` · ${selected.size}개 선택됨`}
          </p>
          {selected.size > 0 && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              선택 삭제 ({selected.size})
            </button>
          )}
        </div>

        {/* 테이블 */}
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
                    <th className="px-4 py-3 text-left font-medium text-gray-600">경로</th>
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
      </main>

      {/* 삭제 확인 모달 */}
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
    </div>
  );
}
