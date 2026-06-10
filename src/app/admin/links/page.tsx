'use client';

import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';
import { CHANNEL_PRESETS, Pc1Channel } from '@/lib/pc1-content';

export default function AdminLinksPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 빌더 상태
  const [origin, setOrigin] = useState('');
  const [ch, setCh] = useState<Pc1Channel | ''>('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(password)}`);
      if (!res.ok) {
        setError('비밀번호가 틀렸습니다.');
        return;
      }
      setAuthed(true);
    } catch {
      setError('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  function applyPreset(p: (typeof CHANNEL_PRESETS)[number]) {
    setCh(p.ch);
    setUtmSource(p.utm_source);
    setUtmMedium(p.utm_medium);
    setUtmCampaign('pc1');
  }

  const url = useMemo(() => {
    const base = `${origin || ''}/fd/pc1-quiz`;
    const qs = new URLSearchParams();
    if (ch) qs.set('ch', ch);
    if (utmSource) qs.set('utm_source', utmSource);
    if (utmMedium) qs.set('utm_medium', utmMedium);
    if (utmCampaign) qs.set('utm_campaign', utmCampaign);
    if (utmTerm) qs.set('utm_term', utmTerm);
    const q = qs.toString();
    return q ? `${base}?${q}` : base;
  }, [origin, ch, utmSource, utmMedium, utmCampaign, utmTerm]);

  useEffect(() => {
    setCopied(false);
    QRCode.toDataURL(url, { width: 240, margin: 1 }).then(setQr).catch(() => setQr(''));
  }, [url]);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  if (!authed) {
    return (
      <main className="max-w-sm mx-auto px-4 py-20">
        <h1 className="text-xl font-bold mb-6">UTM 링크 빌더</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[color:var(--color-brand)] text-white rounded-xl py-3 text-sm">
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold">PC1 UTM 링크 빌더</h1>
        <Link href="/admin" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]">← 대시보드</Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">PC1-1 자가진단(유일 진입점) 링크를 채널별로 만들어 복사/QR로 공유합니다.</p>

      {/* 채널 프리셋 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CHANNEL_PRESETS.map((p) => (
          <button
            key={p.ch}
            onClick={() => applyPreset(p)}
            className={`rounded-xl px-4 py-2 text-sm border transition-colors ${
              ch === p.ch
                ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand-tint)] text-[color:var(--color-brand-dark)]'
                : 'border-[color:var(--color-line)] hover:border-[color:var(--color-brand)]'
            }`}
          >
            {p.label} <span className="text-xs text-gray-400">ch={p.ch}</span>
          </button>
        ))}
      </div>

      {/* 입력 필드 */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <Field label="ch (채널 분기)" value={ch} onChange={(v) => setCh(v as Pc1Channel)} placeholder="search | community | referral" />
        <Field label="utm_source" value={utmSource} onChange={setUtmSource} placeholder="google, naver_cafe …" />
        <Field label="utm_medium" value={utmMedium} onChange={setUtmMedium} placeholder="cpc, social, referral …" />
        <Field label="utm_campaign" value={utmCampaign} onChange={setUtmCampaign} placeholder="pc1" />
        <Field label="utm_term (키워드)" value={utmTerm} onChange={setUtmTerm} placeholder="상속포기, 한정승인 …" />
      </div>

      {/* 결과 */}
      <div className="card p-5">
        <div className="text-xs text-gray-500 mb-1">완성된 링크</div>
        <div className="font-mono text-sm break-all bg-gray-50 rounded-lg p-3 mb-3">{url}</div>
        <div className="flex items-center gap-3">
          <button onClick={copy} className="bg-[color:var(--color-brand)] text-white rounded-xl px-4 py-2 text-sm">
            {copied ? '복사됨 ✓' : '링크 복사'}
          </button>
          {qr && <a href={qr} download="pc1-qr.png" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]">QR 다운로드</a>}
        </div>
        {qr && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qr} alt="QR 코드" width={160} height={160} className="mt-4 rounded-lg border border-[color:var(--color-line)]" />
        )}
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="text-xs text-gray-600">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full border border-[color:var(--color-line)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-brand)]"
      />
    </label>
  );
}
