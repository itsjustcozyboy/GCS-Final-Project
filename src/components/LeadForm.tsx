'use client';

import { useState } from 'react';
import { saveLead, LeadData } from '@/lib/leads';
import { getFdId, getSessionId } from '@/lib/session';
import { getUtm } from '@/lib/utm';
import { track } from '@/lib/analytics';
import ConsentNotice from './ConsentNotice';

interface Props {
  fdId: string;
  channel?: string;
  priceVariant?: string;
  extraData?: Record<string, unknown>;
  onSuccess?: () => void;
  submitLabel?: string;
  placeholder?: string;
}

export default function LeadForm({ fdId, channel, priceVariant, extraData, onSuccess, submitLabel, placeholder }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { setError('개인정보 수집에 동의해주세요.'); return; }
    if (!email) { setError('이메일을 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    try {
      const utm = getUtm();
      const data: LeadData = {
        fd_id: getFdId(),
        session_id: getSessionId(),
        email,
        name,
        channel: channel ?? fdId,
        consent: true,
        price_variant: priceVariant,
        extra_json: extraData,
        ...utm,
      };
      await saveLead(data);
      track('lead_submit', { channel: channel ?? fdId, fd_id: fdId });
      setDone(true);
      onSuccess?.();
    } catch {
      setError('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-green-50 rounded-xl p-4 text-center">
        <p className="text-green-700 font-medium">등록이 완료되었습니다 🙏</p>
        <p className="text-green-600 text-sm mt-1">베타 오픈 시 가장 먼저 안내드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="이름 (선택)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
      />
      <input
        type="email"
        placeholder={placeholder ?? "이메일 주소를 입력해주세요"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
      />
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-gray-700"
        />
        <span className="text-xs text-gray-500">
          개인정보 수집·이용에 동의합니다. (필수)
        </span>
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading || !consent}
        className="w-full bg-gray-800 text-white rounded-xl py-3 font-medium text-sm disabled:opacity-50"
      >
        {loading ? '저장 중...' : (submitLabel ?? '사전 신청하기')}
      </button>
      <ConsentNotice />
    </form>
  );
}
