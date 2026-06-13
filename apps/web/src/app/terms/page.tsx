import Link from 'next/link';
import type { Metadata } from 'next';

// 본 약관 초안은 법률 자문(변호사 검토)을 대체하지 않습니다.
// <!-- TODO: 법률 검토 필요 — 운영 주체 확정 후 전 조항 검토 -->

export const metadata: Metadata = { title: '이용약관 — 마음 잇기' };

const ARTICLES: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: '제1조 (목적)',
    body: (
      <p>
        본 약관은 [서비스명: 마음 잇기](이하 &ldquo;서비스&rdquo;)의 이용 조건과 절차, 이용자와
        운영자([운영자: ___] {/* TODO: 운영 주체 확정 후 기재 */})의 권리·의무 및 책임 사항을
        규정함을 목적으로 합니다.
      </p>
    ),
  },
  {
    title: '제2조 (용어의 정의)',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>서비스</strong>: 가족 간 질문·답변을 주고받고 이를 책으로 엮어 전달하는 온라인 서비스 일체</li>
        <li><strong>이용자</strong>: 본 약관에 따라 서비스를 이용하는 자</li>
        <li><strong>회원</strong>: 서비스에 가입하여 계정을 부여받은 이용자</li>
        <li><strong>자녀</strong>: 질문을 보내고 답변과 책을 받는 회원</li>
        <li><strong>부모</strong>: 질문에 답하며 이야기를 나누는 회원(응답자)</li>
        <li><strong>콘텐츠</strong>: 서비스 내에서 등록·생성되는 질문, 답변, 사진, 영상, 음성, 책 등 일체의 자료</li>
      </ul>
    ),
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    body: (
      <p>
        본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다. 운영자는 관련 법령을 위배하지 않는
        범위에서 약관을 변경할 수 있으며, 변경 시 적용일자와 변경 사유를 명시하여 적용일 7일 전부터
        공지합니다. 이용자에게 불리한 변경은 30일 전에 공지합니다.
      </p>
    ),
  },
  {
    title: '제4조 (회원가입)',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>회원가입은 이용자가 약관과 개인정보 수집·이용에 동의하고 가입 양식을 작성하면 성립합니다.</li>
        <li>필수 동의 항목에 동의하지 않으면 가입이 제한되며, 선택 동의 항목의 미동의를 이유로 서비스 이용을 거부하지 않습니다.</li>
        <li>만 14세 미만 아동은 법정대리인의 동의가 필요하며, 별도 동의 절차가 마련되기 전까지는 만 14세 이상만 가입할 수 있습니다.
          {/* TODO: 만 14세 미만 법정대리인 동의 절차 도입 시 개정 */}</li>
      </ul>
    ),
  },
  {
    title: '제5조 (서비스의 내용)',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>매일 질문 발송 및 부모 응답(글·사진·영상·음성) 수집</li>
        <li>가족 구성원 간 반응·되묻기 등 상호작용</li>
        <li>부모가 먼저 남기는 메시지 전달</li>
        <li>모인 이야기의 챕터별 정리 및 책(웹·인쇄용 파일) 생성·전달</li>
      </ul>
    ),
  },
  {
    title: '제6조 (이용자의 의무)',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>타인의 정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.</li>
        <li>정보 주체(부모 등)의 동의 없이 타인의 개인정보를 등록해서는 안 됩니다.</li>
        <li>불법적이거나 제3자의 권리(저작권·초상권 등)를 침해하는 콘텐츠를 등록해서는 안 됩니다.</li>
      </ul>
    ),
  },
  {
    title: '제7조 (콘텐츠의 권리 귀속 및 이용)',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>이용자가 등록한 답변·사진·영상·음성 등 콘텐츠의 저작권은 <strong>작성자(이용자)에게 귀속</strong>됩니다.</li>
        <li>운영자는 서비스 제공, 책 제작, 백업 목적의 범위에서만 콘텐츠를 이용합니다.</li>
        <li>콘텐츠의 제3자 제공 또는 마케팅 활용은 정보주체의 별도 동의 없이는 하지 않습니다.</li>
      </ul>
    ),
  },
  {
    title: '제8조 (가족·제3자 정보 등록 시 책임)',
    body: (
      <p>
        이용자가 부모 등 타인의 사진·정보가 포함된 콘텐츠를 등록하는 경우, <strong>해당 당사자의
        동의를 받을 책임은 등록한 이용자에게 있습니다.</strong> 가족사·건강 등 민감한 내용이 포함될
        수 있으므로, 등록 전 당사자의 의사를 확인해 주시기 바랍니다.
      </p>
    ),
  },
  {
    title: '제9조 (서비스의 변경 및 중단)',
    body: (
      <p>
        운영자는 운영상·기술상 상당한 이유가 있는 경우 서비스의 전부 또는 일부를 변경하거나 중단할
        수 있으며, 이 경우 사전에 공지하는 것을 원칙으로 합니다. 긴급한 사유가 있는 경우 사후에
        공지할 수 있습니다.
      </p>
    ),
  },
  {
    title: '제10조 (계약 해지 및 데이터 처리)',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>회원은 언제든지 탈퇴를 요청할 수 있으며, 운영자는 지체 없이 처리합니다.</li>
        <li>탈퇴 시 회원의 개인정보와 콘텐츠는 관련 법령상 보존 의무가 있는 경우를 제외하고 파기됩니다.</li>
        <li>이미 제작된 책 산출물(파일)의 보관 또는 삭제 여부는 탈퇴 전 회원이 선택할 수 있도록 안내합니다.
          {/* TODO: 탈퇴 플로우에 책 파일 보관/삭제 선택 단계 구현 필요 */}</li>
      </ul>
    ),
  },
  {
    title: '제11조 (면책 및 책임의 한계)',
    body: (
      <p>
        운영자는 천재지변, 불가항력, 이용자의 귀책 사유로 인한 서비스 이용 장애에 대하여 책임을
        지지 않습니다. 다만 운영자의 고의 또는 중대한 과실로 인한 손해에 대해서는 면책되지
        않습니다.
      </p>
    ),
  },
  {
    title: '제12조 (분쟁 해결 및 준거법)',
    body: (
      <p>
        본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 분쟁이 발생한 경우
        민사소송법상의 관할 법원에 제소합니다.
      </p>
    ),
  },
  {
    title: '제13조 (문의처)',
    body: (
      <p>
        서비스 및 약관에 관한 문의: <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-dvh px-4 py-10 sm:px-6 sm:py-12 max-w-2xl mx-auto break-keep" style={{ background: 'var(--color-background)' }}>
      <Link href="/profile" className="inline-flex items-center min-h-11 text-sm text-gray-400 hover:text-gray-600">← 돌아가기</Link>

      <h1 className="text-2xl font-bold mt-6 mb-8" style={{ color: 'var(--color-primary-dark)' }}>
        이용약관
      </h1>

      <div className="text-gray-700 space-y-6 text-[15px] leading-relaxed">
        {ARTICLES.map((a) => (
          <section key={a.title}>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{a.title}</h2>
            {a.body}
          </section>
        ))}

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">부칙</h2>
          <p>본 약관(v1.0)은 2026년 6월 12일부터 시행합니다.</p>
        </section>

        <p className="text-sm text-gray-500 pt-4 border-t border-gray-100">
          개인정보의 처리에 관한 자세한 내용은{' '}
          <Link href="/privacy" className="underline" style={{ color: 'var(--color-primary)' }}>
            개인정보 처리방침
          </Link>
          을 확인해 주세요.
        </p>
      </div>
    </main>
  );
}
