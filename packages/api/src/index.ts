export * from './trpc';
export * from './routers/auth';
export * from './routers/admin';
export * from './routers/connection';
export * from './routers/question';
export * from './routers/answer';
export * from './routers/reaction';
export * from './routers/message';
export * from './routers/book';
export * from './routers/tracking';
export * from './services/question-engine';
export * from './services/book-engine';

import { router } from './trpc';
import { authRouter } from './routers/auth';
import { adminRouter } from './routers/admin';
import { connectionRouter } from './routers/connection';
import { questionRouter } from './routers/question';
import { answerRouter } from './routers/answer';
import { reactionRouter } from './routers/reaction';
import { messageRouter } from './routers/message';
import { bookRouter } from './routers/book';
import { trackingRouter } from './routers/tracking';

export const appRouter = router({
  auth: authRouter,
  admin: adminRouter,
  connection: connectionRouter,
  question: questionRouter,
  answer: answerRouter,
  reaction: reactionRouter,
  message: messageRouter,
  book: bookRouter,
  tracking: trackingRouter,
});

export type AppRouter = typeof appRouter;
