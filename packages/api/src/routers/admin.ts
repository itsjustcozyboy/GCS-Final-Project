import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { hashIp } from '../services/funnel';
import type { prisma as PrismaType } from '@maeum/db';

type DB = typeof PrismaType;

function sourceFromFirstTouch(source?: string | null) {
  return source ?? 'direct';
}

async function getRegisteredConversions(db: DB, cutoff: Date) {
  const users = await db.user.findMany({
    where: { createdAt: { gte: cutoff }, admin: null },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  const userIds = users.map((u) => u.id);
  const events = userIds.length
    ? await db.conversionEvent.findMany({
        where: { userId: { in: userIds } },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          anonymousId: true,
          userId: true,
          type: true,
          createdAt: true,
          visitor: { select: { ftSource: true } },
        },
      })
    : [];

  const eventByUser = new Map<string, (typeof events)[number]>();
  for (const event of events) {
    if (!event.userId) continue;
    const current = eventByUser.get(event.userId);
    if (!current || (current.type !== 'signup_completed' && event.type === 'signup_completed')) {
      eventByUser.set(event.userId, event);
    }
  }

  return users.map((user) => {
    const event = eventByUser.get(user.id);
    return {
      id: event?.id ?? `user:${user.id}`,
      anonymousId: event?.anonymousId ?? null,
      userId: user.id,
      type: event?.type ?? 'signup_completed',
      name: user.name,
      email: user.email,
      convertedAt: user.createdAt,
      source: sourceFromFirstTouch(event?.visitor?.ftSource),
    };
  });
}

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

  // 전환 사용자(가입 계정) 완전 삭제 — 계정 + 연결/답변/반응/책 + 퍼널·접속 기록을 모두 제거한다.
  // 전환 수치(funnelSummary/convertedVisitors)는 User 기준 집계라, 목록·카운트에서 실제로 없애려면
  // 계정 자체를 지워야 한다. 관리자 계정은 절대 삭제하지 않는다(admin: { is: null } 가드).
  deleteConvertedUsers: adminProcedure
    .input(z.object({ userIds: z.array(z.string()).min(1).max(100) }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.$transaction(async (tx) => {
        // 관리자 계정은 대상에서 제외
        const targets = await tx.user.findMany({
          where: { id: { in: input.userIds }, admin: { is: null } },
          select: { id: true },
        });
        const userIds = targets.map((u) => u.id);
        if (userIds.length === 0) {
          return { users: 0, connections: 0, accessLogs: 0, visitors: 0, visitorEvents: 0, conversionEvents: 0 };
        }

        // 1) 앱 데이터 그래프 — FK 제약(Connection/Reaction 등은 cascade 없음)상 자식부터 삭제
        const connections = await tx.connection.findMany({
          where: { OR: [{ fromUserId: { in: userIds } }, { toUserId: { in: userIds } }] },
          select: { id: true },
        });
        const connectionIds = connections.map((c) => c.id);

        const questions = connectionIds.length
          ? await tx.question.findMany({ where: { connectionId: { in: connectionIds } }, select: { id: true } })
          : [];
        const questionIds = questions.map((q) => q.id);

        const answers = questionIds.length
          ? await tx.answer.findMany({ where: { questionId: { in: questionIds } }, select: { id: true } })
          : [];
        const answerIds = answers.map((a) => a.id);

        // 반응: 삭제 대상 답변에 달린 것 + 이 사용자들이 남긴 것 모두 (둘 다 Restrict)
        await tx.reaction.deleteMany({
          where: {
            OR: [
              ...(answerIds.length ? [{ answerId: { in: answerIds } }] : []),
              { userId: { in: userIds } },
            ],
          },
        });
        if (questionIds.length) await tx.answer.deleteMany({ where: { questionId: { in: questionIds } } });
        if (connectionIds.length) {
          await tx.question.deleteMany({ where: { connectionId: { in: connectionIds } } });
          await tx.bookEdition.deleteMany({ where: { connectionId: { in: connectionIds } } });
          // ConnectionInvite.connectionId 는 onDelete: SetNull — 커넥션 삭제만으로 정리됨
          await tx.connection.deleteMany({ where: { id: { in: connectionIds } } });
        }

        // 2) 퍼널 / 접속 기록
        const convertedVisitors = await tx.visitor.findMany({
          where: { convertedUserId: { in: userIds } },
          select: { anonymousId: true },
        });
        const anonymousIds = [...new Set(convertedVisitors.map((v) => v.anonymousId))];

        const conversionEvents = await tx.conversionEvent.deleteMany({
          where: {
            OR: [
              { userId: { in: userIds } },
              ...(anonymousIds.length ? [{ anonymousId: { in: anonymousIds } }] : []),
            ],
          },
        });
        const visitorEvents = anonymousIds.length
          ? await tx.visitorEvent.deleteMany({ where: { anonymousId: { in: anonymousIds } } })
          : { count: 0 };
        const visitors = await tx.visitor.deleteMany({ where: { convertedUserId: { in: userIds } } });
        const accessLogs = await tx.accessLog.deleteMany({ where: { userId: { in: userIds } } });

        // 3) 계정 — cascade: consents/sessions/childInvites/admin, setNull: acceptedInvites
        const users = await tx.user.deleteMany({ where: { id: { in: userIds } } });

        await tx.adminAudit.create({
          data: {
            adminId: ctx.userId,
            action: 'delete_converted_users',
            targetIds: userIds.map((id) => `user:${id}`),
          },
        });

        return {
          users: users.count,
          connections: connectionIds.length,
          accessLogs: accessLogs.count,
          visitors: visitors.count,
          visitorEvents: visitorEvents.count,
          conversionEvents: conversionEvents.count,
        };
      });

      return { deletedCount: result.users, ...result };
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
  // 방문자 수 = 기간 내 첫 방문(firstSeen)한 고유 anonymousId.
  // 전환 = 기간 내 가입한 비관리자 사용자 수. 과거 누락된 ConversionEvent가 있어도 User 기준으로 보정한다.
  // 채널 귀속은 first-touch(ftSource) 기준.
  funnelSummary: adminProcedure
    .input(z.object({ days: z.number().int().min(1).max(365).default(30) }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const [totalVisitors, conversions] = await Promise.all([
        ctx.db.visitor.count({ where: { firstSeen: { gte: cutoff } } }),
        ctx.db.user.count({ where: { createdAt: { gte: cutoff }, admin: null } }),
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
      const [visits, conversions] = await Promise.all([
        ctx.db.visitor.groupBy({ by: ['ftSource'], where: { firstSeen: { gte: cutoff } }, _count: { _all: true } }),
        getRegisteredConversions(ctx.db, cutoff),
      ]);
      const agg = new Map<string, { visits: number; conversions: number }>();
      for (const v of visits) {
        const s = sourceFromFirstTouch(v.ftSource);
        agg.set(s, { visits: (agg.get(s)?.visits ?? 0) + v._count._all, conversions: agg.get(s)?.conversions ?? 0 });
      }
      for (const c of conversions) {
        const s = c.source;
        const cur = agg.get(s) ?? { visits: 0, conversions: 0 };
        cur.conversions += 1;
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
      const conversions = await getRegisteredConversions(ctx.db, cutoff);
      return conversions
        .filter((v) => !input.source || v.source === input.source)
        .slice(0, input.limit);
    }),

  // 일자별 방문/전환 추이 — 한국 시간(KST, UTC+9) 기준으로 날짜 버킷을 나눈다.
  // (대시보드 표시 시각이 Asia/Seoul이므로 일자 경계도 KST에 맞춰야 정합.)
  visitorTrend: adminProcedure
    .input(z.object({ days: z.number().int().min(1).max(90).default(14) }))
    .query(async ({ ctx, input }) => {
      const cutoff = new Date(Date.now() - input.days * 86_400_000);
      const [visitors, conversions] = await Promise.all([
        ctx.db.visitor.findMany({
          where: { firstSeen: { gte: cutoff } },
          select: { firstSeen: true },
        }),
        ctx.db.user.findMany({
          where: { createdAt: { gte: cutoff }, admin: null },
          select: { createdAt: true },
        }),
      ]);
      const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
      const kstDay = (d: Date) => new Date(d.getTime() + KST_OFFSET_MS).toISOString().slice(0, 10);
      const byDay = new Map<string, { visitors: number; conversions: number }>();
      const bump = (d: string, key: 'visitors' | 'conversions') => {
        const cur = byDay.get(d) ?? { visitors: 0, conversions: 0 };
        cur[key] += 1;
        byDay.set(d, cur);
      };
      for (const r of visitors) {
        bump(kstDay(r.firstSeen), 'visitors');
      }
      for (const r of conversions) {
        bump(kstDay(r.createdAt), 'conversions');
      }
      return [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, v]) => ({ date, ...v }));
    }),
});
