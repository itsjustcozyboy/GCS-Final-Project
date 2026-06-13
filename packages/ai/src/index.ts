export * from './client';
export * from './mock';
export * from './anthropic';
export * from './gemini';
export * from './prompts/question';
export * from './prompts/book';

import { GeminiAIClient } from './gemini';
import { AnthropicAIClient } from './anthropic';
import { MockAIClient } from './mock';
import type { AIClient } from './client';

// 키는 서버 전용. Gemini → Anthropic → Mock 순으로 폴백한다.
// 어떤 키도 없으면 Mock으로 떨어져 로컬에서 키 없이 전체 플로우가 끝까지 돈다.
export function createAIClient(): AIClient {
  const geminiKey = process.env.GOOGLE_AI_API_KEY ?? process.env.GEMINI_API_KEY ?? '';
  if (geminiKey) return new GeminiAIClient(geminiKey);

  const anthropicKey = process.env.ANTHROPIC_API_KEY ?? '';
  if (anthropicKey) return new AnthropicAIClient(anthropicKey);

  console.warn('[AI] AI 키 미설정 (GOOGLE_AI_API_KEY/GEMINI_API_KEY/ANTHROPIC_API_KEY) → MockAIClient 사용');
  return new MockAIClient();
}
