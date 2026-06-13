import Link from 'next/link';
import { AdminLink } from '@/components/AdminLink';

// TODO: 회사/서비스명 확정 시 푸터 카피 갱신 (현재 서비스명: 마음 잇기)
const HOW_IT_WORKS = [
  { step: '1', icon: '✉️', title: '질문을 보내요', desc: '자녀가 오늘의 질문을 보내거나, 부모님이 먼저 마음을 전해요.' },
  { step: '2', icon: '🗣️', title: '편하게 답해요', desc: '부모님이 글·사진·영상·음성, 편한 방식으로 답하면 돼요.' },
  { step: '3', icon: '📖', title: '책으로 모여요', desc: '주고받은 이야기가 차곡차곡 쌓여 한 권의 책이 됩니다.' },
];

const VALUES = [
  { icon: '🌱', title: '매일 부담 없이 하나씩', desc: '하루 한 질문, 답하기 쉬운 것부터 천천히.' },
  { icon: '💬', title: '부모님의 진짜 말투 그대로', desc: '꾸미지 않은 그분의 목소리를 그대로 담아요.' },
  { icon: '📚', title: '생전에도 중간 책으로', desc: '이야기가 모이면 언제든 한 권으로 받아볼 수 있어요.' },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-md mx-auto px-6 py-14 space-y-16">
        {/* 1. 히어로 */}
        <section className="text-center space-y-5">
          <div className="text-5xl" aria-hidden>💌</div>
          <h1 className="text-[28px] leading-snug font-bold" style={{ color: 'var(--color-primary-dark)' }}>
            매일 질문 하나로,<br />부모님의 이야기를 책으로 남겨요
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            자녀가 보낸 질문에 부모님이 답하면,<br />그 이야기가 한 권의 책으로 모입니다.
          </p>
          <div className="space-y-3 pt-2">
            <Link
              href="/onboarding"
              className="block w-full py-4 rounded-2xl text-white text-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              시작하기
            </Link>
            <Link
              href="/login"
              className="block w-full py-3 rounded-2xl font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              이미 계정이 있어요 →
            </Link>
            <AdminLink />
          </div>
        </section>

        {/* 2. 작동 방식 (3단계) */}
        <section className="space-y-6">
          <h2 className="text-center text-xl font-bold text-gray-900">이렇게 이어져요</h2>
          <ol className="space-y-3">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.step} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <span
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  aria-hidden
                >
                  {s.step}
                </span>
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">
                    <span className="mr-1.5" aria-hidden>{s.icon}</span>{s.title}
                  </p>
                  <p className="text-[15px] text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 3. 핵심 가치 */}
        <section className="space-y-6">
          <h2 className="text-center text-xl font-bold text-gray-900">왜 마음 잇기인가요</h2>
          <div className="space-y-3">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <span className="text-2xl mt-0.5" aria-hidden>{v.icon}</span>
                <div>
                  <p className="text-base font-semibold text-gray-900">{v.title}</p>
                  <p className="text-[15px] text-gray-500 mt-0.5 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 현재 응답 방식 안내 + 로드맵 */}
        <section
          className="rounded-2xl p-5 space-y-2 border"
          style={{ backgroundColor: '#FBF7EF', borderColor: 'var(--color-secondary)' }}
        >
          <p className="text-base font-semibold" style={{ color: 'var(--color-primary-dark)' }}>
            📱 지금은 앱·웹에서 답해요
          </p>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            부모님은 앱이나 웹에서 질문에 답하실 수 있어요. 큰 글씨와 간단한 버튼으로 어렵지 않아요.
          </p>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            🔜 곧 <strong>카카오톡·문자</strong>로도 답하실 수 있어요. <span className="text-gray-400">(준비 중)</span>
          </p>
        </section>

        {/* 5. 푸터 */}
        <footer className="pt-8 border-t border-gray-100 space-y-4 text-center">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-800">이용약관</Link>
            <Link href="/privacy" className="hover:text-gray-800">개인정보 처리방침</Link>
            <Link href="/faq" className="hover:text-gray-800">자주 묻는 질문</Link>
            <Link href="/profile/inquiry" className="hover:text-gray-800">서비스 문의</Link>
          </nav>
          <p className="text-xs text-gray-400">
            문의: <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
          </p>
          <Link href="/admin" className="inline-block text-xs text-gray-300 hover:text-gray-500">🔐 관리자</Link>
        </footer>
      </div>
    </main>
  );
}
