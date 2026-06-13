'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { MediaAttach, VoiceRecorder, type UploadedMedia } from './MediaAttach';

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
    { value: 'voice', icon: '🎤', label: '목소리로' },
    { value: 'text', icon: '✍️', label: '글로' },
    { value: 'photo', icon: '📸', label: '사진으로' },
    { value: 'video', icon: '🎥', label: '영상으로' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 w-full max-w-md space-y-5 shadow-xl max-h-[90dvh] overflow-y-auto">
        {done ? (
          <div className="text-center py-10 space-y-4 break-keep">
            <div className="text-5xl sm:text-6xl" aria-hidden>💌</div>
            <p className="text-2xl font-bold leading-snug text-gray-900">잘 전달됐어요!</p>
            <p className="text-base text-gray-500 leading-relaxed">{childName}님이 따뜻한 마음을 받아볼 거예요.</p>
            <button
              onClick={onClose}
              className="w-full min-h-12 px-4 py-3 rounded-2xl text-white text-base sm:text-lg font-semibold"
              style={{ backgroundColor: PRIMARY }}
            >
              확인
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1 break-keep">
              <h2 className="text-xl font-bold leading-snug text-gray-900">💝 먼저 마음 전하기</h2>
              <p className="text-base text-gray-500 leading-relaxed">
                지금 떠오르는 마음을 {childName}님에게 남겨보세요. 질문을 기다리지 않아도 돼요.
              </p>
            </div>

            {/* 방법 선택 — 큰 버튼, 음성 우선 */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="전하는 방법 선택">
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
              {mode !== 'text' && <p className="text-sm text-gray-500">곁들이고 싶은 한마디 (선택)</p>}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 leading-relaxed resize-none focus:outline-none"
                style={{ minHeight: mode === 'text' ? '160px' : '80px', fontSize: '18px' }}
                placeholder={mode === 'text' ? '하고 싶었던 이야기를 편하게 적어주세요...' : '예) 오늘 문득 네 생각이 나서.'}
                aria-label="전하고 싶은 글"
              />
            </div>

            {send.isError && <p className="text-sm text-red-500" role="alert">{send.error.message}</p>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="min-h-12 flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-base font-medium text-gray-500"
              >
                다음에 할게요
              </button>
              <button
                onClick={handleSend}
                disabled={!canSend || send.isPending}
                className="min-h-12 flex-[2] px-4 py-3 rounded-2xl text-white text-base sm:text-lg font-semibold disabled:opacity-50"
                style={{ backgroundColor: PRIMARY }}
              >
                {send.isPending ? '전하는 중...' : '💌 마음 전하기'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
