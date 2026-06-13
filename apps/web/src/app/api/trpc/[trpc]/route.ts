import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, type Context } from '@maeum/api';
import { prisma } from '@maeum/db';
import { resolveLocale, LOCALE_COOKIE } from '@maeum/i18n';
import type { NextRequest } from 'next/server';

async function createContext(req: NextRequest): Promise<Context> {
  let userId: string | undefined;
  let sessionToken: string | undefined;

  const authHeader = req.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    sessionToken = authHeader.slice(7);
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
    });
    if (session && session.expiresAt > new Date()) {
      userId = session.userId;
    }
  }

  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    undefined;
  const clientUserAgent = req.headers.get('user-agent') ?? undefined;

  // 미들웨어가 발급한 익명 방문자 쿠키 (httpOnly이라 클라이언트는 못 읽지만 요청에 자동 포함됨)
  const anonymousId = req.cookies.get('maeum_aid')?.value;
  const locale = resolveLocale({
    cookie: req.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: req.headers.get('accept-language'),
  });

  return { db: prisma, userId, sessionToken, clientIp, clientUserAgent, anonymousId, locale };
}

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => console.error(`tRPC error on ${path}:`, error)
        : undefined,
  });
}

export { handler as GET, handler as POST };
