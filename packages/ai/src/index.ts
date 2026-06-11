export * from './client.js';
export * from './mock.js';
export * from './anthropic.js';
export * from './prompts/question.js';
export * from './prompts/book.js';

import { AnthropicAIClient } from './anthropic.js';
import { MockAIClient } from './mock.js';
import type { AIClient } from './client.js';

export function createAIClient(): AIClient {
  const apiKey = process.env.ANTHROPIC_API_KEY ?? '';
  if (apiKey) return new AnthropicAIClient(apiKey);
  console.warn('[AI] ANTHROPIC_API_KEY 미설정 → MockAIClient 사용');
  return new MockAIClient();
}
