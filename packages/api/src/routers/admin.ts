import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// 관리자 전용 procedure (로그인 검증 + admins 테이블 검증)
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
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

      // 2) 비로그인 방문: IP 기준 집계
      const byIp = await ctx.db.accessLog.groupBy({
        by: ['ipAddress'],
        where: { userId: null },
        _count: { _all: true },
        _max: { createdAt: true },
        _min: { createdAt: true },
      });
      const anonIps = byIp.map((g) => g.ipAddress).filter((ip): ip is string => !!ip);
      const latestAnonLogs = await ctx.db.accessLog.findMany({
        where: { userId: null, ipAddress: { in: anonIps } },
        orderBy: { createdAt: 'desc' },
        distinct: ['ipAddress'],
        select: { ipAddress: true, userAgent: true, path: true },
      });
      const anonLatestMap = new Map(latestAnonLogs.map((l) => [l.ipAddress!, l]));

      const anonVisitors = byIp.map((g) => {
        const latest = g.ipAddress ? anonLatestMap.get(g.ipAddress) : undefined;
        return {
          key: `ip:${g.ipAddress ?? 'unknown'}`,
          userId: null as string | null,
          ipAddress: g.ipAddress,
          name: null as string | null,
          email: null as string | null,
          userAgent: latest?.userAgent ?? null,
          lastPath: latest?.path ?? null,
          visitCount: g._count._all,
          firstVisit: g._min.createdAt!,
          lastVisit: g._max.createdAt!,
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
            v.ipAddress?.toLowerCase().includes(q),
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
    }).refine((d) => d.userIds.length > 0 || d.ipAddresses.length > 0, {
      message: '삭제할 대상을 선택해주세요.',
    }))
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.db.accessLog.deleteMany({
        where: {
          OR: [
            ...(input.userIds.length ? [{ userId: { in: input.userIds } }] : []),
            ...(input.ipAddresses.length
              ? [{ userId: null, ipAddress: { in: input.ipAddresses } }]
              : []),
          ],
        },
      });

      await ctx.db.adminAudit.create({
        data: {
          adminId: ctx.userId,
          action: 'delete_visitors',
          targetIds: [...input.userIds.map((id) => `user:${id}`), ...input.ipAddresses.map((ip) => `ip:${ip}`)],
        },
      });

      return { deletedCount: count };
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
});
