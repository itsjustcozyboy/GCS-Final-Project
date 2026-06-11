export * from './trpc';
export * from './routers/auth';
export * from './routers/connection';
export * from './routers/question';
export * from './routers/answer';
export * from './routers/reaction';
export * from './routers/book';
export * from './services/question-engine';
export * from './services/book-engine';

import { router } from './trpc';
import { authRouter } from './routers/auth';
import { connectionRouter } from './routers/connection';
import { questionRouter } from './routers/question';
import { answerRouter } from './routers/answer';
import { reactionRouter } from './routers/reaction';
import { bookRouter } from './routers/book';

export const appRouter = router({
  auth: authRouter,
  connection: connectionRouter,
  question: questionRouter,
  answer: answerRouter,
  reaction: reactionRouter,
  book: bookRouter,
});

export type AppRouter = typeof appRouter;
