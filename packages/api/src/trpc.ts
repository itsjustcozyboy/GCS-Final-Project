import { initTRPC, TRPCError } from '@trpc/server';
import type { prisma as PrismaType } from '@maeum/db';
import { ZodError } from 'zod';
import { translate, defaultLocale, type Locale } from '@maeum/i18n';

export interface Context {
  db: typeof PrismaType;
  userId?: string;
  sessionToken?: string;
  clientIp?: string;
  clientUserAgent?: string;
  anonymousId?: string; // 미들웨어가 발급한 익명 방문자 쿠키 (비식별)
  locale?: Locale; // maeum_locale 쿠키 기반 — 서버 메시지 현지화에 사용
}

// 서버에서 던지는 사용자 노출 메시지를 ctx.locale에 맞춰 번역 (errors 네임스페이스)
export function tErr(ctx: { locale?: Locale }, key: string): string {
  return translate(ctx.locale ?? defaultLocale, 'errors', key);
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
    throw new TRPCError({ code: 'UNAUTHORIZED', message: tErr(ctx, 'loginRequired') });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
