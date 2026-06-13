'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';
import { KeywordInput } from './QuestionComposer';
import { MediaAttach, VoiceRecorder, type UploadedMedia } from './MediaAttach';

type Method = 'keywords' | 'guide' | 'direct';
type Format = 'text' | 'photo' | 'video' | 'audio';

const PRIMARY = 'var(--color-primary)';

export function AnswerComposer({
  questionId,
  onDone,
  onSkip,
  compact = false,
}: {
  questionId: string;
  onDone: () => void;
  onSkip?: () => void;
  compact?: boolean;
}) {
  // 가이드가 1순위 동선 — 미디어(사진·영상·목소리)는 가이드에서만 다룬다.
  // (타이핑이 어려운 세대를 위해 가이드 안에서 '목소리로'가 가장 먼저 보이게 둔다.)
  const { t } = useTranslation('today');
  const [method, setMethod] = useState<Method>('guide');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [format, setFormat] = useState<Format>('audio'); // 가이드 진입 시 목소리부터
  const [media, setMedia] = useState<UploadedMedia | null>(null);
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

  // 미디어가 첨부되면 그 형식으로, 아니면 글로 제출
  const canSubmit = !!media || !!text.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    submit.mutate({
      questionId,
      format: media ? media.kind : 'text',
      body: text.trim() || undefined,
      mediaUrl: media?.url,
      transcript: media?.transcript,
      receivedVia: 'app',
      isPrivate,
      keywords: aiComposed ? keywords : [],
      aiComposed,
    });
  }

  // 직접 쓰기 = 글 전용 / 가이드 = 글·사진·영상·목소리 모두 / 키워드 = AI 문장화
  const METHODS: Array<{ value: Method; labelKey: string }> = [
    { value: 'guide', labelKey: 'composer.tab.guide' },
    { value: 'keywords', labelKey: 'composer.tab.keywords' },
    { value: 'direct', labelKey: 'composer.tab.direct' },
  ];

  // 직접 쓰기는 글만 — 들어올 때 첨부 미디어와 형식을 글로 초기화한다.
  function selectMethod(next: Method) {
    if (next === 'direct') {
      setMedia(null);
      setFormat('text');
    }
    setMethod(next);
  }

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      {/* 방법 선택 탭 */}
      <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 text-xs sm:text-sm font-medium break-keep">
        {METHODS.map((m) => (
          <button
            key={m.value}
            onClick={() => selectMethod(m.value)}
            className="min-h-10 flex-1 px-1.5 py-2 rounded-lg transition-colors"
            style={method === m.value ? { backgroundColor: 'white', color: 'var(--color-primary-dark)', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' } : { color: '#9B9B9B' }}
          >
            {t(m.labelKey)}
          </button>
        ))}
      </div>

      {/* (2) 키워드 → AI 답변 합성 (핵심) */}
      {method === 'keywords' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-xs text-amber-700 leading-relaxed">{t('composer.keywordHint')}</p>
          </div>
          <KeywordInput
            keywords={keywords}
            setKeywords={setKeywords}
            placeholder={t('composer.keywordPlaceholder')}
          />
          <button
            onClick={() => compose.mutate({ questionId, keywords })}
            disabled={compose.isPending || keywords.length === 0}
            className="w-full min-h-11 px-4 py-2 rounded-xl text-white text-sm font-semibold disabled:opacity-50 break-keep"
            style={{ backgroundColor: PRIMARY }}
          >
            {compose.isPending ? t('composer.weaving') : text ? t('composer.reweave') : t('composer.weave')}
          </button>
          {text && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">{t('composer.woven')}</p>
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

      {/* (1) 가이드 — 글·사진·영상·목소리 모두 여기서. 미디어 첨부는 가이드 전용 */}
      {method === 'guide' && (
        <div className="space-y-3">
          {/* 형식 선택 (목소리를 가장 먼저 — 타이핑이 어려운 세대 배려) */}
          <div className="grid grid-cols-2 gap-2 break-keep">
            {[
              { value: 'audio', icon: '🎤', label: t('composer.format.audio') },
              { value: 'text', icon: '✍️', label: t('composer.format.text') },
              { value: 'photo', icon: '📸', label: t('composer.format.photo') },
              { value: 'video', icon: '🎥', label: t('composer.format.video') },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  const next = f.value as Format;
                  setFormat(next);
                  if (media && media.kind !== next) setMedia(null);
                }}
                aria-label={f.label}
                aria-pressed={format === f.value}
                className="min-h-12 p-3 rounded-xl border-2 flex items-center gap-2 text-sm font-medium transition-all"
                style={{
                  borderColor: format === f.value ? PRIMARY : 'var(--color-border)',
                  backgroundColor: format === f.value ? '#EFF7F2' : 'white',
                  color: format === f.value ? 'var(--color-primary-dark)' : '#6B6B6B',
                }}
              >
                <span aria-hidden>{f.icon}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* 선택한 형식에 맞는 AI 가이드 한마디 */}
          {guide.isLoading ? (
            <div className="py-3 text-center text-gray-400 text-sm">{t('composer.guidePreparing')}</div>
          ) : (() => {
            const g = guide.data?.guides.find((x) => x.format === format);
            if (!g) return null;
            return (
              <div className="rounded-xl bg-amber-50 p-3 space-y-2">
                <p className="text-xs text-amber-700 leading-relaxed">💡 {g.tip}</p>
                {g.format === 'text' && g.starter && (
                  <button
                    onClick={() => setText(g.starter!.endsWith(' ') ? g.starter! : `${g.starter} `)}
                    className="text-xs font-medium underline"
                    style={{ color: PRIMARY }}
                  >
                    {t('composer.startWith', { starter: g.starter })}
                  </button>
                )}
              </div>
            );
          })()}

          {/* 형식별 입력 */}
          {format === 'audio' ? (
            <VoiceRecorder
              uploaded={media?.kind === 'audio' ? media : null}
              onUploaded={setMedia}
              onClear={() => setMedia(null)}
            />
          ) : format === 'text' ? (
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setAiComposed(false);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
              style={{ minHeight: '130px', fontSize: '17px' }}
              placeholder={t('composer.textPlaceholder')}
              aria-label={t('composer.textPlaceholder')}
            />
          ) : (
            <div className="space-y-2">
              <MediaAttach
                kind={format === 'photo' ? 'photo' : 'video'}
                uploaded={media && media.kind === format ? media : null}
                onUploaded={setMedia}
                onClear={() => setMedia(null)}
              />
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
                style={{ minHeight: '70px', fontSize: '17px' }}
                placeholder={t('composer.extraPlaceholder')}
                aria-label={t('composer.extraPlaceholder')}
              />
            </div>
          )}
        </div>
      )}

      {/* (3) 직접 쓰기 — 글 전용 (사진·영상·목소리는 가이드에서) */}
      {method === 'direct' && (
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setAiComposed(false);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
          style={{ minHeight: '160px', fontSize: '17px' }}
          placeholder={t('composer.textPlaceholder')}
          aria-label={t('composer.textPlaceholder')}
        />
      )}

      {/* 공개/비공개 선택 */}
      <div className="rounded-xl border border-gray-200 p-3 space-y-2">
        <p className="text-xs font-medium text-gray-500 break-keep">{t('composer.visQuestion')}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { value: true, icon: '🔒', label: t('composer.privateLabel'), desc: t('composer.privateDesc') },
            { value: false, icon: '💌', label: t('composer.publicLabel'), desc: t('composer.publicDesc') },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setIsPrivate(opt.value)}
              className="min-h-16 p-2.5 rounded-xl border-2 text-center transition-all break-keep"
              style={{
                borderColor: isPrivate === opt.value ? PRIMARY : 'var(--color-border)',
                backgroundColor: isPrivate === opt.value ? '#EFF7F2' : 'white',
              }}
            >
              <p className="text-sm font-medium text-gray-800 leading-snug">{opt.icon} {opt.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{opt.desc}</p>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed break-keep">{t('composer.changeLater')}</p>
      </div>

      {submit.isError && <p className="text-sm text-red-500 leading-relaxed break-keep">{submit.error.message}</p>}
      {compose.isError && <p className="text-sm text-red-500 leading-relaxed break-keep">{compose.error.message}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        {onSkip !== undefined ? (
          <button
            onClick={() => skip.mutate({ questionId })}
            disabled={skip.isPending}
            className="min-h-12 flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-gray-500 text-base font-medium disabled:opacity-50"
            aria-label={t('composer.skipAria')}
          >
            {t('composer.skip')}
          </button>
        ) : null}
        <button
          onClick={handleSubmit}
          disabled={submit.isPending || !canSubmit}
          className="min-h-12 flex-grow px-4 py-3 rounded-2xl text-white text-base sm:text-lg font-semibold disabled:opacity-50"
          style={{ backgroundColor: PRIMARY }}
          aria-label={isPrivate ? t('composer.submitAriaPrivate') : t('composer.submitAriaPublic')}
        >
          {submit.isPending ? t('composer.submitting') : isPrivate ? t('composer.keep') : t('composer.sendAnswer')}
        </button>
      </div>
    </div>
  );
}
