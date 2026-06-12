'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';

const CATEGORIES = [
  { value: '', label: '문의 유형을 골라주세요 (선택)' },
  { value: 'bug', label: '버그/오류' },
  { value: 'feature', label: '기능 제안' },
  { value: 'payment', label: '결제' },
  { value: 'privacy', label: '개인정보' },
  { value: 'etc', label: '기타' },
] as const;

type Category = 'bug' | 'feature' | 'payment' | 'privacy' | 'etc';

// 서비스 문의 폼 — FAQ 하단. 비로그인도 제출 가능, 로그인 시 이메일 자동 채움.
export function InquiryForm() {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'' | Category>('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — 사람 눈에 보이지 않음
  const [done, setDone] = useState(false);

  // 로그인 사용자는 계정 이메일 자동 채움 (수정 가능). 비로그인이면 쿼리 비활성화.
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('sessionToken');
  const me = trpc.auth.me.useQuery(undefined, { enabled: hasToken, retry: false });
  useEffect(() => {
    if (me.data?.email && !email) setEmail(me.data.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.data?.email]);

  const submit = trpc.inquiry.submit.useMutation({
    onSuccess: () => {
      setDone(true);
      setMessage('');
      setCategory('');
    },
  });

  const canSubmit = email.includes('@') && message.trim().length >= 10 && !submit.isPending;

  if (done) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 p-6 text-center space-y-3">
        <div className="text-4xl" aria-hidden>📬</div>
        <p className="text-lg font-bold text-gray-900">문의가 접수되었습니다.</p>
        <p className="text-base text-gray-500">빠르게 확인하겠습니다. 답변은 입력하신 이메일로 드려요.</p>
        <button
          onClick={() => setDone(false)}
          className="text-sm underline text-gray-400 hover:text-gray-600"
        >
          다른 문의 보내기
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">💬 서비스 문의</h2>
        <p className="text-sm text-gray-500 mt-1">FAQ에서 답을 찾지 못하셨나요? 직접 물어봐 주세요.</p>
      </div>

      <div>
        <label htmlFor="inquiry-email" className="block text-base font-medium text-gray-700 mb-1">
          회신받을 이메일 <span className="text-red-500" aria-hidden>*</span>
        </label>
        <input
          id="inquiry-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none"
          placeholder="answer@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="inquiry-category" className="block text-base font-medium text-gray-700 mb-1">
          문의 유형
        </label>
        <select
          id="inquiry-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as '' | Category)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base bg-white focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="inquiry-message" className="block text-base font-medium text-gray-700 mb-1">
          문의 내용 <span className="text-red-500" aria-hidden>*</span>
        </label>
        <textarea
          id="inquiry-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
          style={{ minHeight: '120px' }}
          placeholder="겪으신 문제나 궁금한 점을 적어주세요. (10자 이상)"
        />
        {message.trim().length > 0 && message.trim().length < 10 && (
          <p className="text-xs text-gray-400 mt-1">조금 더 자세히 적어주시면 정확히 도와드릴 수 있어요. (10자 이상)</p>
        )}
      </div>

      {/* honeypot — 봇 차단용 숨김 필드 */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
      />

      {submit.isError && (
        <p className="text-sm text-red-500" role="alert">
          {submit.error.message || '접수에 실패했어요. 잠시 후 다시 시도해주세요.'}
        </p>
      )}

      <button
        onClick={() => submit.mutate({
          email: email.trim(),
          category: category || undefined,
          message: message.trim(),
          website: website || undefined,
        })}
        disabled={!canSubmit}
        className="w-full py-4 rounded-2xl text-white text-lg font-semibold disabled:opacity-50"
        style={{ backgroundColor: 'var(--color-primary)' }}
        aria-label="문의 보내기"
      >
        {submit.isPending ? '접수 중...' : '문의 보내기'}
      </button>

      <p className="text-xs text-gray-400">
        문의 내용과 이메일은 답변 목적으로만 이용되며,{' '}
        <Link href="/privacy" className="underline">개인정보 처리방침</Link>에 따라 보관됩니다.
      </p>
    </div>
  );
}
