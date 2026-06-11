export * from './trpc.js';
export * from './routers/auth.js';
export * from './routers/connection.js';
export * from './routers/question.js';
export * from './routers/answer.js';
export * from './routers/reaction.js';
export * from './routers/book.js';
export * from './services/question-engine.js';
export * from './services/book-engine.js';

import { router } from './trpc.js';
import { authRouter } from './routers/auth.js';
import { connectionRouter } from './routers/connection.js';
import { questionRouter } from './routers/question.js';
import { answerRouter } from './routers/answer.js';
import { reactionRouter } from './routers/reaction.js';
import { bookRouter } from './routers/book.js';

export const appRouter = router({
  auth: authRouter,
  connection: connectionRouter,
  question: questionRouter,
  answer: answerRouter,
  reaction: reactionRouter,
  book: bookRouter,
});

export type AppRouter = typeof appRouter;
