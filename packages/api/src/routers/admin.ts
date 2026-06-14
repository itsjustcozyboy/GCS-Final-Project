import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { hashIp } from '../services/funnel';

// 관리자 전용 procedure (로그인 검증 + admins 테이블 검증)
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const admin = await ctx.db.admin.findUnique({ where: { userId: ctx.userId } });
  if (!admin) throw new TRPCError({ code: 'FORBIDDEN', message: '관리자 권한이 필요합니다.' });
  return next({ ctx });
});

export const adminRouter = router({
  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    const admin = await ctx.db.admin.findUnique({ where: { userId: ctx.userId } });
    return { isAdmin: !!admin };
  }),

  getLogs: adminProcedure
    .input(z.object({
      search: z.string().optional(),
      orderBy: z.enum(['createdAt_desc', 'createdAt_asc']).default('createdAt_desc'),
      limit: z.number().min(1).max(200).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where = input.search
        ? {
            OR: [
              { email: { contains: input.search, mode: 'insensitive' as const } },
              { name: { contains: input.search, mode: 'insensitive' as const } },
              { ipAddress: { contains: input.search, mode: 'insensitive' as const } },
            ],
          }
        : {};

      const [field, dir] = input.orderBy.split('_') as ['createdAt', 'desc' | 'asc'];

      const logs = await ctx.db.accessLog.findMany({
        where,
        orderBy: { [field]: dir },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        skip: input.cursor ? 1 : 0,
      });

      let nextCursor: string | undefined;
      if (logs.length > input.limit) {
        nextCursor = logs.pop()!.id;
      }

      return { logs, nextCursor };
    }),

  // 방문자별 통합 뷰 — 같은 사람의 접속 기록을 합쳐 방문 횟수로 표시
  getVisitors: adminProcedure
    .input(z.object({
      search: z.string().optional(),
      orderBy: z.enum(['lastVisit_desc', 'visitCount_desc']).default('lastVisit_desc'),
    }))
    .query(async ({ ctx, input }) => {
      // 1) 로그인 사용자: userId 기준 집계
      const byUser = await ctx.db.accessLog.groupBy({
        by: ['userId'],
        where: { userId: { not: null } },
        _count: { _all: true },
        _max: { createdAt: true },
        _min: { createdAt: true },
      });
      const userIds = byUser.map((g) => g.userId!).filter(Boolean);

      const [users, latestUserLogs] = await Promise.all([
        ctx.db.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true, lastSeenAt: true },
        }),
        // userId별 최신 로그 1건 (IP/기기/경로 표시용)
        ctx.db.accessLog.findMany({
          where: { userId: { in: userIds } },
          orderBy: { createdAt: 'desc' },
          distinct: ['userId'],
          select: { userId: true, ipAddress: true, userAgent: true, path: true },
        }),
      ]);
      const userMap = new Map(users.map((u) => [u.id, u]));
      const latestMap = new Map(latestUserLogs.map((l) => [l.userId!, l]));

      const ONLINE_WINDOW_MS = 2 * 60 * 1000;

      const userVisitors = byUser.map((g) => {
        const u = userMap.get(g.userId!);
        const latest = latestMap.get(g.userId!);
        return {
          key: `user:${g.userId}`,
          anonymousId: null as string | null,
          userId: g.userId,
          ipAddress: latest?.ipAddress ?? null,
          name: u?.name ?? null,
          email: u?.email ?? null,
          userAgent: latest?.userAgent ?? null,
          lastPath: latest?.path ?? null,
          visitCount: g._count._all,
          firstVisit: g._min.createdAt!,
          lastVisit: g._max.createdAt!,
          isOnline: !!u?.lastSeenAt && Date.now() - u.lastSeenAt.getTime() <= ONLINE_WINDOW_MS,
        };
      });

      // 2) 비로그인 방문: Supabase/Prisma의 Visitor 퍼널 테이블 기준
      const funnelVisitors = await ctx.db.visitor.findMany({
        where: { convertedUserId: null },
        orderBy: { createdAt: 'desc' },
      });
      const anonymousIds = funnelVisitors.map((v) => v.anonymousId);
      const latestAnonEvents = anonymousIds.length
        ? await ctx.db.visitorEvent.findMany({
            where: { anonymousId: { in: anonymousIds } },
            orderBy: { createdAt: 'desc' },
            distinct: ['anonymousId'],
            select: { anonymousId: true, path: true, deviceType: true },
          })
        : [];
      const anonLatestMap = new Map(latestAnonEvents.map((l) => [l.anonymousId, l]));

      const anonVisitors = funnelVisitors.map((v) => {
        const latest = anonLatestMap.get(v.anonymousId);
        return {
          key: `anon:${v.anonymousId}`,
          anonymousId: v.anonymousId,
          userId: null as string | null,
          ipAddress: null as string | null,
          name: null as string | null,
          email: null as string | null,
          userAgent: latest?.deviceType ?? null,
          lastPath: latest?.path ?? null,
          visitCount: v.visitCount,
          firstVisit: v.firstSeen,
          lastVisit: v.lastSeen,
          isOnline: false,
        };
      });

      let visitors = [...userVisitors, ...anonVisitors];

      // 검색: 이름/이메일/IP
      if (input.search) {
        const q = input.search.toLowerCase();
        visitors = visitors.filter(
          (v) =>
            v.name?.toLowerCase().includes(q) ||
            v.email?.toLowerCase().includes(q) ||
            v.ipAddress?.toLowerCase().includes(q) ||
            v.anonymousId?.toLowerCase().includes(q) ||
            v.lastPath?.toLowerCase().includes(q),
        );
      }

      visitors.sort((a, b) =>
        input.orderBy === 'visitCount_desc'
          ? b.visitCount - a.visitCount
          : b.lastVisit.getTime() - a.lastVisit.getTime(),
      );

      return { visitors, totalLogs: visitors.reduce((s, v) => s + v.visitCount, 0) };
    }),

  // 방문자 단위 삭제 — 해당 사람(또는 IP)의 접속 기록 전체 삭제
  deleteVisitors: adminProcedure
    .input(z.object({
      userIds: z.array(z.string()).max(100).default([]),
      ipAddresses: z.array(z.string()).max(100).default([]),
      anonymousIds: z.array(z.string()).max(100).default([]),
    }).refine((d) => d.userIds.length > 0 || d.ipAddresses.length > 0 || d.anonymousIds.length > 0, {
      message: '삭제할 대상을 선택해주세요.',
    }))
    .mutation(async ({ ctx, input }) => {
      const ipHashes = input.ipAddresses.map((ip) => hashIp(ip)).filter((v): v is string => !!v);

      const result = await ctx.db.$transaction(async (tx) => {
        const convertedVisitors = input.userIds.length
          ? await tx.visitor.findMany({
              where: { convertedUserId: { in: input.userIds } },
              select: { anonymousId: true },
            })
          : [];
        const ipEvents = ipHashes.length
          ? await tx.visitorEvent.findMany({
              where: { ipHash: { in: ipHashes } },
              distinct: ['anonymousId'],
              select: { anonymousId: true },
            })
          : [];

        const anonymousIds = [
          ...new Set([...input.anonymousIds, ...convertedVisitors, ...ipEvents].map((v) => typeof v === 'string' ? v : v.anonymousId)),
        ];

        const accessLogs =
          input.userIds.length || input.ipAddresses.length
            ? await tx.accessLog.deleteMany({
                where: {
                  OR: [
                    ...(input.userIds.length ? [{ userId: { in: input.userIds } }] : []),
                    ...(input.ipAddresses.length
                      ? [{ userId: null, ipAddress: { in: input.ipAddresses } }]
                      : []),
                  ],
                },
              })
            : { count: 0 };

        const conversionEvents =
          input.userIds.length || anonymousIds.length
            ? await tx.conversionEvent.deleteMany({
                where: {
                  OR: [
                    ...(input.userIds.length ? [{ userId: { in: input.userIds } }] : []),
                    ...(anonymousIds.length ? [{ anonymousId: { in: anonymousIds } }] : []),
                  ],
                },
              })
            : { count: 0 };

        const visitorEvents = anonymousIds.length
          ? await tx.visitorEvent.deleteMany({ where: { anonymousId: { in: anonymousIds } } })
          : { count: 0 };

        const visitors =
          anonymousIds.length || input.userIds.length
            ? await tx.visitor.deleteMany({
                where: {
                  OR: [
                    ...(anonymousIds.length ? [{ anonymousId: { in: anonymousIds } }] : []),
                    ...(input.userIds.length ? [{ convertedUserId: { in: input.userIds } }] : []),
                  ],
                },
              })
            : { count: 0 };

        await tx.adminAudit.create({
          data: {
            adminId: ctx.userId,
            action: 'delete_visitors',
            targetIds: [
              ...input.userIds.map((id) => `user:${id}`),
              ...input.ipAddresses.map((ip) => `ip:${ip}`),
              ...input.anonymousIds.map((id) => `anon:${id}`),
            ],
          },
        });

        return {
          accessLogs: accessLogs.count,
          visitors: visitors.count,
          visitorEvents: visitorEvents.count,
          conversionEvents: conversionEvents.count,
        };
      });

      return {
        deletedCount: result.accessLogs + result.visitors + result.visitorEvents + result.conversionEvents,
        ...result,
      };
    }),

  deleteLogs: adminProcedure
    .input(z.object({ ids: z.array(z.string()).min(1).max(200) }))
    .mutation(async ({ ctx, input }) => {
      // 관리자 권한은 adminProcedure에서 이미 검증됨 — 삭제 전 재검증
      const admin = await ctx.db.admin.findUnique({ where: { userId: ctx.userId } });
      if (!admin) throw new TRPCError({ code: 'FORBIDDEN', message: '관리자 권한이 필요합니다.' });

      const { count } = await ctx.db.accessLog.deleteMany({
        where: { id: { in: input.ids } },
      });

      await ctx.db.adminAudit.create({
        data: { adminId: ctx.userId, action: 'delete_logs', targetIds: input.ids },
      });

      return { deletedCount: count };
    }),

  // ── 방문자 전환율(퍼널) 분석 ──────────────────────────────────
  // 방문자 수 = 기간 내 첫 방문(firstSeen)한 고유 anonymousId. 전환 = 그중 계정으로 연결된 수.
  // 채널 귀속은 first-touch(ftSource) 기준.
  funnelSummary: adminProcedure
    .input(z.object({ days: z.number().int().min(1).max(365).default(30) }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const [totalVisitors, conversions] = await Promise.all([
        ctx.db.visitor.count({ where: { firstSeen: { gte: cutoff } } }),
        ctx.db.visitor.count({ where: { firstSeen: { gte: cutoff }, convertedUserId: { not: null } } }),
      ]);
      return {
        totalVisitors,
        conversions,
        conversionRate: totalVisitors ? conversions / totalVisitors : 0,
      };
    }),

  // 채널별(utm_source, first-touch) 방문/전환/전환율
  channelStats: adminProcedure
    .input(z.object({ days: z.number().int().min(1).max(365).default(30) }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const [visits, conv] = await Promise.all([
        ctx.db.visitor.groupBy({ by: ['ftSource'], where: { firstSeen: { gte: cutoff } }, _count: { _all: true } }),
        ctx.db.visitor.groupBy({
          by: ['ftSource'],
          where: { firstSeen: { gte: cutoff }, convertedUserId: { not: null } },
          _count: { _all: true },
        }),
      ]);
      const agg = new Map<string, { visits: number; conversions: number }>();
      for (const v of visits) {
        const s = v.ftSource ?? 'direct';
        agg.set(s, { visits: (agg.get(s)?.visits ?? 0) + v._count._all, conversions: agg.get(s)?.conversions ?? 0 });
      }
      for (const c of conv) {
        const s = c.ftSource ?? 'direct';
        const cur = agg.get(s) ?? { visits: 0, conversions: 0 };
        cur.conversions += c._count._all;
        agg.set(s, cur);
      }
      return [...agg.entries()]
        .map(([source, { visits, conversions }]) => ({
          source,
          visits,
          conversions,
          conversionRate: visits ? conversions / visits : 0,
        }))
        .sort((a, b) => b.visits - a.visits);
    }),

  // 아직 전환되지 않은 익명 방문자 (링크만 타고 들어온 사람들). 식별정보 없음.
  anonymousVisitors: adminProcedure
    .input(z.object({
      days: z.number().int().min(1).max(365).default(30),
      search: z.string().optional(),
      limit: z.number().int().min(1).max(200).default(100),
    }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const visitors = await ctx.db.visitor.findMany({
        where: {
          convertedUserId: null,
          firstSeen: { gte: cutoff },
          ...(input.search
            ? { OR: [{ ftSource: { contains: input.search, mode: 'insensitive' as const } }, { anonymousId: { contains: input.search } }] }
            : {}),
        },
        orderBy: { lastSeen: 'desc' },
        take: input.limit,
      });
      const ids = visitors.map((v) => v.anonymousId);
      const latest = ids.length
        ? await ctx.db.visitorEvent.findMany({
            where: { anonymousId: { in: ids } },
            orderBy: { createdAt: 'desc' },
            distinct: ['anonymousId'],
            select: { anonymousId: true, path: true, deviceType: true },
          })
        : [];
      const lm = new Map(latest.map((e) => [e.anonymousId, e]));
      return visitors.map((v) => ({
        anonymousId: v.anonymousId,
        firstSeen: v.firstSeen,
        lastSeen: v.lastSeen,
        visitCount: v.visitCount,
        source: v.ftSource ?? 'direct',
        lastPath: lm.get(v.anonymousId)?.path ?? null,
        deviceType: lm.get(v.anonymousId)?.deviceType ?? null,
      }));
    }),

  // 전환된 방문자: anonymousId → 연결 계정(이름/이메일), 전환 시각, 유입(first-touch)
  convertedVisitors: adminProcedure
    .input(z.object({
      days: z.number().int().min(1).max(365).default(30),
      source: z.string().optional(),
      limit: z.number().int().min(1).max(200).default(100),
    }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const visitors = await ctx.db.visitor.findMany({
        where: {
          convertedUserId: { not: null },
          convertedAt: { gte: cutoff },
          ...(input.source ? { ftSource: input.source === 'direct' ? null : input.source } : {}),
        },
        orderBy: { convertedAt: 'desc' },
        take: input.limit,
      });
      const userIds = [...new Set(visitors.map((v) => v.convertedUserId!).filter(Boolean))];
      const users = userIds.length
        ? await ctx.db.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true, email: true } })
        : [];
      const um = new Map(users.map((u) => [u.id, u]));
      return visitors.map((v) => ({
        anonymousId: v.anonymousId,
        userId: v.convertedUserId,
        name: um.get(v.convertedUserId!)?.name ?? null,
        email: um.get(v.convertedUserId!)?.email ?? null,
        convertedAt: v.convertedAt,
        source: v.ftSource ?? 'direct',
      }));
    }),

  // 일자별 방문/전환 추이 — 한국 시간(KST, UTC+9) 기준으로 날짜 버킷을 나눈다.
  // (대시보드 표시 시각이 Asia/Seoul이므로 일자 경계도 KST에 맞춰야 정합.)
  visitorTrend: adminProcedure
    .input(z.object({ days: z.number().int().min(1).max(90).default(14) }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const rows = await ctx.db.visitor.findMany({
        where: { firstSeen: { gte: cutoff } },
        select: { firstSeen: true, convertedAt: true },
      });
      const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
      const kstDay = (d: Date) => new Date(d.getTime() + KST_OFFSET_MS).toISOString().slice(0, 10);
      const byDay = new Map<string, { visitors: number; conversions: number }>();
      const bump = (d: string, key: 'visitors' | 'conversions') => {
        const cur = byDay.get(d) ?? { visitors: 0, conversions: 0 };
        cur[key] += 1;
        byDay.set(d, cur);
      };
      for (const r of rows) {
        bump(kstDay(r.firstSeen), 'visitors');
        if (r.convertedAt && r.convertedAt >= cutoff) bump(kstDay(r.convertedAt), 'conversions');
      }
      return [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, v]) => ({ date, ...v }));
    }),
});
