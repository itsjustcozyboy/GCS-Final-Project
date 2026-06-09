export default function ConsentNotice() {
  return (
    <p className="text-xs text-gray-400 mt-2">
      수집 항목: 이메일, 이름. 목적: 서비스 사전 안내.{' '}
      <a href="/privacy" className="underline">개인정보 처리방침</a>.
      삭제 요청: <a href="mailto:privacy@example.com" className="underline">privacy@example.com</a>
    </p>
  );
}
