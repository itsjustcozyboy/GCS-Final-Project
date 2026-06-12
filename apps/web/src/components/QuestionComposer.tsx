'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

type Method = 'suggest' | 'keywords' | 'direct';

const PRIMARY = 'var(--color-primary)';

function KeywordInput({
  keywords,
  setKeywords,
  placeholder,
}: {
  keywords: string[];
  setKeywords: (k: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState('');

  function addKeyword() {
    const k = input.trim();
    if (k && !keywords.includes(k) && keywords.length < 8) {
      setKeywords([...keywords, k]);
    }
    setInput('');
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addKeyword();
            }
          }}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none"
          placeholder={placeholder}
        />
        <button
          onClick={addKeyword}
          className="px-4 py-2 rounded-xl border-2 text-sm font-medium"
          style={{ borderColor: PRIMARY, color: PRIMARY }}
        >
          추가
        </button>
      </div>
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#EFF7F2', color: 'var(--color-primary-dark)' }}
            >
              {k}
              <button onClick={() => setKeywords(keywords.filter((x) => x !== k))} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function QuestionComposer({
  connectionId,
  parentName,
  onClose,
  onSent,
}: {
  connectionId: string;
  parentName: string;
  onClose: () => void;
  onSent: () => void;
}) {
  const [method, setMethod] = useState<Method>('suggest');
  const [keywords, setKeywords] = useState<string[]>([]);
  // 확정 전 미리보기/수정 단계의 질문
  const [draft, setDraft] = useState<{ body: string; depth: number; chapterTag?: string; source: 'ai' | 'curated' | 'custom' } | null>(null);
  const [directText, setDirectText] = useState('');

  const suggestions = trpc.question.suggest.useQuery(
    { connectionId },
    { enabled: method === 'suggest', staleTime: 60_000 },
  );

  const generate = trpc.question.generateFromKeywords.useMutation({
    onSuccess: (data) => setDraft({ ...data, chapterTag: data.chapterTag ?? undefined }),
  });

  const send = trpc.question.sendCustom.useMutation({
    onSuccess: () => {
      onSent();
      onClose();
    },
  });

  function sendDraft(d: { body: string; depth: number; chapterTag?: string; source: 'ai' | 'curated' | 'custom' }) {
    send.mutate({
      connectionId,
      body: d.body,
      depth: d.depth,
      chapterTag: d.chapterTag,
      source: d.source,
    });
  }

  const METHODS: Array<{ value: Method; label: string }> = [
    { value: 'suggest', label: '✨ AI 추천' },
    { value: 'keywords', label: '🔑 키워드로' },
    { value: 'direct', label: '✍️ 직접 쓰기' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">오늘의 질문 보내기</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-500">{parentName}님께 어떤 질문을 보낼까요?</p>

        {/* 방법 선택 탭 */}
        <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 text-sm font-medium">
          {METHODS.map((m) => (
            <button
              key={m.value}
              onClick={() => {
                setMethod(m.value);
                setDraft(null);
              }}
              className="flex-1 px-2 py-2 rounded-lg transition-colors"
              style={method === m.value ? { backgroundColor: 'white', color: 'var(--color-primary-dark)', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' } : { color: '#9B9B9B' }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* (1) AI 추천 */}
        {method === 'suggest' && (
          <div className="space-y-2">
            {suggestions.isLoading ? (
              <div className="py-8 text-center text-gray-400 text-sm">질문을 고르고 있어요...</div>
            ) : (
              (suggestions.data ?? []).map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendDraft({ body: s.body, depth: s.depth, chapterTag: s.chapterTag ?? undefined, source: s.source })}
                  disabled={send.isPending}
                  className="w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md disabled:opacity-50"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <p className="text-sm text-gray-800 leading-relaxed">{s.body}</p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {s.source === 'ai' ? '✨ AI 추천' : '🌿 추천 질문'} · {s.chapterTag}
                  </p>
                </button>
              ))
            )}
            <button
              onClick={() => suggestions.refetch()}
              disabled={suggestions.isFetching}
              className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              {suggestions.isFetching ? '고르는 중...' : '🔄 다른 질문 보기'}
            </button>
          </div>
        )}

        {/* (2) 키워드 → AI 생성 */}
        {method === 'keywords' && (
          <div className="space-y-3">
            <KeywordInput
              keywords={keywords}
              setKeywords={setKeywords}
              placeholder="예) 자동차, 첫 직장, 신혼여행"
            />
            {!draft && (
              <button
                onClick={() => generate.mutate({ connectionId, keywords })}
                disabled={generate.isPending || keywords.length === 0}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
                style={{ backgroundColor: PRIMARY }}
              >
                {generate.isPending ? 'AI가 질문을 만들고 있어요...' : '✨ AI로 질문 만들기'}
              </button>
            )}
            {draft && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">만들어진 질문 (수정할 수 있어요)</p>
                <textarea
                  value={draft.body}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base resize-none focus:outline-none"
                  style={{ minHeight: '90px' }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => generate.mutate({ connectionId, keywords })}
                    disabled={generate.isPending}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-50"
                  >
                    {generate.isPending ? '생성 중...' : '다시 만들기'}
                  </button>
                  <button
                    onClick={() => draft.body.trim() && sendDraft(draft)}
                    disabled={send.isPending || !draft.body.trim()}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {send.isPending ? '보내는 중...' : '이 질문 보내기'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* (3) 직접 입력 */}
        {method === 'direct' && (
          <div className="space-y-3">
            <textarea
              value={directText}
              onChange={(e) => setDirectText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base resize-none focus:outline-none"
              style={{ minHeight: '110px' }}
              placeholder={`${parentName}님께 직접 묻고 싶은 질문을 적어보세요.\n예) 엄마는 내 나이 때 무슨 꿈이 있었어?`}
            />
            <button
              onClick={() => directText.trim() && sendDraft({ body: directText.trim(), depth: 2, source: 'custom' })}
              disabled={send.isPending || directText.trim().length < 2}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: PRIMARY }}
            >
              {send.isPending ? '보내는 중...' : '질문 보내기'}
            </button>
          </div>
        )}

        {send.isError && <p className="text-sm text-red-500">{send.error.message}</p>}
        {generate.isError && <p className="text-sm text-red-500">{generate.error.message}</p>}
        {send.data && !send.data.sent && (
          <p className="text-sm text-orange-500">⚠️ 현재 발송이 차단된 상태입니다</p>
        )}
      </div>
    </div>
  );
}

export { KeywordInput };
