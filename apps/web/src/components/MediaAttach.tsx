'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type MediaKind = 'photo' | 'video' | 'audio';

export interface UploadedMedia {
  kind: MediaKind;
  url: string;
  transcript?: string;
}

const PRIMARY = 'var(--color-primary)';

const ACCEPT: Record<MediaKind, string> = {
  photo: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
};

async function uploadFile(kind: MediaKind, file: File | Blob, fileName: string): Promise<UploadedMedia> {
  const formData = new FormData();
  formData.append('file', file, fileName);
  formData.append('kind', kind);

  const token = typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null;
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as { url?: string; transcript?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error ?? '');
  }
  return { kind, url: data.url, transcript: data.transcript };
}

/** 사진/영상 첨부 — "촬영"과 "앨범에서 선택"을 한 번에 (부모 접근성: 큰 버튼, 쉬운 문구) */
export function MediaAttach({
  kind,
  uploaded,
  onUploaded,
  onClear,
}: {
  kind: 'photo' | 'video';
  uploaded: UploadedMedia | null;
  onUploaded: (media: UploadedMedia) => void;
  onClear: () => void;
}) {
  const { t } = useTranslation('today');
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      onUploaded(await uploadFile(kind, file, file.name));
    } catch (e) {
      setError((e instanceof Error && e.message) ? e.message : t('media.uploadError'));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  if (uploaded) {
    return (
      <div className="space-y-2">
        {uploaded.kind === 'photo' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={uploaded.url} alt={t('media.photoAttachedAlt')} className="rounded-xl max-h-64 w-full object-cover" />
        ) : (
          <video src={uploaded.url} controls className="rounded-xl max-h-64 w-full" aria-label={t('media.videoAttachedAria')} />
        )}
        <button onClick={onClear} className="w-full py-3 rounded-xl border border-gray-200 text-base text-gray-500">
          {t('media.reselect')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[kind]}
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
        aria-label={kind === 'photo' ? t('media.photoSelectAria') : t('media.videoSelectAria')}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full py-6 rounded-xl border-2 border-dashed text-center space-y-1 disabled:opacity-50"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="text-3xl" aria-hidden>{kind === 'photo' ? '📸' : '🎥'}</div>
        <p className="text-base font-medium text-gray-700">
          {uploading
            ? t('media.uploading')
            : kind === 'photo'
              ? t('media.photoCta')
              : t('media.videoCta')}
        </p>
        <p className="text-xs text-gray-400">{kind === 'photo' ? t('media.photoHint') : t('media.videoHint')}</p>
      </button>
      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
    </div>
  );
}

/** 음성 답변 — 녹음 버튼을 가장 크게 (타이핑이 어려운 세대 배려) */
export function VoiceRecorder({
  uploaded,
  onUploaded,
  onClear,
}: {
  uploaded: UploadedMedia | null;
  onUploaded: (media: UploadedMedia) => void;
  onClear: () => void;
}) {
  const { t } = useTranslation('today');
  const inputRef = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [recording]);

  async function startRecording() {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mime });
        void handleUpload(blob, mime === 'audio/webm' ? 'voice.webm' : 'voice.m4a');
      };
      recorder.start();
      recorderRef.current = recorder;
      setSeconds(0);
      setRecording(true);
    } catch {
      setError(t('media.micError'));
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  async function handleUpload(blob: Blob, name: string) {
    setUploading(true);
    setError('');
    try {
      onUploaded(await uploadFile('audio', blob, name));
    } catch (e) {
      setError((e instanceof Error && e.message) ? e.message : t('media.uploadError'));
    } finally {
      setUploading(false);
    }
  }

  if (uploaded) {
    return (
      <div className="space-y-2">
        <div className="rounded-xl bg-gray-50 p-4 space-y-2">
          <audio src={uploaded.url} controls className="w-full" aria-label={t('media.voiceListenAria')} />
          {uploaded.transcript && (
            <p className="text-sm text-gray-500 italic">📝 {uploaded.transcript}</p>
          )}
        </div>
        <button onClick={onClear} className="w-full py-3 rounded-xl border border-gray-200 text-base text-gray-500">
          {t('media.rerecord')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={uploading}
        aria-label={recording ? t('media.recStopAria') : t('media.recStartAria')}
        className="w-full py-8 rounded-2xl text-white text-xl font-bold disabled:opacity-50 transition-colors"
        style={{ backgroundColor: recording ? '#DC2626' : PRIMARY }}
      >
        {uploading ? (
          t('media.savingVoice')
        ) : recording ? (
          <span>
            {t('media.recording')} ({Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')})
            <span className="block text-base font-medium mt-1">{t('media.recordingHint')}</span>
          </span>
        ) : (
          <span>
            {t('media.recordCta')}
            <span className="block text-base font-medium mt-1">{t('media.recordHint')}</span>
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.audio}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleUpload(f, f.name);
          e.target.value = '';
        }}
        aria-label={t('media.voiceFileSelectAria')}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading || recording}
        className="w-full py-2 text-sm text-gray-400 underline disabled:opacity-50"
      >
        {t('media.uploadVoiceFile')}
      </button>

      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
    </div>
  );
}
