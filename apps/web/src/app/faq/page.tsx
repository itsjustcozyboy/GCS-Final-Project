import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '자주 묻는 질문 — 마음 잇기' };

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: '부모님이 앱 사용이 익숙하지 않은데 어떻게 답변하나요?',
    a: '부모님은 앱을 설치하지 않아도 됩니다. 문자나 카카오톡으로 받은 질문에 글·사진·영상은 물론, 말로 답하면 자동으로 글로 변환됩니다. 화면도 큰 글씨와 간단한 버튼으로 되어 있어 어렵지 않게 사용하실 수 있습니다.',
  },
  {
    q: '매일 꼭 답해야 하나요? 답을 못 하면 어떻게 되나요?',
    a: '전혀 부담 갖지 않으셔도 됩니다. 답하기 어려운 질문은 "다음에"로 넘기거나 건너뛸 수 있고, 독촉 알림은 보내지 않습니다. 하루에 하나씩, 편하실 때 답하시면 됩니다.',
  },
  {
    q: "모은 답변으로 만드는 '책'은 언제, 어떻게 받나요?",
    a: '답변이 쌓이면 챕터별 이야기로 자동 정리됩니다. 일정 분량이 모이면 생전에도 중간 책을 받아보실 수 있고, 웹에서 미리 보거나 인쇄용 파일로 내려받을 수 있습니다. 부모님의 실제 말투와 표현을 최대한 살려서 편집합니다.',
  },
  {
    q: '제가 올린 사진·영상·답변은 누가 볼 수 있나요? 안전한가요?',
    a: '등록하신 콘텐츠는 연결된 가족 구성원만 볼 수 있으며, 외부에 공개되지 않습니다. 콘텐츠의 저작권은 작성하신 본인에게 있고, 회사는 서비스 제공과 책 제작 목적 외에 사용하지 않습니다. 접근 권한과 데이터는 암호화·접근통제로 보호됩니다.',
  },
  {
    q: '탈퇴하면 그동안의 답변과 책은 어떻게 되나요?',
    a: '탈퇴 시 개인정보와 콘텐츠는 관련 법령에 따른 보존 의무가 있는 경우를 제외하고 파기됩니다. 이미 제작된 책 파일의 보관·삭제 여부는 탈퇴 전에 선택하실 수 있도록 안내합니다. 자세한 사항은 개인정보 처리방침을 참고하시거나 leokor1214@gachon.ac.kr로 문의해 주세요.',
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto" style={{ background: 'var(--color-background)' }}>
      <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-600">← 돌아가기</Link>

      <h1 className="text-2xl font-bold mt-6 mb-8" style={{ color: 'var(--color-primary-dark)' }}>
        자주 묻는 질문
      </h1>

      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm">
            <summary className="flex items-start gap-3 px-5 py-4 cursor-pointer list-none text-base font-medium text-gray-900">
              <span className="font-bold shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden>
                Q{i + 1}.
              </span>
              <span className="flex-1">{item.q}</span>
              <span className="text-gray-300 transition-transform group-open:rotate-90" aria-hidden>›</span>
            </summary>
            <p className="px-5 pb-5 pl-12 text-[15px] leading-relaxed text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>

      {/* 서비스 문의 — FAQ 하단 */}
      <div className="mt-8">
        <InquiryForm />
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        이메일로 직접 문의하셔도 돼요:{' '}
        <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>
    </main>
  );
}
