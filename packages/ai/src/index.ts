export * from './client';
export * from './mock';
export * from './anthropic';
export * from './prompts/question';
export * from './prompts/book';

import { AnthropicAIClient } from './anthropic';
import { MockAIClient } from './mock';
import type { AIClient } from './client';

export function createAIClient(): AIClient {
  const apiKey = process.env.ANTHROPIC_API_KEY ?? '';
  if (apiKey) return new AnthropicAIClient(apiKey);
  console.warn('[AI] ANTHROPIC_API_KEY 미설정 → MockAIClient 사용');
  return new MockAIClient();
}
