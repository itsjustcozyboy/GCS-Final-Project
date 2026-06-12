import Link from 'next/link';
import type { Metadata } from 'next';

// 본 처리방침 초안은 법률 자문(변호사 검토)을 대체하지 않습니다.
// <!-- TODO: 법률 검토 필요 — 개인정보 보호책임자·수탁자 확정 후 전체 검토 -->

export const metadata: Metadata = { title: '개인정보 처리방침 — 마음 잇기' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto" style={{ background: 'var(--color-background)' }}>
      <Link href="/profile" className="text-sm text-gray-400 hover:text-gray-600">← 돌아가기</Link>

      <h1 className="text-2xl font-bold mt-6 mb-2" style={{ color: 'var(--color-primary-dark)' }}>
        개인정보 처리방침
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        [서비스명: 마음 잇기]는 개인정보보호법 등 관련 법령을 준수하며, 이용자의 개인정보를 아래와
        같이 처리합니다.
      </p>

      <div className="text-gray-700 space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. 수집하는 개인정보 항목</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>[필수]</strong> 이메일, 이름(별칭), 비밀번호, 역할(자녀/부모), 가족 관계 정보(연결·대화 톤 등)</li>
            <li><strong>[응답 콘텐츠]</strong> 이용자가 등록하는 텍스트 답변, 사진, 영상, 음성(및 자동 전사 텍스트)</li>
            <li><strong>[선택 — 동의 시에만]</strong> 접속 IP 주소, 기기·브라우저 정보(User-Agent), 접속 일시</li>
          </ul>
          <p className="mt-2 text-gray-500">
            선택 항목에 동의하지 않아도 가입 및 서비스 이용에 불이익이 없으며, 미동의 시 해당 정보는
            수집되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. 수집·이용 목적</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>회원 식별 및 인증, 가족 연결 관리</li>
            <li>질문 발송, 답변 수집·전달, 반응·알림 등 상호작용 제공</li>
            <li>모인 이야기를 엮은 책의 생성·전달</li>
            <li>(동의 시) 서비스 개선 및 이용 현황 분석</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. 보유·이용 기간</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>회원 탈퇴 시 지체 없이 파기하는 것을 원칙으로 합니다.</li>
            <li>관련 법령에 따라 보존 의무가 있는 항목은 해당 법령이 정한 기간 동안 보관 후 파기합니다.</li>
            <li>접속정보 등 분석 로그는 <strong>수집일로부터 12개월</strong> 또는 탈퇴 시점 중 먼저 도래하는 시점에 파기합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. 개인정보의 파기 절차 및 방법</h2>
          <p>
            수집·이용 목적이 달성되거나 보유 기간이 경과한 개인정보는 지체 없이 파기합니다. 전자적
            파일은 복구할 수 없는 기술적 방법으로 삭제하며, 출력물은 분쇄 또는 소각합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. 개인정보의 제3자 제공</h2>
          <p>
            원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 법령에 근거가 있거나 정보주체의
            별도 동의가 있는 경우에만 제공합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. 개인정보 처리의 위탁</h2>
          <p>서비스 운영을 위해 아래 업무를 위탁할 수 있습니다.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>클라우드 데이터 보관: Supabase (데이터베이스·스토리지 호스팅)</li>
            <li>AI 처리(질문 생성·답변 합성·책 편집): Anthropic API</li>
            {/* TODO: 메시지 발송(카카오/SMS) 수탁자 확정 시 추가 고지·동의 필요 */}
            <li>메시지 발송: 추후 위탁 시 수탁자를 고지하고 필요한 동의를 받습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. 정보주체의 권리</h2>
          <p>
            이용자는 언제든지 자신의 개인정보에 대한 <strong>열람·정정·삭제·처리정지</strong>를
            요구하거나 <strong>동의를 철회</strong>할 수 있습니다. 서비스 내 설정 메뉴 또는 아래
            문의처를 통해 행사할 수 있으며, 운영자는 지체 없이 조치합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">8. 만 14세 미만 아동의 개인정보</h2>
          <p>
            만 14세 미만 아동의 개인정보를 수집할 때는 법정대리인의 동의가 필요합니다. 별도 법정대리인
            동의 절차가 마련되기 전까지 만 14세 미만 아동의 가입을 제한합니다.
            {/* TODO: 법정대리인 동의(보호자 이메일 동의) 절차 도입 시 개정 */}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">9. 안전성 확보 조치</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>접근통제: 콘텐츠는 연결된 가족 구성원만 열람 가능하며, 서버 측 권한 검증을 거칩니다.</li>
            <li>관리자 기능은 별도 권한 검증을 거치며, 관리자의 데이터 처리 행위는 감사 로그로 기록됩니다.</li>
            <li>비밀번호는 해시 처리하여 저장하며 원문을 보관하지 않습니다.</li>
            <li>전송 구간은 HTTPS로 암호화합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">10. 개인정보 보호책임자 및 문의처</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>개인정보 보호책임자: [성명: ___ / 직책: ___] {/* TODO: 보호책임자 확정 후 기재 */}</li>
            <li>문의: <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">11. 처리방침의 변경</h2>
          <p>
            본 방침의 내용이 추가·삭제·수정되는 경우 시행 7일 전부터 서비스 내 공지사항을 통해
            알립니다.
          </p>
        </section>

        <div className="text-sm text-gray-500 pt-4 border-t border-gray-100 space-y-1">
          <p>버전: v1.0 · 시행일: 2026년 6월 12일</p>
          <p>
            서비스 이용 조건은{' '}
            <Link href="/terms" className="underline" style={{ color: 'var(--color-primary)' }}>
              이용약관
            </Link>
            을 확인해 주세요.
          </p>
        </div>
      </div>
    </main>
  );
}
