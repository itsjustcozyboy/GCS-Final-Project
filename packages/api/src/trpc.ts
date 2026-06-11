import { initTRPC, TRPCError } from '@trpc/server';
import type { prisma as PrismaType } from '@maeum/db';
import { ZodError } from 'zod';

export interface Context {
  db: typeof PrismaType;
  userId?: string;
  sessionToken?: string;
}

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: '로그인이 필요합니다.' });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
