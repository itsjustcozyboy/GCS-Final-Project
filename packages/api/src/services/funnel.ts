import { createHash } from 'crypto';
import type { prisma as PrismaType } from '@maeum/db';

type DB = typeof PrismaType;
export type ConversionTypeName = 'signup_started' | 'signup_completed' | 'first_login' | 'onboarding_completed';

export interface Utm {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

// user-agent에서 대략적 기기/봇 종류만 추출 (비식별)
export function deviceTypeFromUA(ua?: string | null): string {
  if (!ua) return 'unknown';
  const s = ua.toLowerCase();
  if (/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|monitor|curl|wget|headless/.test(s)) return 'bot';
  if (/ipad|tablet|playbook|silk/.test(s)) return 'tablet';
  if (/mobi|android|iphone|ipod|phone/.test(s)) return 'mobile';
  return 'desktop';
}

// 익명 단계: IP 원문을 저장하지 않고 솔트 해시만 남긴다 (재식별 불가, 중복 추정용)
export function hashIp(ip?: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.PASSWORD_SALT ?? 'maeum-salt';
  return createHash('sha256').update(`${ip}|${salt}`).digest('hex').slice(0, 32);
}

// 유효 출처: utm_source > fbclid(meta) > gclid(google) > direct
export function effectiveSource(utm: Utm, fbclid?: string | null, gclid?: string | null): string {
  if (utm.source) return utm.source;
  if (fbclid) return 'meta';
  if (gclid) return 'google';
  return 'direct';
}

const DEDUP_MS = 30_000; // 동일 anonymousId+path 30초 내 중복(프리페치/봇 더블파이어)은 1건으로

export interface VisitInput {
  anonymousId?: string;
  path: string;
  referrer?: string | null;
  utm: Utm;
  fbclid?: string | null;
  gclid?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}

// 익명 방문 1건 적재 + Visitor 집계(first-touch 보존 / last-touch 갱신). 서버에서만 호출.
export async function recordVisit(db: DB, p: VisitInput): Promise<void> {
  if (!p.anonymousId) return; // 쿠키 없으면 익명 추적 불가 (미들웨어가 곧 발급)

  const now = new Date();
  const src = effectiveSource(p.utm, p.fbclid, p.gclid);
  const lastTouch = {
    ltSource: src,
    ltMedium: p.utm.medium ?? null,
    ltCampaign: p.utm.campaign ?? null,
    ltContent: p.utm.content ?? null,
    ltTerm: p.utm.term ?? null,
  };
  const firstTouch = {
    ftSource: src,
    ftMedium: p.utm.medium ?? null,
    ftCampaign: p.utm.campaign ?? null,
    ftContent: p.utm.content ?? null,
    ftTerm: p.utm.term ?? null,
  };

  const eventData = {
    anonymousId: p.anonymousId,
    path: p.path,
    referrer: p.referrer ?? null,
    utmSource: p.utm.source ?? null,
    utmMedium: p.utm.medium ?? null,
    utmCampaign: p.utm.campaign ?? null,
    utmContent: p.utm.content ?? null,
    utmTerm: p.utm.term ?? null,
    fbclid: p.fbclid ?? null,
    gclid: p.gclid ?? null,
    deviceType: deviceTypeFromUA(p.userAgent),
    ipHash: hashIp(p.ip),
  };

  const existing = await db.visitor.findUnique({ where: { anonymousId: p.anonymousId } });

  if (!existing) {
    await db.visitor.create({
      data: { anonymousId: p.anonymousId, firstSeen: now, lastSeen: now, visitCount: 1, ...firstTouch, ...lastTouch },
    });
    await db.visitorEvent.create({ data: eventData });
    return;
  }

  // 디듀프: 같은 path를 30초 내 다시 찍으면 새 이벤트/카운트 없이 lastSeen만 갱신
  const recent = await db.visitorEvent.findFirst({
    where: { anonymousId: p.anonymousId, path: p.path, createdAt: { gte: new Date(now.getTime() - DEDUP_MS) } },
    select: { id: true },
  });

  await db.visitor.update({
    where: { anonymousId: p.anonymousId },
    data: {
      lastSeen: now,
      ...(recent ? {} : { visitCount: { increment: 1 } }),
      ...(existing.ftSource ? {} : firstTouch), // first-touch는 비어있을 때만 채움(덮어쓰기 금지)
      ...lastTouch, // last-touch는 항상 최신값으로 갱신
    },
  });

  if (!recent) await db.visitorEvent.create({ data: eventData });
}

// 전환 연결(stitching): anonymousId ↔ user_id. 최초 전환만 convertedUserId로 고정, 단계별 이벤트는 누적.
export async function recordConversion(
  db: DB,
  args: { anonymousId?: string; userId: string; type: ConversionTypeName },
): Promise<void> {
  const now = new Date();

  if (args.anonymousId) {
    const v = await db.visitor.findUnique({
      where: { anonymousId: args.anonymousId },
      select: { convertedUserId: true },
    });
    if (!v) {
      await db.visitor.create({
        data: { anonymousId: args.anonymousId, firstSeen: now, lastSeen: now, convertedUserId: args.userId, convertedAt: now },
      });
    } else if (!v.convertedUserId) {
      await db.visitor.update({
        where: { anonymousId: args.anonymousId },
        data: { convertedUserId: args.userId, convertedAt: now },
      });
    }
  }

  // 동일 단계 중복 방지: anonymousId(있으면) 또는 userId 기준으로 같은 type 1건만 남긴다.
  const dupWhere = args.anonymousId
    ? { type: args.type, anonymousId: args.anonymousId }
    : { type: args.type, userId: args.userId };
  const exists = await db.conversionEvent.findFirst({ where: dupWhere, select: { id: true } });
  if (!exists) {
    await db.conversionEvent.create({
      data: { anonymousId: args.anonymousId ?? null, userId: args.userId, type: args.type },
    });
  }
}
