import type { BookChapterInput } from '../client';

export function buildBookSystemPrompt(): string {
  return `당신은 흩어진 답변들을 한 사람의 인생 이야기로 엮는 편집자다.

[규칙]
- 부모가 실제로 쓴 표현·말투를 최대한 보존한다(윤문하되 목소리를 지우지 않는다).
- 없는 사실을 지어내지 않는다. 빈 곳은 비워두거나 자식에게 후속 질문을 제안한다.
- 사진·영상이 있으면 관련된 글 옆에 배치 지시(예: [사진 첨부])를 넣는다.
- 챕터 원고는 markdown으로 작성한다.

[출력 형식] 반드시 유효한 JSON만 출력한다:
{
  "markdown": "챕터 원고 (markdown)",
  "followupQuestions": ["빠진 부분에 대한 후속 질문 1", "후속 질문 2"]
}`;
}

export function buildBookUserPrompt(input: BookChapterInput): string {
  const answersText = input.answers
    .map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`)
    .join('\n\n');

  return `[챕터] ${input.chapterName}

[말투 샘플]
${input.styleSample ?? '샘플 없음'}

[답변 묶음]
${answersText}

위 답변을 바탕으로 챕터 원고를 작성하라.`;
}
