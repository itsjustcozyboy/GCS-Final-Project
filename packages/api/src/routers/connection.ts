import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const connectionRouter = router({
  create: protectedProcedure
    .input(z.object({
      fromUserId: z.string(),
      intimacy: z.number().int().min(1).max(5).default(3),
      cohabiting: z.boolean().default(false),
      hasConflict: z.boolean().default(false),
      responseChannel: z.enum(['app', 'kakao', 'sms']).default('app'),
      tone: z.enum(['light', 'deep']).default('light'),
    }))
    .mutation(async ({ ctx, input }) => {
      const inviteCode = Math.random().toString(36).slice(2, 10).toUpperCase();
      return ctx.db.connection.create({
        data: {
          ...input,
          toUserId: ctx.userId,
          inviteCode,
        },
      });
    }),

  // 새 연결 시작 — 상대(부모님) 정보를 입력받아 사용자와 연결을 한 번에 생성
  start: protectedProcedure
    .input(z.object({
      parentName: z.string().min(1).max(50),
      tone: z.enum(['light', 'deep']).default('light'),
      intimacy: z.number().int().min(1).max(5).default(3),
      cohabiting: z.boolean().default(false),
      responseChannel: z.enum(['app', 'kakao', 'sms']).default('app'),
    }))
    .mutation(async ({ ctx, input }) => {
      // 이미 연결이 있으면 그대로 반환 (중복 생성 방지)
      const existing = await ctx.db.connection.findFirst({
        where: { OR: [{ fromUserId: ctx.userId }, { toUserId: ctx.userId }] },
      });
      if (existing) return existing;

      // 이야기를 들려줄 상대(부모님) 사용자 레코드 생성
      const parent = await ctx.db.user.create({
        data: { name: input.parentName, role: 'parent' },
      });

      const inviteCode = Math.random().toString(36).slice(2, 10).toUpperCase();
      return ctx.db.connection.create({
        data: {
          fromUserId: parent.id,
          toUserId: ctx.userId,
          tone: input.tone,
          intimacy: input.intimacy,
          cohabiting: input.cohabiting,
          responseChannel: input.responseChannel,
          inviteCode,
        },
      });
    }),

  acceptInvite: protectedProcedure
    .input(z.object({ inviteCode: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { inviteCode: input.inviteCode } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND', message: '초대 코드를 찾을 수 없습니다.' });
      return conn;
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.connection.findMany({
      where: {
        OR: [{ fromUserId: ctx.userId }, { toUserId: ctx.userId }],
      },
      include: {
        fromUser: { select: { id: true, name: true, avatarUrl: true } },
        toUser: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({
        where: { id: input.id },
        include: {
          fromUser: { select: { id: true, name: true, avatarUrl: true } },
          toUser: { select: { id: true, name: true, avatarUrl: true } },
        },
      });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return conn;
    }),

  updateSensitiveStatus: protectedProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['active', 'paused_health', 'deceased', 'memorial']),
    }))
    .mutation(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.id } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return ctx.db.connection.update({
        where: { id: input.id },
        data: { sensitiveStatus: input.status },
      });
    }),
});
