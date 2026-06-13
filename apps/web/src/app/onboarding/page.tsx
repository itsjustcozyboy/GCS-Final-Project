'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';
import { trackCompleteRegistration } from '@/components/MarketingPixels';

type Step = 'role' | 'info' | 'connect' | 'done';

type ConsentKey = 'privacy' | 'terms' | 'age14' | 'analytics' | 'marketing';

const CONSENT_ITEMS: Array<{ key: ConsentKey; required: boolean; label: string; link?: string; desc?: string }> = [
  {
    key: 'privacy',
    required: true,
    label: '서비스 이용을 위한 개인정보 수집·이용 동의',
    link: '/privacy',
    desc: '항목: 이메일·이름·비밀번호·역할·답변 콘텐츠 / 목적: 회원 식별, 질문·답변 전달, 책 제작 / 보유: 탈퇴 시 파기',
  },
  { key: 'terms', required: true, label: '이용약관 동의', link: '/terms' },
  {
    key: 'age14',
    required: true,
    label: '만 14세 이상입니다',
    // TODO: 만 14세 미만 법정대리인 동의 절차(보호자 이메일 동의) 도입 전까지는 만 14세 이상만 가입 가능
    desc: '만 14세 미만은 법정대리인 동의가 필요하여 현재 가입할 수 없어요.',
  },
  {
    key: 'analytics',
    required: false,
    label: '서비스 개선·분석을 위한 접속정보(IP·기기정보) 수집 동의',
    link: '/privacy',
    desc: '동의하지 않아도 가입과 이용에 불이익이 없으며, 미동의 시 분석용 식별정보를 수집하지 않아요. 보유: 탈퇴 또는 12개월',
  },
  { key: 'marketing', required: false, label: '마케팅·소식 알림 수신 동의' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'child' | 'parent'>('child');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [consents, setConsents] = useState({
    privacy: false, // [필수] 개인정보 수집·이용
    terms: false, // [필수] 이용약관
    age14: false, // [필수] 만 14세 이상
    analytics: false, // [선택] 접속정보 수집
    marketing: false, // [선택] 마케팅·알림
  });
  const [inviteCode, setInviteCode] = useState('');
  const [tone, setTone] = useState<'light' | 'deep'>('light');
  const [error, setError] = useState('');

  const requiredConsented = consents.privacy && consents.terms && consents.age14;
  const allConsented = requiredConsented && consents.analytics && consents.marketing;

  const createInvite = trpc.connection.createInvite.useMutation({
    onSuccess(data) {
      setInviteCode(data.code);
      setError('');
    },
    onError(err) { setError(err.message); },
  });

  const acceptInvite = trpc.connection.acceptInvite.useMutation({
    onSuccess() {
      setError('');
      setStep('done');
    },
    onError(err) { setError(err.message); },
  });

  const register = trpc.auth.register.useMutation({
    onSuccess(data) {
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('userId', data.user.id);
      // 이전 세션 캐시가 남아있을 수 있으니 새 계정 기준으로 비운다.
      queryClient.clear();
      // 광고 픽셀 표준 전환 이벤트 (동의한 경우에만 발화)
      trackCompleteRegistration();
      setStep('connect');
      if (role === 'child') createInvite.mutate({ tone });
    },
    onError(err) { setError(err.message); },
  });

  if (step === 'role') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-8">
          <div className="text-center space-y-2">
            <div className="text-5xl">💌</div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>마음 잇기 시작하기</h1>
            <p className="text-gray-500 text-sm">저는 이 앱을 어떻게 사용할 건가요?</p>
          </div>

          <div className="space-y-3">
            {[
              { value: 'child', icon: '👶', title: '자식 / 이야기를 받는 사람', desc: '부모님께 질문을 보내고, 답변을 받아요' },
              { value: 'parent', icon: '👴', title: '부모 / 이야기를 나누는 사람', desc: '자식의 질문에 답하며 기억을 나눠요' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setRole(opt.value as 'child' | 'parent'); setStep('info'); }}
                className="w-full flex gap-4 p-4 rounded-2xl bg-white border-2 text-left transition-all hover:shadow-md"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="text-3xl">{opt.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{opt.title}</p>
                  <p className="text-sm text-gray-500">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (step === 'info') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-6">
          <button onClick={() => setStep('role')} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-900">기본 정보를 알려주세요</h2>

          <div className="space-y-4">
            {[
              { label: '이름', key: 'name', type: 'text', placeholder: '이름을 입력해주세요' },
              { label: '이메일', key: 'email', type: 'email', placeholder: '이메일 주소' },
              { label: '비밀번호', key: 'password', type: 'password', placeholder: '6자리 이상' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none"
                  placeholder={f.placeholder}
                />
              </div>
            ))}

            {role === 'child' && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">부모님과의 대화 톤</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'light', label: '🌸 가벼운 추억', desc: '일상적인 이야기부터' },
                    { value: 'deep', label: '🌊 깊은 인생 이야기', desc: '삶의 의미와 가치관' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTone(opt.value as 'light' | 'deep')}
                      className="p-3 rounded-xl border-2 text-center text-sm transition-all"
                      style={{ borderColor: tone === opt.value ? 'var(--color-primary)' : 'var(--color-border)', backgroundColor: tone === opt.value ? '#EFF7F2' : 'white' }}
                    >
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 개인정보 수집·이용 동의 (필수/선택 분리) */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer pb-2 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={allConsented}
                  onChange={(e) => {
                    const v = e.target.checked;
                    setConsents({ privacy: v, terms: v, age14: v, analytics: v, marketing: v });
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                  aria-label="전체 동의"
                />
                <span className="text-sm font-semibold text-gray-800">전체 동의</span>
              </label>

              {CONSENT_ITEMS.map((item) => (
                <div key={item.key}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consents[item.key]}
                      onChange={(e) => setConsents((p) => ({ ...p, [item.key]: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 accent-[var(--color-primary)]"
                      aria-label={item.label}
                    />
                    <span className="text-sm text-gray-700 flex-1">
                      <strong className={item.required ? 'text-red-500' : 'text-gray-400'}>
                        [{item.required ? '필수' : '선택'}]
                      </strong>{' '}
                      {item.label}
                      {item.link && (
                        <>
                          {' '}
                          <a href={item.link} target="_blank" className="underline" style={{ color: 'var(--color-primary)' }}>
                            전문 보기
                          </a>
                        </>
                      )}
                    </span>
                  </label>
                  {item.desc && <p className="text-xs text-gray-400 pl-7 mt-0.5">{item.desc}</p>}
                </div>
              ))}
            </div>

            {!requiredConsented && (
              <p className="text-xs text-gray-400">필수 항목에 모두 동의해야 가입할 수 있어요. 선택 항목은 동의하지 않아도 이용에 불이익이 없습니다.</p>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              onClick={() =>
                register.mutate({
                  ...form,
                  role,
                  consentPrivacy: true,
                  consentTerms: true,
                  ageOver14: true,
                  consentAnalytics: consents.analytics,
                  consentMarketing: consents.marketing,
                })
              }
              disabled={register.isPending || !requiredConsented}
              className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {register.isPending ? '가입 중...' : requiredConsented ? '계속하기' : '필수 항목에 동의해주세요'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 'connect') {
    const normalizedInviteCode = inviteCode.replace(/[\s-]/g, '').toUpperCase();

    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🔗</div>
            <h2 className="text-xl font-bold text-gray-900">
              {role === 'child' ? '초대 코드를 보내주세요' : '자녀의 초대 코드를 입력해주세요'}
            </h2>
            <p className="text-sm text-gray-500">
              {role === 'child'
                ? '부모님이 이 코드를 입력하면 서로 연결돼요.'
                : '자녀가 만든 초대 코드를 입력하면 연결돼요.'}
            </p>
          </div>

          {role === 'child' ? (
            <div className="rounded-2xl bg-white border border-gray-100 p-5 text-center space-y-4">
              <p className="text-sm text-gray-500">부모님께 전달할 코드</p>
              <div className="text-3xl font-bold tracking-[0.25em] text-gray-900 font-mono">
                {createInvite.isPending ? '생성 중' : inviteCode || '--------'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => createInvite.mutate({ tone, regenerate: true })}
                  disabled={createInvite.isPending}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-50"
                >
                  다시 생성
                </button>
                <button
                  onClick={() => inviteCode && navigator.clipboard?.writeText(inviteCode)}
                  disabled={!inviteCode}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  복사하기
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">초대 코드</label>
              <input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base font-mono tracking-widest text-center"
                placeholder="XXXXXXXX"
                maxLength={12}
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-3">
            {role === 'parent' && (
              <button
                onClick={() => acceptInvite.mutate({ inviteCode: normalizedInviteCode })}
                disabled={acceptInvite.isPending || normalizedInviteCode.length < 4}
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {acceptInvite.isPending ? '연결 중...' : '연결하기'}
              </button>
            )}
            <button
              onClick={() => setStep('done')}
              className="w-full py-3 rounded-2xl text-gray-500 font-medium"
            >
              {role === 'child' ? '코드를 보냈어요' : '나중에 연결할게요'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // done
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-sm w-full text-center space-y-8">
        <div className="text-6xl animate-bounce">🎉</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>준비됐어요!</h2>
          <p className="text-gray-500">
            {role === 'child'
              ? '부모님이 코드를 입력하면 연결 소식이 피드에 표시돼요.'
              : '연결되면 피드에서 서로의 상태를 볼 수 있어요.'}
          </p>
        </div>
        <button
          onClick={() => router.push('/feed')}
          className="w-full py-4 rounded-2xl text-white font-semibold text-lg"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          피드 보러 가기
        </button>
      </div>
    </main>
  );
}
