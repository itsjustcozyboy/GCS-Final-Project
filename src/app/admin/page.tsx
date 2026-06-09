'use client';

import { useState } from 'react';

interface AdminData {
  total_events: number;
  total_leads: number;
  funnel_by_fd: Record<string, Record<string, number>>;
  by_channel: Record<string, number>;
  by_utm_source: Record<string, number>;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(password)}`);
      if (!res.ok) { setError('비밀번호가 틀렸습니다.'); return; }
      setData(await res.json());
    } catch {
      setError('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

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
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-gray-800 text-white rounded-xl py-3 text-sm">
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-2">관리자 대시보드</h1>
      <p className="text-sm text-gray-500 mb-6">총 이벤트: {data.total_events} · 총 리드: {data.total_leads}</p>

      <section className="mb-8">
        <h2 className="font-semibold mb-3">채널별 이벤트</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-600">채널</th>
                <th className="text-right px-4 py-2 text-gray-600">이벤트 수</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.by_channel).map(([ch, cnt]) => (
                <tr key={ch} className="border-t border-gray-100">
                  <td className="px-4 py-2">{ch}</td>
                  <td className="px-4 py-2 text-right">{cnt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-3">UTM 소스별 이벤트</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-600">utm_source</th>
                <th className="text-right px-4 py-2 text-gray-600">이벤트 수</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.by_utm_source).map(([src, cnt]) => (
                <tr key={src} className="border-t border-gray-100">
                  <td className="px-4 py-2">{src}</td>
                  <td className="px-4 py-2 text-right">{cnt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">FD별 퍼널</h2>
        <div className="space-y-4">
          {Object.entries(data.funnel_by_fd).map(([fd, events]) => (
            <div key={fd} className="border border-gray-200 rounded-xl p-4">
              <p className="font-medium text-sm mb-2">{fd}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(events).map(([ev, cnt]) => (
                  <span key={ev} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                    {ev}: {cnt}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
