'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';

type Step = 'role' | 'info' | 'connect' | 'done';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'child' | 'parent'>('child');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [consentAnalytics, setConsentAnalytics] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [tone, setTone] = useState<'light' | 'deep'>('light');
  const [error, setError] = useState('');
  const [sessionToken, setSessionToken] = useState('');

  const register = trpc.auth.register.useMutation({
    onSuccess(data) {
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('userId', data.user.id);
      setSessionToken(data.sessionToken);
      if (role === 'child') setStep('connect');
      else setStep('done');
    },
    onError(err) { setError(err.message); },
  });

  const createConn = trpc.connection.create.useMutation({
    onSuccess() { setStep('done'); },
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

            {/* 개인정보 수집 동의 */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAnalytics}
                  onChange={(e) => setConsentAnalytics(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[var(--color-primary)]"
                />
                <span className="text-sm text-gray-700">
                  (선택) 서비스 개선을 위해 접속 IP·기기 정보 수집에 동의합니다.
                  거부해도 서비스 이용에 불이익이 없습니다.
                </span>
              </label>
              <p className="text-xs text-gray-400 pl-7">
                수집 목적: 서비스 이용 분석 · 보유 기간: 탈퇴 또는 12개월 중 먼저 도래하는 시점{' '}
                <a href="/privacy" target="_blank" className="underline" style={{ color: 'var(--color-primary)' }}>
                  개인정보처리방침
                </a>
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              onClick={() => register.mutate({ ...form, role, consentAnalytics })}
              disabled={register.isPending}
              className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {register.isPending ? '가입 중...' : '계속하기'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 'connect') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🔗</div>
            <h2 className="text-xl font-bold text-gray-900">부모님을 연결해요</h2>
            <p className="text-sm text-gray-500">초대 코드가 있으면 입력하고,<br />없으면 나중에 연결해도 돼요</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">초대 코드 (선택)</label>
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base font-mono tracking-widest text-center"
              placeholder="XXXXXXXX"
              maxLength={8}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-3">
            {inviteCode.length === 8 && (
              <button
                onClick={() => createConn.mutate({
                  fromUserId: localStorage.getItem('userId') ?? '',
                  tone,
                })}
                disabled={createConn.isPending}
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                연결하기
              </button>
            )}
            <button
              onClick={() => setStep('done')}
              className="w-full py-3 rounded-2xl text-gray-500 font-medium"
            >
              나중에 연결할게요
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
          <p className="text-gray-500">이제 매일 질문이 시작됩니다.<br />소중한 이야기가 쌓여갈 거예요.</p>
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
