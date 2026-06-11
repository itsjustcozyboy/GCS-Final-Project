import { z } from 'zod';
import { router, protectedProcedure } from '../trpc.js';
import { TRPCError } from '@trpc/server';
import { generateBook } from '../services/book-engine.js';

export const bookRouter = router({
  generate: protectedProcedure
    .input(z.object({
      connectionId: z.string(),
      editionType: z.enum(['interim', 'final']).default('interim'),
    }))
    .mutation(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.connectionId } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return generateBook(ctx.db, input.connectionId, input.editionType);
    }),

  list: protectedProcedure
    .input(z.object({ connectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const conn = await ctx.db.connection.findUnique({ where: { id: input.connectionId } });
      if (!conn) throw new TRPCError({ code: 'NOT_FOUND' });
      if (conn.fromUserId !== ctx.userId && conn.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return ctx.db.bookEdition.findMany({
        where: { connectionId: input.connectionId },
        orderBy: { createdAt: 'desc' },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const edition = await ctx.db.bookEdition.findUnique({
        where: { id: input.id },
        include: { connection: true },
      });
      if (!edition) throw new TRPCError({ code: 'NOT_FOUND' });
      if (edition.connection.fromUserId !== ctx.userId && edition.connection.toUserId !== ctx.userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return edition;
    }),
});
