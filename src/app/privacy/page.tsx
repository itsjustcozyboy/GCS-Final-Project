export default function PrivacyPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-xl font-bold mb-4">개인정보 처리방침</h1>
      <div className="prose text-sm text-gray-600 space-y-4">
        <p>수집 항목: 이메일 주소, 이름(선택)</p>
        <p>수집 목적: 서비스 베타 출시 안내</p>
        <p>보유 기간: 동의 철회 요청 시까지</p>
        <p>삭제 요청: privacy@example.com으로 이메일을 보내주시면 즉시 삭제합니다.</p>
        <p className="text-gray-400 text-xs">본 서비스는 실제 과금이 발생하지 않습니다. 결제 정보를 수집하지 않습니다.</p>
      </div>
    </main>
  );
}
