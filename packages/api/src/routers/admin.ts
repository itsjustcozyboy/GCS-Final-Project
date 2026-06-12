import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

async function assertAdmin(ctx: { db: Parameters<typeof protectedProcedure.mutation>[0]['ctx'] extends { db: infer D } ? D : never; userId: string }) {
  const admin = await (ctx.db as import('@maeum/db').PrismaClient).admin.findUnique({ where: { userId: ctx.userId } });
  if (!admin) throw new TRPCError({ code: 'FORBIDDEN', message: '관리자 권한이 필요합니다.' });
}

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

void assertAdmin; // suppress unused warning
