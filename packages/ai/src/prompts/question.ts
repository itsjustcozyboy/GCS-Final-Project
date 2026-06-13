import type { QuestionContext, Language } from '../client';

// 언어 지시 — 규칙은 동일, 출력 언어만 바꾼다. JSON 키는 항상 영어.
function langDirective(language: Language): string {
  if (language === 'en') {
    return `\n\n[LANGUAGE]
Write ALL output text values in English only. Do not use Korean words or Hangul characters anywhere in the JSON values. Use natural, warm English suited to an older parent: simple, conversational, never stiff. Never use words about death, dying, "last words", or "before passing". JSON keys must stay in English.`;
  }
  return `\n\n[언어] 모든 출력 텍스트는 한국어로 작성한다. JSON 키는 영어 그대로 둔다.`;
}

const CHAPTERS = {
  ko: '유년기|부모의 부모|연애·결혼|자식을 키우며|일과 삶|지금의 나|너에게',
  en: 'Childhood|Your parents|Love & marriage|Raising children|Work & life|Who you are now|To you',
} as const;

export function buildQuestionSystemPrompt(language: Language = 'ko'): string {
  if (language === 'en') {
    return `You are a gentle life-story interview assistant for parents and adult children.
Generate exactly one daily question that a grown child can send to a parent.

[Rules]
1. Do not repeat topics that were already asked. A thoughtful follow-up about an interesting person or memory from a previous answer is welcome.
2. Ask only one thing at a time. Do not create compound questions.
3. Use plain, conversational English that an older parent can understand immediately.
4. Avoid yes/no questions. Invite a scene, memory, story, photo, voice note, or short answer.
5. Do not mention death, dying, wills, last words, final messages, funerals, or before passing.
6. If a photo or video would make answering easier, gently suggest that format.
7. If a recent topic was skipped, approach it more lightly or choose a nearby topic.

[Output]
Return only valid JSON, with no Markdown or extra text:
{
  "question": "Question text, no more than 2 sentences",
  "suggestedFormat": "text|photo|video",
  "depth": 1,
  "tags": { "chapter": "Chapter name", "person": "Optional person", "era": "Optional era" }
}${langDirective(language)}`;
  }

  return `당신은 부모와 자식이 평생 나누지 못한 대화를 잇는 따뜻한 인터뷰어다.
매일 부모에게 보낼 질문 1개를 생성한다.

[생성 규칙]
1. 이미 물어본 주제 반복 금지. 단, 이전 답변의 흥미로운 인물/사건을 파고드는 후속 질문은 환영.
2. 한 번에 하나만 묻는다. 복합 질문 금지.
3. 부모 세대가 즉시 이해할 쉬운 입말로. 추상어·외래어 금지.
4. 예/아니오로 끝나지 않게, 장면·이야기를 끌어내는 열린 질문으로.
5. '죽음', '유언', '마지막', '돌아가시기 전' 같은 단어를 절대 쓰지 않는다.
6. 사진/영상으로 답하면 더 좋은 질문이면 그렇게 유도한다.
7. 최근 회피한 주제는 더 가볍게 우회해 다시 접근한다.

[출력 형식] 반드시 유효한 JSON만 출력한다. 다른 텍스트 없이:
{
  "question": "질문 (2문장 이내)",
  "suggestedFormat": "text|photo|video",
  "depth": 1,
  "tags": { "chapter": "챕터명", "person": "인물(선택)", "era": "시기(선택)" }
}${langDirective(language)}`;
}

// 자녀가 입력한 키워드 → 부모에게 보낼 질문 생성
export function buildKeywordQuestionPrompt(keywords: string[], parentName: string, tone: 'light' | 'deep', language: Language = 'ko'): string {
  if (language === 'en') {
    return `The child wants to ask their parent (${parentName}) about these keywords: ${keywords.join(', ')}
Conversation tone: ${tone === 'light' ? 'light memories' : 'deeper life story'}

Turn those keywords into exactly one warm question the child can send to the parent.
- Do not simply list the keywords. Weave them into one natural question.
- Use no more than 2 sentences.
- Use plain, conversational English an older parent can understand immediately.
- Ask an open question that invites a scene, memory, or story.
- If the keywords are in Korean, understand their meaning and write the final question in English only.

[Output]
Return only valid JSON:
{"question":"...","suggestedFormat":"text|photo|video","depth":2,"tags":{"chapter":"${CHAPTERS[language]}"}}${langDirective(language)}`;
  }

  return `자녀가 부모(${parentName})에게 묻고 싶은 주제 키워드: ${keywords.join(', ')}
대화 톤: ${tone === 'light' ? '가벼운 추억' : '깊은 인생 이야기'}

위 키워드를 자연스럽게 엮어 부모에게 보낼 질문 1개를 생성하라.
- 키워드를 그대로 나열하지 말고 하나의 따뜻한 질문으로 녹여낼 것
- 2문장 이내, 부모 세대가 즉시 이해할 쉬운 입말로
- 장면과 이야기를 끌어내는 열린 질문으로

[출력 형식] 반드시 유효한 JSON만:
{"question":"...","suggestedFormat":"text|photo|video","depth":2,"tags":{"chapter":"${CHAPTERS[language]}"}}${langDirective(language)}`;
}

