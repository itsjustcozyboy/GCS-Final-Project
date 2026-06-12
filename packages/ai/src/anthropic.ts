import Anthropic from '@anthropic-ai/sdk';
import type {
  AIClient,
  QuestionContext,
  QuestionOutput,
  BookChapterInput,
  BookChapterOutput,
  QuestionFromKeywordsInput,
  AnswerFromKeywordsInput,
  AnswerFromKeywordsOutput,
  AnswerGuideInput,
  AnswerGuideOutput,
} from './client';
import {
  buildQuestionSystemPrompt,
  buildQuestionUserPrompt,
  buildKeywordQuestionPrompt,
  buildAnswerComposeSystemPrompt,
  buildAnswerComposePrompt,
  buildAnswerGuidePrompt,
} from './prompts/question';
import { buildBookSystemPrompt, buildBookUserPrompt } from './prompts/book';
import { MockAIClient } from './mock';

export class AnthropicAIClient implements AIClient {
  private client: Anthropic;
  private model = 'claude-sonnet-4-6';
  private fallback = new MockAIClient();

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  // Claude API는 STT를 제공하지 않으므로 Mock으로 위임
  // TODO: 실제 음성 전사 엔진(예: OpenAI Whisper, Google STT) 연동
  async transcribeAudio(input: Parameters<AIClient['transcribeAudio']>[0]) {
    return this.fallback.transcribeAudio(input);
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

  private async jsonRequest<T>(system: string, user: string, maxTokens = 1024): Promise<T> {
    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    });
    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON 파싱 실패');
    return JSON.parse(jsonMatch[0]) as T;
  }

  async generateQuestionFromKeywords(input: QuestionFromKeywordsInput): Promise<QuestionOutput> {
    try {
      return await this.jsonRequest<QuestionOutput>(
        buildQuestionSystemPrompt(),
        buildKeywordQuestionPrompt(input.keywords, input.parentName, input.tone),
        512,
      );
    } catch (e) {
      console.error('[AnthropicAI] generateQuestionFromKeywords 오류, Mock 폴백:', e);
      return this.fallback.generateQuestionFromKeywords(input);
    }
  }

  async composeAnswerFromKeywords(input: AnswerFromKeywordsInput): Promise<AnswerFromKeywordsOutput> {
    try {
      return await this.jsonRequest<AnswerFromKeywordsOutput>(
        buildAnswerComposeSystemPrompt(),
        buildAnswerComposePrompt(input.question, input.keywords),
        1024,
      );
    } catch (e) {
      console.error('[AnthropicAI] composeAnswerFromKeywords 오류, Mock 폴백:', e);
      return this.fallback.composeAnswerFromKeywords(input);
    }
  }

  async suggestAnswerGuide(input: AnswerGuideInput): Promise<AnswerGuideOutput> {
    try {
      return await this.jsonRequest<AnswerGuideOutput>(
        '당신은 부모 세대가 자녀의 질문에 부담 없이 답하도록 돕는 안내자다. 반드시 유효한 JSON만 출력한다.',
        buildAnswerGuidePrompt(input.question),
        1024,
      );
    } catch (e) {
      console.error('[AnthropicAI] suggestAnswerGuide 오류, Mock 폴백:', e);
      return this.fallback.suggestAnswerGuide(input);
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
