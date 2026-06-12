import { z } from 'zod';
import { router, protectedProcedure, type Context } from '../trpc';
import { TRPCError } from '@trpc/server';
import { randomInt } from 'crypto';

const INVITE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ONLINE_WINDOW_MS = 2 * 60 * 1000;

function normalizeInviteCode(code: string) {
  return code.replace(/[\s-]/g, '').toUpperCase();
}

function makeInviteCode() {
  let code = '';
  for (let i = 0; i < 8; i += 1) {
    code += INVITE_ALPHABET[randomInt(INVITE_ALPHABET.length)];
  }
  return code;
}

async function createUniqueInviteCode(db: Context['db']) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = makeInviteCode();
    const existing = await db.connectionInvite.findUnique({ where: { code }, select: { id: true } });
    if (!existing) return code;
  }
  throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: '초대 코드를 생성하지 못했습니다.' });
}

function withOnlineStatus<T extends { lastSeenAt: Date | null }>(user: T) {
  return {
    ...user,
    isOnline: !!user.lastSeenAt && Date.now() - user.lastSeenAt.getTime() <= ONLINE_WINDOW_MS,
  };
}

export const connectionRouter = router({
  createInvite: protectedProcedure
    .input(z.object({
      tone: z.enum(['light', 'deep']).default('light'),
      intimacy: z.number().int().min(1).max(5).default(3),
      cohabiting: z.boolean().default(false),
      responseChannel: z.enum(['app', 'kakao', 'sms']).default('app'),
      regenerate: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const { regenerate, ...inviteData } = input;
      const me = await ctx.db.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true },
      });
      if (!me) throw new TRPCError({ code: 'NOT_FOUND' });
      if (me.role === 'parent') {
        throw new TRPCError({ code: 'FORBIDDEN', message: '자녀 계정에서 초대 코드를 만들 수 있습니다.' });
      }

      const existingInvite = await ctx.db.connectionInvite.findFirst({
        where: { childId: ctx.userId, acceptedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      if (existingInvite) {
        return ctx.db.connectionInvite.update({
          where: { id: existingInvite.id },
          data: {
            ...inviteData,
            ...(regenerate ? { code: await createUniqueInviteCode(ctx.db) } : {}),
          },
          include: { child: { select: { id: true, name: true } } },
        });
      }

      return ctx.db.connectionInvite.create({
        data: {
          ...inviteData,
          childId: ctx.userId,
          code: await createUniqueInviteCode(ctx.db),
        },
        include: { child: { select: { id: true, name: true } } },
      });
    }),

  acceptInvite: protectedProcedure
    .input(z.object({ inviteCode: z.string().min(4).max(24) }))
    .mutation(async ({ ctx, input }) => {
      const code = normalizeInviteCode(input.inviteCode);
      const invite = await ctx.db.connectionInvite.findUnique({
        where: { code },
        include: { child: { select: { id: true, name: true } } },
      });
      if (!invite) throw new TRPCError({ code: 'NOT_FOUND', message: '초대 코드를 찾을 수 없습니다.' });
      if (invite.childId === ctx.userId) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: '본인이 만든 초대 코드는 직접 입력할 수 없습니다.' });
      }
      if (invite.acceptedAt && invite.connectionId) {
        const conn = await ctx.db.connection.findUnique({
          where: { id: invite.connectionId },
          include: {
            fromUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
            toUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
          },
        });
        if (conn && (conn.fromUserId === ctx.userId || conn.toUserId === ctx.userId)) {
          return {
            ...conn,
            fromUser: withOnlineStatus(conn.fromUser),
            toUser: withOnlineStatus(conn.toUser),
          };
        }
        throw new TRPCError({ code: 'CONFLICT', message: '이미 사용된 초대 코드입니다.' });
      }

      const conn = await ctx.db.$transaction(async (tx) => {
        const claimed = await tx.connectionInvite.updateMany({
          where: { id: invite.id, acceptedAt: null },
          data: {
            acceptedById: ctx.userId,
            acceptedAt: new Date(),
          },
        });
        if (claimed.count !== 1) {
          throw new TRPCError({ code: 'CONFLICT', message: '이미 사용된 초대 코드입니다.' });
        }

        const existing = await tx.connection.findFirst({
          where: {
            OR: [
              { fromUserId: ctx.userId, toUserId: invite.childId },
              { fromUserId: invite.childId, toUserId: ctx.userId },
            ],
          },
        });

        const connection = existing ?? await tx.connection.create({
          data: {
            fromUserId: ctx.userId,
            toUserId: invite.childId,
            tone: invite.tone,
            intimacy: invite.intimacy,
            cohabiting: invite.cohabiting,
            responseChannel: invite.responseChannel,
            inviteCode: invite.code,
          },
        });

        await tx.connectionInvite.update({
          where: { id: invite.id },
          data: { connectionId: connection.id },
        });

        return tx.connection.findUniqueOrThrow({
          where: { id: connection.id },
          include: {
            fromUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
            toUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
          },
        });
      });

      return {
        ...conn,
        fromUser: withOnlineStatus(conn.fromUser),
        toUser: withOnlineStatus(conn.toUser),
      };
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const connections = await ctx.db.connection.findMany({
      where: {
        OR: [{ fromUserId: ctx.userId }, { toUserId: ctx.userId }],
      },
      include: {
        fromUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
        toUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return connections.map((conn) => ({
      ...conn,
      fromUser: withOnlineStatus(conn.fromUser),
      toUser: withOnlineStatus(conn.toUser),
    }));
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({
        where: { id: input.id },
        include: {
          fromUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
          toUser: { select: { id: true, name: true, avatarUrl: true, lastSeenAt: true } },
        },
      });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return {
        ...conn,
        fromUser: withOnlineStatus(conn.fromUser),
        toUser: withOnlineStatus(conn.toUser),
      };
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
