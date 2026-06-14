// 관리자 알림 메일 발송 — Resend 연동.
// RESEND_API_KEY 미설정 시 콘솔 출력 Mock으로 동작해 키 없이도 전체 플로우가 통과한다.
//
// 운영 전 확인(README/TODO):
// - Resend 발신 도메인 검증 전에는 onboarding@resend.dev 발신만 가능하고
//   무료 티어는 일/월 발송량 제한이 있다. 정식 도메인 검증 후 INQUIRY_NOTIFY_FROM 교체.

export interface InquiryMailInput {
  category: string | null;
  fromEmail: string; // 문의자 회신용 이메일 (reply-to)
  message: string;
  userId?: string | null;
  ipAddress?: string | null; // 동의한 사용자만 값이 있음
  createdAt: Date;
}

const CATEGORY_LABEL: Record<string, string> = {
  bug: '버그/오류',
  feature: '기능 제안',
  payment: '결제',
  privacy: '개인정보',
  etc: '기타',
};

function buildMail(input: InquiryMailInput) {
  const categoryLabel = input.category ? (CATEGORY_LABEL[input.category] ?? input.category) : '미분류';
  const receivedAt = input.createdAt.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const subject = `[토닥 문의] ${categoryLabel} - ${receivedAt}`;
  const lines = [
    `문의 유형: ${categoryLabel}`,
    `문의자 이메일(회신용): ${input.fromEmail}`,
    input.userId ? `사용자 ID: ${input.userId}` : null,
    input.ipAddress ? `IP(수집 동의): ${input.ipAddress}` : null,
    `접수 시각: ${receivedAt}`,
    '',
    '── 문의 내용 ──',
    input.message,
  ].filter((l): l is string => l !== null);
  return { subject, text: lines.join('\n') };
}

/** 관리자에게 문의 알림 메일 발송. 성공 여부를 반환하며 절대 throw하지 않는다(저장 유실 방지). */
export async function sendInquiryNotification(input: InquiryMailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_TO ?? 'leokor1214@gachon.ac.kr';
  // TODO: Resend에서 자체 도메인 검증 후 INQUIRY_NOTIFY_FROM을 검증된 주소로 설정
  const from = process.env.INQUIRY_NOTIFY_FROM ?? 'onboarding@resend.dev';
  const { subject, text } = buildMail(input);

  if (!apiKey) {
    console.log('[MockMailer] RESEND_API_KEY 미설정 → 메일 발송 시뮬레이션');
    console.log(`  To: ${to}\n  From: ${from}\n  Reply-To: ${input.fromEmail}\n  Subject: ${subject}\n${text}`);
    return true;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `마음 잇기 <${from}>`,
      to,
      replyTo: input.fromEmail, // 관리자가 받은 메일에서 바로 회신하면 문의자에게 간다
      subject,
      text,
    });
    if (error) {
      console.error('[Mailer] Resend 발송 실패:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[Mailer] 발송 중 오류:', e);
    return false;
  }
}
