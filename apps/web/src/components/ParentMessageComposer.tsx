'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { MediaAttach, VoiceRecorder, type UploadedMedia } from './MediaAttach';
import { useTranslation } from 'react-i18next';

type Mode = 'voice' | 'text' | 'photo' | 'video';

const PRIMARY = 'var(--color-primary)';

// 부모가 먼저 자녀에게 마음을 전하는 작성기 (긍정 프레임 카피 — 죽음 관련 표현 금지)
export function ParentMessageComposer({
  connectionId,
  childName,
  onClose,
  onSent,
}: {
  connectionId: string;
  childName: string;
  onClose: () => void;
  onSent: () => void;
}) {
  // 음성이 1순위 동선 (타이핑이 어려운 세대 배려)
  const { t } = useTranslation('today');
  const [mode, setMode] = useState<Mode>('voice');
  const [text, setText] = useState('');
  const [media, setMedia] = useState<UploadedMedia | null>(null);
  const [done, setDone] = useState(false);

  const send = trpc.message.sendToChild.useMutation({
    onSuccess: () => {
      setDone(true);
      onSent();
    },
  });

  const canSend = mode === 'text' ? text.trim().length > 0 : !!media || text.trim().length > 0;

  function handleSend() {
    send.mutate({
      connectionId,
      format: media ? (media.kind === 'photo' ? 'photo' : media.kind === 'video' ? 'video' : 'audio') : 'text',
      body: text.trim() || undefined,
      mediaUrl: media?.url,
      transcript: media?.transcript,
      isPrivate: false,
    });
  }

  const MODES: Array<{ value: Mode; icon: string; label: string }> = [
    { value: 'voice', icon: '🎤', label: t('composer.format.audio') },
    { value: 'text', icon: '✍️', label: t('composer.format.text') },
    { value: 'photo', icon: '📸', label: t('composer.format.photo') },
    { value: 'video', icon: '🎥', label: t('composer.format.video') },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 w-full max-w-md space-y-5 shadow-xl max-h-[90dvh] overflow-y-auto">
        {done ? (
          <div className="text-center py-10 space-y-4 break-keep">
            <div className="text-5xl sm:text-6xl" aria-hidden>💌</div>
            <p className="text-2xl font-bold leading-snug text-gray-900">{t('parentMsg.sentTitle')}</p>
            <p className="text-base text-gray-500 leading-relaxed">{t('parentMsg.sentBody', { name: childName })}</p>
            <button
              onClick={onClose}
              className="w-full min-h-12 px-4 py-3 rounded-2xl text-white text-base sm:text-lg font-semibold"
              style={{ backgroundColor: PRIMARY }}
            >
              {t('actions.confirm', { ns: 'common' })}
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1 break-keep">
              <h2 className="text-xl font-bold leading-snug text-gray-900">{t('parentMsg.title')}</h2>
              <p className="text-base text-gray-500 leading-relaxed">
                {t('parentMsg.subtitle', { name: childName })}
              </p>
            </div>

            {/* 방법 선택 — 큰 버튼, 음성 우선 */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label={t('parentMsg.modeAria')}>
              {MODES.map((m) => (
                <button
                  key={m.value}
                  role="tab"
                  aria-selected={mode === m.value}
                  onClick={() => { setMode(m.value); setMedia(null); }}
                  className="min-h-16 py-3 rounded-xl border-2 text-center transition-all break-keep"
                  style={{
                    borderColor: mode === m.value ? PRIMARY : 'var(--color-border)',
                    backgroundColor: mode === m.value ? '#EFF7F2' : 'white',
                  }}
                >
                  <div className="text-2xl" aria-hidden>{m.icon}</div>
                  <div className="text-xs font-medium text-gray-700 mt-1">{m.label}</div>
                </button>
              ))}
            </div>

            {mode === 'voice' && (
              <VoiceRecorder uploaded={media} onUploaded={setMedia} onClear={() => setMedia(null)} />
            )}
            {(mode === 'photo' || mode === 'video') && (
              <MediaAttach kind={mode} uploaded={media} onUploaded={setMedia} onClear={() => setMedia(null)} />
            )}

            {/* 글 — 단독 작성 또는 미디어에 곁들이는 한마디 */}
            <div className="space-y-1">
              {mode !== 'text' && <p className="text-sm text-gray-500">{t('parentMsg.extraLabel')}</p>}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 leading-relaxed resize-none focus:outline-none"
                style={{ minHeight: mode === 'text' ? '160px' : '80px', fontSize: '18px' }}
                placeholder={mode === 'text' ? t('parentMsg.textPlaceholder') : t('parentMsg.mediaPlaceholder')}
                aria-label={t('parentMsg.textAria')}
              />
            </div>

            {send.isError && <p className="text-sm text-red-500" role="alert">{send.error.message}</p>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="min-h-12 flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-base font-medium text-gray-500"
              >
                {t('parentMsg.later')}
              </button>
              <button
                onClick={handleSend}
                disabled={!canSend || send.isPending}
                className="min-h-12 flex-[2] px-4 py-3 rounded-2xl text-white text-base sm:text-lg font-semibold disabled:opacity-50"
                style={{ backgroundColor: PRIMARY }}
              >
                {send.isPending ? t('parentMsg.sending') : t('parentMsg.send')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
