// 단일 조정 파일: fd별 퍼널 단계 매핑 · 통과 기준 · 표본 임계값.
// 이벤트명은 실제 fd 페이지가 쏘는 이름에 맞춘 매핑이며, 여기만 고치면 대시보드 전체가 따라간다.

export type Verdict = 'pass' | 'warn' | 'fail' | 'insufficient';

export interface FdDef {
  label: string;
  /** props_json.fd_id 값. 파생 행(pc1-channel)은 baseFd로 원본을 가리킨다. */
  baseFd: string;
  /** pc1-channel처럼 baseFd 이벤트를 channel_variant≠default로 필터한 파생 행 여부 */
  derivedChannel?: boolean;
  // 단계별 이벤트명(없는 단계는 생략)
  visit: string;
  cta?: string;
  start?: string;
  complete?: string;
  lead: string;
  /** 의향(지불의사/초대 등) 행동 이벤트명 */
  intent?: string;
  intentLabel?: string;
  /** 핵심 전환율 정의: 분자 이벤트 / 분모 이벤트 */
  core: { num: string; den: string };
  /** 통과 기준(0~1). 목표 미정이면 null → 판정은 표시만(주의) */
  threshold: number | null;
}

// 9개 fd 순서(섹션 A 행 순서)
export const FD_ORDER = [
  'pc1-quiz',
  'pc1-preorder',
  'pc1-channel',
  'pc2-checklist',
  'pc2-subscribe',
  'pc2-kakao',
  'pc3-settle',
  'pc3-board',
  'pc3-content',
] as const;

export type FdId = (typeof FD_ORDER)[number];

export const FD_DEFS: Record<FdId, FdDef> = {
  'pc1-quiz': {
    label: 'pc1-quiz · 상속 퀴즈',
    baseFd: 'pc1-quiz',
    visit: 'page_view',
    cta: 'cta_click',
    start: 'quiz_start',
    complete: 'quiz_complete',
    lead: 'lead_submit',
    core: { num: 'lead_submit', den: 'quiz_complete' },
    threshold: 0.4,
  },
  'pc1-preorder': {
    label: 'pc1-preorder · 사전구매',
    baseFd: 'pc1-preorder',
    visit: 'page_view',
    start: 'price_view',
    lead: 'lead_submit',
    intent: 'preorder_intent',
    intentLabel: '사전구매 의향',
    core: { num: 'preorder_intent', den: 'price_view' },
    threshold: 0.08,
  },
  'pc1-channel': {
    label: 'pc1-channel · 채널 레이어(pc1-quiz 파생)',
    baseFd: 'pc1-quiz',
    derivedChannel: true,
    visit: 'page_view',
    cta: 'cta_click',
    start: 'quiz_start',
    complete: 'quiz_complete',
    lead: 'lead_submit',
    core: { num: 'lead_submit', den: 'quiz_complete' },
    threshold: 0.4,
  },
  'pc2-checklist': {
    label: 'pc2-checklist · 체크리스트',
    baseFd: 'pc2-checklist',
    visit: 'page_view',
    cta: 'cta_click',
    start: 'form_start',
    complete: 'form_complete',
    lead: 'lead_submit',
    core: { num: 'form_complete', den: 'form_start' },
    threshold: 0.5,
  },
  'pc2-subscribe': {
    label: 'pc2-subscribe · 구독',
    baseFd: 'pc2-subscribe',
    visit: 'page_view',
    lead: 'lead_submit',
    intent: 'subscribe_intent',
    intentLabel: '구독 의향',
    core: { num: 'subscribe_intent', den: 'page_view' },
    threshold: null,
  },
  'pc2-kakao': {
    label: 'pc2-kakao · 카카오 채널',
    baseFd: 'pc2-kakao',
    visit: 'page_view',
    cta: 'cta_click',
    lead: 'lead_submit',
    intent: 'kakao_channel_click',
    intentLabel: '채널 추가',
    core: { num: 'kakao_channel_click', den: 'page_view' },
    threshold: null,
  },
  'pc3-settle': {
    label: 'pc3-settle · 정산 계산기',
    baseFd: 'pc3-settle',
    visit: 'page_view',
    cta: 'cta_click',
    start: 'tool_start',
    complete: 'preview_view',
    lead: 'lead_submit',
    core: { num: 'lead_submit', den: 'tool_start' },
    threshold: null,
  },
  'pc3-board': {
    label: 'pc3-board · 가족 보드',
    baseFd: 'pc3-board',
    visit: 'page_view',
    start: 'board_create_attempt',
    lead: 'lead_submit',
    intent: 'invite_click',
    intentLabel: '초대 클릭',
    core: { num: 'invite_click', den: 'board_create_attempt' },
    threshold: null,
  },
  'pc3-content': {
    label: 'pc3-content · 콘텐츠 허브',
    baseFd: 'pc3-content',
    visit: 'content_view',
    cta: 'content_cta_click',
    lead: 'lead_submit',
    core: { num: 'lead_submit', den: 'content_view' },
    threshold: null,
  },
};

// 표본 임계값(조정 가능)
export const SAMPLE = {
  MIN_VISITS: 30,
  MIN_DENOMINATOR: 15,
};

// PC1 모니터링 카드 전용 표본 임계(방문<100 또는 완주<15 → 전환율 판단 보류)
export const PC1_SAMPLE = {
  MIN_VISITS: 100,
  MIN_COMPLETE: 15,
};

// PC1 통과/실패 해석 기준(docs/DEPLOY-PC1.md와 동일)
export const PC1_CRITERIA = {
  completeToLead: 0.4, // 🟢 완주→신청 ≥40%
  preorderIntent: 0.08, // 🟢 사전예약의향(price_view→preorder_intent) ≥8~10%
  leadFloor: 0.15, // 🔴 신청(방문→신청) <15%
};

// pc2-checklist 보조 기준 · 민감 문항
export const CHECKLIST = {
  leadOverComplete: 0.35,
  sensitiveQuestions: ['q2', 'q3', 'q6'] as const,
};

// pc1-preorder 가격 variant 라벨
export const PRICE_VARIANTS: Record<string, string> = {
  A: '₩9,900',
  B: '₩29,000',
  C: '₩49,000',
};

/** 핵심 전환율 판정. 표본 부족이면 무조건 insufficient. */
export function verdict(
  rate: number | null,
  threshold: number | null,
  visits: number,
  denominator: number
): Verdict {
  if (visits < SAMPLE.MIN_VISITS || denominator < SAMPLE.MIN_DENOMINATOR || rate === null) {
    return 'insufficient';
  }
  if (threshold === null) return 'warn'; // 목표 미정 → 표시만
  if (rate >= threshold) return 'pass';
  if (rate >= threshold * 0.8) return 'warn';
  return 'fail';
}

export const VERDICT_BADGE: Record<Verdict, { icon: string; label: string; color: string }> = {
  pass: { icon: '🟢', label: '통과', color: '#16a34a' },
  warn: { icon: '🟡', label: '주의', color: '#ca8a04' },
  fail: { icon: '🔴', label: '미달', color: '#dc2626' },
  insufficient: { icon: '⚪', label: '데이터부족', color: '#9ca3af' },
};
