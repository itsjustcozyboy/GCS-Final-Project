import Anthropic from '@anthropic-ai/sdk';
import type { AIClient, QuestionContext, QuestionOutput, BookChapterInput, BookChapterOutput } from './client.js';
import { buildQuestionSystemPrompt, buildQuestionUserPrompt } from './prompts/question.js';
import { buildBookSystemPrompt, buildBookUserPrompt } from './prompts/book.js';
import { MockAIClient } from './mock.js';

export class AnthropicAIClient implements AIClient {
  private client: Anthropic;
  private model = 'claude-sonnet-4-6';
  private fallback = new MockAIClient();

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateQuestion(ctx: QuestionContext): Promise<QuestionOutput> {
    try {
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 512,
        system: buildQuestionSystemPrompt(),
        messages: [{ role: 'user', content: buildQuestionUserPrompt(ctx) }],
      });

      const text = message.content[0].type === 'text' ? message.content[0].text : '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('JSON 파싱 실패');
      return JSON.parse(jsonMatch[0]) as QuestionOutput;
    } catch (e) {
      console.error('[AnthropicAI] generateQuestion 오류, Mock 폴백:', e);
      return this.fallback.generateQuestion(ctx);
    }
  }

  async editBookChapter(input: BookChapterInput): Promise<BookChapterOutput> {
    try {
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 4096,
        system: buildBookSystemPrompt(),
        messages: [{ role: 'user', content: buildBookUserPrompt(input) }],
      });

      const text = message.content[0].type === 'text' ? message.content[0].text : '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('JSON 파싱 실패');
      return JSON.parse(jsonMatch[0]) as BookChapterOutput;
    } catch (e) {
      console.error('[AnthropicAI] editBookChapter 오류, Mock 폴백:', e);
      return this.fallback.editBookChapter(input);
    }
  }
}
