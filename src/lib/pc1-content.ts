// PC1-1 자가진단 채널별 헤드라인 카피.
// ?ch= 값으로 분기. 문구는 여기 placeholder를 직접 교체하면 된다.
// 채널 키: search | community | referral (+ default)

export type Pc1Channel = 'search' | 'community' | 'referral' | 'default';

export const CHANNEL_COPY: Record<Pc1Channel, { headline: string; sub: string }> = {
  // 검색 광고/SEO 유입 — 기한/긴급성 강조
  search: {
    headline: '지금 상속 결정 기한이 남았나요?',
    sub: '3개월 안에 반드시 결정해야 하는 것들을 놓치고 계실 수 있습니다.',
  },
  // 커뮤니티/카페/SNS 유입 — 공감/막막함 강조
  community: {
    headline: '막막한 상속 절차, 내 상황 먼저 파악하세요',
    sub: '2분 자가진단으로 지금 내가 처한 위험 수준을 확인하세요.',
  },
  // 추천/파트너(상조·장례·지인 추천) 유입 — 신뢰/전문가 강조
  referral: {
    headline: '전문가가 먼저 확인해드립니다',
    sub: '아래 질문에 답하시면 위험 항목을 짚어드립니다.',
  },
  // 기본(UTM/ch 없음)
  default: {
    headline: '상속 리스크, 지금 바로 확인하세요',
    sub: '간단한 5문항으로 상속 절차의 위험 수준을 파악해보세요.',
  },
};

export function resolveChannel(ch: string | null | undefined): Pc1Channel {
  if (ch === 'search' || ch === 'community' || ch === 'referral') return ch;
  return 'default';
}

// /admin/links 링크 빌더 채널 프리셋
export const CHANNEL_PRESETS: { ch: Pc1Channel; label: string; utm_source: string; utm_medium: string }[] = [
  { ch: 'search', label: '검색 광고', utm_source: 'google', utm_medium: 'cpc' },
  { ch: 'community', label: '커뮤니티/SNS', utm_source: 'naver_cafe', utm_medium: 'social' },
  { ch: 'referral', label: '추천/파트너', utm_source: 'partner', utm_medium: 'referral' },
];
