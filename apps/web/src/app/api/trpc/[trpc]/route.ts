import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, type Context } from '@maeum/api';
import { prisma } from '@maeum/db';
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

  return { db: prisma, userId, sessionToken };
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
