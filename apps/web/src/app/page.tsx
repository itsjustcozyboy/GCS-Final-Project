import Link from 'next/link';
import { AdminLink } from '@/components/AdminLink';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-md w-full text-center space-y-8">
        {/* 로고 영역 */}
        <div className="space-y-3">
          <div className="text-5xl">💌</div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>
            마음 잇기
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            부모님과 매일 질문 하나로<br />
            평생의 이야기를 이어가세요
          </p>
        </div>

        {/* 소개 카드 */}
        <div className="space-y-4 text-left">
          {[
            { icon: '🌱', title: '매일 질문 하나', desc: '답하기 쉬운 것부터 시작해 조금씩 깊어집니다' },
            { icon: '📸', title: '글·사진·음성으로 답해요', desc: '부모님이 편한 방식으로, 앱·카톡·문자 모두 가능' },
            { icon: '📖', title: '답변이 쌓여 한 권의 책으로', desc: '살아계실 때도, 언제든 꺼내볼 수 있는 이야기' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-4">
          <Link
            href="/onboarding"
            className="block w-full py-4 rounded-2xl text-white text-lg font-semibold text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            시작하기
          </Link>
          <Link
            href="/login"
            className="block w-full py-3 rounded-2xl text-center font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            이미 계정이 있어요 →
          </Link>
        </div>
      </div>
    </main>
  );
}
