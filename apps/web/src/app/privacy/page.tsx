import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '개인정보처리방침 — 마음 잇기' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto" style={{ background: 'var(--color-background)' }}>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← 홈으로</Link>

      <h1 className="text-2xl font-bold mt-6 mb-8" style={{ color: 'var(--color-primary-dark)' }}>
        개인정보처리방침
      </h1>

      <div className="prose prose-sm text-gray-700 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. 수집하는 개인정보 항목</h2>
          <p>마음 잇기는 서비스 이용 분석을 위해 아래 정보를 <strong>이용자의 동의를 받아</strong> 수집할 수 있습니다.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>이름, 이메일 주소</li>
            <li>접속 IP 주소</li>
            <li>접속 일시, 기기 및 브라우저 정보(User-Agent)</li>
          </ul>
          <p className="mt-2 text-gray-500">동의하지 않은 경우 위 정보는 수집되지 않으며, 서비스 이용에 아무런 불이익이 없습니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. 수집 및 이용 목적</h2>
          <p>수집된 정보는 서비스 품질 개선 및 이용 현황 분석 목적으로만 사용됩니다. 제3자에게 제공되지 않습니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. 보유 및 이용 기간</h2>
          <p>회원 탈퇴 시 또는 수집일로부터 12개월이 경과한 시점 중 먼저 도래하는 시점에 파기합니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. 동의 철회 및 열람·삭제 요청</h2>
          <p>
            수집 동의 철회 또는 개인정보 열람·삭제를 원하시면 서비스 내 설정 메뉴 또는 아래 연락처로 요청하실 수 있습니다.
          </p>
          <p className="mt-1 text-gray-500">문의: support@maeum-itgi.kr</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. 개인정보 보호 조치</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>접속 로그는 관리자 계정으로만 접근 가능하며 서버 측 권한 검증을 거칩니다.</li>
            <li>비밀번호는 SHA-256 해시로 저장되며, 원문은 보관하지 않습니다.</li>
            <li>관리자의 데이터 삭제 행위는 별도 감사 로그로 기록됩니다.</li>
          </ul>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          최종 수정일: 2026년 6월 12일
        </p>
      </div>
    </main>
  );
}
