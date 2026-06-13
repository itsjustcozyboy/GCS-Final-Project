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
  buildAnswerGuideSystemPrompt,
  buildAnswerGuidePrompt,
} from './prompts/question';
import { buildBookSystemPrompt, buildBookUserPrompt } from './prompts/book';
import { MockAIClient } from './mock';

// 서버 전용 — Gemini 2.5 Flash (Generative Language API, REST)
// API 키는 절대 클라이언트로 나가지 않는다. 호출 실패·한도 초과(429) 시 Mock으로 폴백해
// 키워드 원문을 보존한 채 로컬/운영 모두에서 흐름이 끊기지 않게 한다.
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

export class RateLimitError extends Error {
  constructor(message = 'AI 요청 한도를 잠시 초과했어요.') {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class GeminiAIClient implements AIClient {
  private apiKey: string;
  private model = 'gemini-2.5-flash';
  private fallback = new MockAIClient();

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Gemini는 별도 STT 엔드포인트가 아닌 멀티모달로 가능하나, 현재는 Mock 위임.
  // TODO: 오디오 파트(inline_data/file) 기반 자동 전사 연동
  async transcribeAudio(input: Parameters<AIClient['transcribeAudio']>[0]) {
    return this.fallback.transcribeAudio(input);
  }

  // 단일 텍스트 생성 호출. system + user 프롬프트로 호출하고 본문 텍스트를 반환한다.
  private async generate(system: string, user: string, maxOutputTokens: number, asJson: boolean): Promise<string> {
    const res = await fetch(`${ENDPOINT}/${this.model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens,
          // 2.5 Flash는 기본적으로 '생각(thinking)'에 토큰을 써서 maxOutputTokens를 잠식 →
          // 짧은 구조화 출력이 잘려 JSON 파싱이 실패할 수 있다. 이 작업들은 추론이 아닌
          // 지시 기반 생성이므로 thinking을 끈다(빠르고 저렴, 출력 예산 보존).
          thinkingConfig: { thinkingBudget: 0 },
          ...(asJson ? { responseMimeType: 'application/json' } : {}),
        },
      }),
    });

    if (res.status === 429) throw new RateLimitError();
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Gemini ${res.status}: ${body.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
    if (!text.trim()) throw new Error('Gemini 빈 응답');
    return text;
  }

  // 코드펜스·여분 텍스트를 제거하고 첫 JSON 객체를 안전하게 파싱. 실패 시 1회 재시도.
  private parseJson<T>(text: string): T {
    const cleaned = text.replace(/```(?:json)?/gi, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('JSON 파싱 실패');
    return JSON.parse(match[0]) as T;
  }

  private async jsonRequest<T>(system: string, user: string, maxTokens: number): Promise<T> {
    try {
      return this.parseJson<T>(await this.generate(system, user, maxTokens, true));
    } catch (e) {
      if (e instanceof RateLimitError) throw e;
      // 파싱·일시 오류는 1회 재시도
      return this.parseJson<T>(await this.generate(system, user, maxTokens, true));
    }
  }

  async generateQuestion(ctx: QuestionContext): Promise<QuestionOutput> {
    try {
      return await this.jsonRequest<QuestionOutput>(
        buildQuestionSystemPrompt(ctx.language ?? 'ko'),
        buildQuestionUserPrompt(ctx),
        512,
      );
    } catch (e) {
      console.error('[GeminiAI] generateQuestion 오류, Mock 폴백:', e);
      return this.fallback.generateQuestion(ctx);
    }
  }

  async generateQuestionFromKeywords(input: QuestionFromKeywordsInput): Promise<QuestionOutput> {
    try {
      return await this.jsonRequest<QuestionOutput>(
        buildQuestionSystemPrompt(input.language ?? 'ko'),
        buildKeywordQuestionPrompt(input.keywords, input.parentName, input.tone, input.language ?? 'ko'),
        512,
      );
    } catch (e) {
      console.error('[GeminiAI] generateQuestionFromKeywords 오류, Mock 폴백:', e);
      return this.fallback.generateQuestionFromKeywords(input);
    }
  }

  async composeAnswerFromKeywords(input: AnswerFromKeywordsInput): Promise<AnswerFromKeywordsOutput> {
    try {
      return await this.jsonRequest<AnswerFromKeywordsOutput>(
        buildAnswerComposeSystemPrompt(input.language ?? 'ko'),
        buildAnswerComposePrompt(input.question, input.keywords),
        1024,
      );
    } catch (e) {
      // 한도 초과는 호출부에서 사용자에게 쉬운 말로 안내하고 키워드를 보존해 재시도하도록 그대로 던진다.
      if (e instanceof RateLimitError) throw e;
      console.error('[GeminiAI] composeAnswerFromKeywords 오류, Mock 폴백:', e);
      return this.fallback.composeAnswerFromKeywords(input);
    }
  }

  async suggestAnswerGuide(input: AnswerGuideInput): Promise<AnswerGuideOutput> {
    try {
      const language = input.language ?? 'ko';
      return await this.jsonRequest<AnswerGuideOutput>(
        buildAnswerGuideSystemPrompt(language),
        buildAnswerGuidePrompt(input.question, language),
        1024,
      );
    } catch (e) {
      console.error('[GeminiAI] suggestAnswerGuide 오류, Mock 폴백:', e);
      return this.fallback.suggestAnswerGuide(input);
    }
  }

  async editBookChapter(input: BookChapterInput): Promise<BookChapterOutput> {
    try {
      return await this.jsonRequest<BookChapterOutput>(
        buildBookSystemPrompt(input.language ?? 'ko'),
        buildBookUserPrompt(input),
        4096,
      );
    } catch (e) {
      console.error('[GeminiAI] editBookChapter 오류, Mock 폴백:', e);
      return this.fallback.editBookChapter(input);
    }
  }
}
