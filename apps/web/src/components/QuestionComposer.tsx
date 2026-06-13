'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';

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
  const { t: tc } = useTranslation('common');
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
          {tc('actions.add')}
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
  const { t } = useTranslation('today');
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

  const METHODS: Array<{ value: Method; labelKey: string }> = [
    { value: 'suggest', labelKey: 'question.tab.suggest' },
    { value: 'keywords', labelKey: 'question.tab.keywords' },
    { value: 'direct', labelKey: 'question.tab.direct' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{t('question.title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-500">{t('question.to', { name: parentName })}</p>

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
              {t(m.labelKey)}
            </button>
          ))}
        </div>

        {/* (1) AI 추천 */}
        {method === 'suggest' && (
          <div className="space-y-2">
            {suggestions.isLoading ? (
              <div className="py-8 text-center text-gray-400 text-sm">{t('question.picking')}</div>
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
                    {s.source === 'ai' ? t('question.sourceAi') : t('question.sourceCurated')} · {s.chapterTag}
                  </p>
                </button>
              ))
            )}
            <button
              onClick={() => suggestions.refetch()}
              disabled={suggestions.isFetching}
              className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              {suggestions.isFetching ? t('question.refetching') : t('question.refetch')}
            </button>
          </div>
        )}

        {/* (2) 키워드 → AI 생성 */}
        {method === 'keywords' && (
          <div className="space-y-3">
            <KeywordInput
              keywords={keywords}
              setKeywords={setKeywords}
              placeholder={t('question.keywordPlaceholder')}
            />
            {!draft && (
              <button
                onClick={() => generate.mutate({ connectionId, keywords })}
                disabled={generate.isPending || keywords.length === 0}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
                style={{ backgroundColor: PRIMARY }}
              >
                {generate.isPending ? t('question.generating') : t('question.makeWithAi')}
              </button>
            )}
            {draft && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">{t('question.madeQuestion')}</p>
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
                    {generate.isPending ? t('question.remaking') : t('question.remake')}
                  </button>
                  <button
                    onClick={() => draft.body.trim() && sendDraft(draft)}
                    disabled={send.isPending || !draft.body.trim()}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {send.isPending ? t('question.sending') : t('question.sendThis')}
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
              placeholder={t('question.directPlaceholder', { name: parentName })}
            />
            <button
              onClick={() => directText.trim() && sendDraft({ body: directText.trim(), depth: 2, source: 'custom' })}
              disabled={send.isPending || directText.trim().length < 2}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: PRIMARY }}
            >
              {send.isPending ? t('question.sending') : t('question.sendQuestion')}
            </button>
          </div>
        )}

        {send.isError && <p className="text-sm text-red-500">{send.error.message}</p>}
        {generate.isError && <p className="text-sm text-red-500">{generate.error.message}</p>}
        {send.data && !send.data.sent && (
          <p className="text-sm text-orange-500">{t('question.blocked')}</p>
        )}
      </div>
    </div>
  );
}

export { KeywordInput };
