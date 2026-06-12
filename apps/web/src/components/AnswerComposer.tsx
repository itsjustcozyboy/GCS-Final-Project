'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { KeywordInput } from './QuestionComposer';

type Method = 'keywords' | 'guide' | 'direct';
type Format = 'text' | 'photo' | 'video' | 'audio';

const PRIMARY = 'var(--color-primary)';

export function AnswerComposer({
  questionId,
  questionBody,
  onDone,
  onSkip,
  compact = false,
}: {
  questionId: string;
  questionBody: string;
  onDone: () => void;
  onSkip?: () => void;
  compact?: boolean;
}) {
  // 키워드 답변이 핵심 훅이므로 기본 탭으로
  const [method, setMethod] = useState<Method>('keywords');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [format, setFormat] = useState<Format>('text');
  const [isPrivate, setIsPrivate] = useState(true); // 기본 비공개 — 부모가 직접 공개를 선택
  const [aiComposed, setAiComposed] = useState(false);

  const guide = trpc.answer.guide.useQuery(
    { questionId },
    { enabled: method === 'guide', staleTime: 300_000 },
  );

  const compose = trpc.answer.composeFromKeywords.useMutation({
    onSuccess: (data) => {
      setText(data.draft);
      setAiComposed(true);
    },
  });

  const submit = trpc.answer.submit.useMutation({ onSuccess: onDone });
  const skip = trpc.answer.skip.useMutation({ onSuccess: onDone });

  function handleSubmit() {
    if (format === 'text' && !text.trim()) return;
    submit.mutate({
      questionId,
      format,
      body: text.trim() || undefined,
      receivedVia: 'app',
      isPrivate,
      keywords: aiComposed ? keywords : [],
      aiComposed,
    });
  }

  const METHODS: Array<{ value: Method; label: string }> = [
    { value: 'keywords', label: '🔑 키워드로 답하기' },
    { value: 'guide', label: '💡 가이드' },
    { value: 'direct', label: '✍️ 직접 쓰기' },
  ];

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      {/* 방법 선택 탭 */}
      <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 text-xs sm:text-sm font-medium">
        {METHODS.map((m) => (
          <button
            key={m.value}
            onClick={() => setMethod(m.value)}
            className="flex-1 px-1.5 py-2 rounded-lg transition-colors"
            style={method === m.value ? { backgroundColor: 'white', color: 'var(--color-primary-dark)', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' } : { color: '#9B9B9B' }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* (2) 키워드 → AI 답변 합성 (핵심) */}
      {method === 'keywords' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-xs text-amber-700 leading-relaxed">
              💛 문장으로 쓰기 쑥스러우면 <strong>떠오르는 단어만</strong> 적어주세요.
              AI가 자연스러운 이야기로 엮어드려요. 마음에 들 때까지 고칠 수 있어요.
            </p>
          </div>
          <KeywordInput
            keywords={keywords}
            setKeywords={setKeywords}
            placeholder="예) 아이와 드라이브, 바닷가, 김밥"
          />
          <button
            onClick={() => compose.mutate({ questionId, keywords })}
            disabled={compose.isPending || keywords.length === 0}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
            style={{ backgroundColor: PRIMARY }}
          >
            {compose.isPending ? 'AI가 이야기로 엮고 있어요...' : text ? '🔄 다시 엮기' : '✨ AI가 이야기로 엮어주기'}
          </button>
          {text && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">엮어진 이야기 (자유롭게 고쳐주세요)</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
                style={{ minHeight: '140px', fontSize: '17px' }}
              />
            </div>
          )}
        </div>
      )}

      {/* (1) AI 가이드 */}
      {method === 'guide' && (
        <div className="space-y-2">
          {guide.isLoading ? (
            <div className="py-6 text-center text-gray-400 text-sm">가이드를 준비하고 있어요...</div>
          ) : (
            (guide.data?.guides ?? []).map((g) => (
              <button
                key={g.format}
                onClick={() => {
                  setFormat(g.format);
                  if (g.format === 'text') {
                    if (g.starter && !text) setText(g.starter + ' ');
                    setMethod('direct');
                  }
                }}
                className="w-full p-3.5 rounded-xl border-2 text-left transition-all hover:shadow-sm"
                style={{ borderColor: format === g.format ? PRIMARY : 'var(--color-border)' }}
              >
                <p className="text-sm font-semibold text-gray-800">{g.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{g.tip}</p>
              </button>
            ))
          )}
        </div>
      )}

      {/* (3) 직접 작성 (기존 형식 선택 포함) */}
      {method === 'direct' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'text', icon: '✍️', label: '글로 쓸게요' },
              { value: 'photo', icon: '📸', label: '사진을 보낼게요' },
              { value: 'video', icon: '🎥', label: '영상으로' },
              { value: 'audio', icon: '🎤', label: '목소리로' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFormat(f.value as Format)}
                className="p-2.5 rounded-xl border-2 flex items-center gap-2 text-sm font-medium transition-all"
                style={{
                  borderColor: format === f.value ? PRIMARY : 'var(--color-border)',
                  backgroundColor: format === f.value ? '#EFF7F2' : 'white',
                  color: format === f.value ? 'var(--color-primary-dark)' : '#6B6B6B',
                }}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>
          {format === 'text' ? (
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setAiComposed(false);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
              style={{ minHeight: '130px', fontSize: '17px' }}
              placeholder="편하게 이야기해주세요..."
            />
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-gray-400 space-y-2">
              <div className="text-3xl">{format === 'photo' ? '📸' : format === 'video' ? '🎥' : '🎤'}</div>
              <p className="text-sm">
                {format === 'photo' ? '사진을 여기에 첨부하세요' : format === 'video' ? '영상을 업로드하세요' : '음성 녹음 기능은 앱에서 사용 가능해요'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 공개/비공개 선택 */}
      <div className="rounded-xl border border-gray-200 p-3 space-y-2">
        <p className="text-xs font-medium text-gray-500">이 답변을 자녀가 볼 수 있게 할까요?</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: true, icon: '🔒', label: '나만 간직하기', desc: '책과 피드에 보이지 않아요' },
            { value: false, icon: '💌', label: '공개하기', desc: '자녀가 바로 볼 수 있어요' },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setIsPrivate(opt.value)}
              className="p-2.5 rounded-xl border-2 text-center transition-all"
              style={{
                borderColor: isPrivate === opt.value ? PRIMARY : 'var(--color-border)',
                backgroundColor: isPrivate === opt.value ? '#EFF7F2' : 'white',
              }}
            >
              <p className="text-sm font-medium text-gray-800">{opt.icon} {opt.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-400">나중에 언제든 바꿀 수 있어요.</p>
      </div>

      {submit.isError && <p className="text-sm text-red-500">{submit.error.message}</p>}
      {compose.isError && <p className="text-sm text-red-500">{compose.error.message}</p>}

      <div className="flex gap-3">
        {onSkip !== undefined ? (
          <button
            onClick={() => skip.mutate({ questionId })}
            disabled={skip.isPending}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-500 font-medium disabled:opacity-50"
          >
            다음에 할게요
          </button>
        ) : null}
        <button
          onClick={handleSubmit}
          disabled={submit.isPending || (format === 'text' && !text.trim())}
          className="flex-grow py-3 rounded-2xl text-white font-semibold disabled:opacity-50"
          style={{ backgroundColor: PRIMARY }}
        >
          {submit.isPending ? '보내는 중...' : isPrivate ? '🔒 간직하기' : '💌 답변 보내기'}
        </button>
      </div>
      {/* compact 모드에서 questionBody 미사용 경고 방지용 숨김 참조 */}
      <span className="hidden">{compact ? questionBody.slice(0, 0) : null}</span>
    </div>
  );
}