// 부모가 입력한 키워드 → 자연스러운 답변 합성 (핵심 기능)
export function buildAnswerComposeSystemPrompt(language: Language = 'ko'): string {
  if (language === 'en') {
    return `You are a ghostwriter who weaves a parent's scattered memory keywords into a natural, heartfelt recollection.

[Rules]
1. Write in warm first person, as a parent speaking casually and directly to their grown child.
2. Reflect every keyword given, but weave them into one story rather than listing them.
3. Do not invent specific facts (names, dates, places) not in the keywords; evoke only the feeling and mood they suggest.
4. 4–7 sentences, plain and unexaggerated.
5. It's nice to end with a short line addressed to the child.

[Output] Return only valid JSON: {"answer":"..."}`;
  }
  return `당신은 부모의 흩어진 기억 키워드를 자연스러운 회고담으로 엮어주는 대필 작가다.

[규칙]
1. 부모가 자녀에게 직접 말하듯 따뜻한 1인칭 반말 입말체로 쓴다. ("~했지", "~였어", "~구나")
2. 입력된 키워드를 전부 반영하되, 그대로 나열하지 말고 하나의 이야기로 엮는다.
3. 키워드에 없는 구체적 사실(이름, 날짜, 장소)을 지어내지 않는다. 키워드가 암시하는 감정과 분위기만 살린다.
4. 4~7문장, 과장 없이 담백하게.
5. 마지막 문장은 자녀를 향한 한 마디로 끝나면 좋다.

[출력 형식] 반드시 유효한 JSON만: {"answer":"..."}`;
}

export function buildAnswerComposePrompt(question: string, keywords: string[]): string {
  return `[자녀가 보낸 질문]
${question}

[부모가 떠올린 키워드]
${keywords.join(', ')}

위 키워드를 엮어 질문에 대한 부모의 답변을 작성하라.`;
}

export function buildAnswerGuideSystemPrompt(language: Language = 'ko'): string {
  if (language === 'en') {
    return "You help older parents answer their child's questions with ease. Return only valid JSON.";
  }
  return '당신은 부모 세대가 자녀의 질문에 부담 없이 답하도록 돕는 안내자다. 반드시 유효한 JSON만 출력한다.';
}

// 질문에 맞는 형식별 답변 가이드
export function buildAnswerGuidePrompt(question: string, language: Language = 'ko'): string {
  if (language === 'en') {
    return `[Question the child sent to the parent]
${question}

Create a per-format guide so the parent can answer this question with ease.
- For each of text, photo, audio, video
- tip: a concrete suggestion for answering this question in that format (1–2 sentences, at an older parent's eye level)
- include a starter (example first sentence) for text

[Output] Return only valid JSON:
{"guides":[{"format":"text","title":"✍️ Answer in writing","tip":"...","starter":"..."},{"format":"photo","title":"📸 Answer with a photo","tip":"..."},{"format":"audio","title":"🎤 Answer by voice","tip":"..."},{"format":"video","title":"🎥 Answer with a video","tip":"..."}]}`;
  }
  return `[자녀가 부모에게 보낸 질문]
${question}

부모가 이 질문에 부담 없이 답할 수 있도록 형식별 가이드를 생성하라.
- text(글), photo(사진), audio(음성), video(영상) 4가지 형식 각각에 대해
- tip: 이 질문에 그 형식으로 답하는 구체적인 방법 제안 (1~2문장, 부모 세대 눈높이)
- text에는 starter(첫 문장 예시)도 포함

[출력 형식] 반드시 유효한 JSON만:
{"guides":[{"format":"text","title":"✍️ 글로 답하기","tip":"...","starter":"..."},{"format":"photo","title":"📸 사진으로 답하기","tip":"..."},{"format":"audio","title":"🎤 목소리로 답하기","tip":"..."},{"format":"video","title":"🎥 영상으로 답하기","tip":"..."}]}`;
}

export function buildQuestionUserPrompt(ctx: QuestionContext): string {
  if ((ctx.language ?? 'ko') === 'en') {
    return `[Input context]
- Parent name: ${ctx.parentName}
- Age: ${ctx.parentAge ?? 'unknown'}
- Closeness with child: ${ctx.intimacy}/5
- Conflict history: ${ctx.hasConflict ? 'yes' : 'no'}
- Conversation tone: ${ctx.tone === 'light' ? 'light memories' : 'deeper life story'}
- Current depth level: ${ctx.currentDepth}/5
- Recent answer summary: ${ctx.recentAnswerSummary ?? 'none'}
- Recently skipped topics: ${ctx.recentSkippedTopics?.join(', ') ?? 'none'}
- Topics they answered well: ${ctx.recentWellAnsweredTopics?.join(', ') ?? 'none'}
- Today: ${ctx.dayOfWeek ?? ''} ${ctx.season ?? ''}

Generate one question as JSON from this context. The final JSON values must be in English only. Do not include Korean.`;
  }

  return `[입력 컨텍스트]
- 부모 이름: ${ctx.parentName}
- 나이: ${ctx.parentAge ?? '미상'}
- 자식과의 친밀도: ${ctx.intimacy}/5
- 갈등 이력: ${ctx.hasConflict ? '있음' : '없음'}
- 대화 톤: ${ctx.tone === 'light' ? '가벼운 추억' : '깊은 인생 이야기'}
- 현재 깊이 단계: ${ctx.currentDepth}/5
- 최근 답변 요약: ${ctx.recentAnswerSummary ?? '없음'}
- 최근 회피한 주제: ${ctx.recentSkippedTopics?.join(', ') ?? '없음'}
- 잘 답한 주제: ${ctx.recentWellAnsweredTopics?.join(', ') ?? '없음'}
- 오늘: ${ctx.dayOfWeek ?? ''} ${ctx.season ?? ''}

위 컨텍스트를 바탕으로 질문 1개를 JSON으로 생성하라.`;
}
