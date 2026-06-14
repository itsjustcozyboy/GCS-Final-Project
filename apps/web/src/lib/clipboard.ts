/**
 * 클립보드 복사 — navigator.clipboard 우선, 실패/미지원 시 textarea + execCommand 폴백.
 * 비-HTTPS, 일부 모바일 웹뷰에서도 최대한 동작하게 한다.
 * @returns 성공 여부 (호출부에서 토스트/안내 분기에 사용)
 */
export async function copyText(text: string): Promise<boolean> {
  // 1) 표준 Clipboard API (보안 컨텍스트에서만 동작)
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 폴백으로 진행
  }

  // 2) execCommand 폴백
  try {
    if (typeof document === 'undefined') return false;
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
