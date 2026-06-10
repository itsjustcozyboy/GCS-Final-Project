// 공개(활성) 범위 플래그.
// 환경변수 ACTIVE_PCS 로 어떤 PC 티어를 공개할지 제어한다.
// 예: ACTIVE_PCS=pc1  → pc1-* 라우트만 공개
//     ACTIVE_PCS=pc1,pc2 → pc1-*, pc2-* 공개 (나중에 다시 켤 때 값만 변경)
// 기본값은 pc1.

export type Tier = 'pc1' | 'pc2' | 'pc3';

export function getActiveTiers(): Tier[] {
  const raw = process.env.ACTIVE_PCS ?? 'pc1';
  const tiers = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is Tier => s === 'pc1' || s === 'pc2' || s === 'pc3');
  return tiers.length > 0 ? tiers : ['pc1'];
}

/** fd 라우트 세그먼트(pc1-quiz, pc2-checklist 등)에서 티어를 뽑는다. */
export function tierOf(fdSegment: string): Tier | null {
  const head = fdSegment.split('-')[0]?.toLowerCase();
  return head === 'pc1' || head === 'pc2' || head === 'pc3' ? head : null;
}

/** 해당 fd 라우트 세그먼트가 현재 공개 대상인지. */
export function isFdRouteActive(fdSegment: string): boolean {
  const tier = tierOf(fdSegment);
  if (!tier) return false;
  return getActiveTiers().includes(tier);
}
