'use client';
import { useEffect, useRef, useState } from 'react';

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
    throw new Error(data.error ?? '올리는 중 문제가 생겼어요. 다시 시도해주세요.');
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
      setError(e instanceof Error ? e.message : '올리는 중 문제가 생겼어요. 다시 시도해주세요.');
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
          <img src={uploaded.url} alt="첨부한 사진" className="rounded-xl max-h-64 w-full object-cover" />
        ) : (
          <video src={uploaded.url} controls className="rounded-xl max-h-64 w-full" aria-label="첨부한 영상" />
        )}
        <button onClick={onClear} className="w-full py-3 rounded-xl border border-gray-200 text-base text-gray-500">
          🗑 다시 선택하기
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
        aria-label={kind === 'photo' ? '사진 선택' : '영상 선택'}
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
            ? '올리는 중이에요...'
            : kind === 'photo'
              ? '눌러서 사진 찍기 또는 앨범에서 고르기'
              : '눌러서 영상 찍기 또는 앨범에서 고르기'}
        </p>
        <p className="text-xs text-gray-400">{kind === 'photo' ? 'JPG·PNG 등, 10MB까지' : 'MP4·MOV 등, 100MB까지'}</p>
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
      setError('마이크를 사용할 수 없어요. 아래에서 녹음 파일을 직접 골라주셔도 돼요.');
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
      setError(e instanceof Error ? e.message : '올리는 중 문제가 생겼어요. 다시 시도해주세요.');
    } finally {
      setUploading(false);
    }
  }

  if (uploaded) {
    return (
      <div className="space-y-2">
        <div className="rounded-xl bg-gray-50 p-4 space-y-2">
          <audio src={uploaded.url} controls className="w-full" aria-label="녹음한 목소리 듣기" />
          {uploaded.transcript && (
            <p className="text-sm text-gray-500 italic">📝 {uploaded.transcript}</p>
          )}
        </div>
        <button onClick={onClear} className="w-full py-3 rounded-xl border border-gray-200 text-base text-gray-500">
          🗑 다시 녹음하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={uploading}
        aria-label={recording ? '녹음 끝내기' : '녹음 시작하기'}
        className="w-full py-8 rounded-2xl text-white text-xl font-bold disabled:opacity-50 transition-colors"
        style={{ backgroundColor: recording ? '#DC2626' : PRIMARY }}
      >
        {uploading ? (
          '목소리를 저장하고 있어요...'
        ) : recording ? (
          <span>
            ⏺ 녹음 중 ({Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')})
            <span className="block text-base font-medium mt-1">다 말씀하셨으면 여기를 눌러주세요</span>
          </span>
        ) : (
          <span>
            🎤 눌러서 말하기
            <span className="block text-base font-medium mt-1">편하게 말씀해 주시면 글로 바꿔드려요</span>
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
        aria-label="녹음 파일 선택"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading || recording}
        className="w-full py-2 text-sm text-gray-400 underline disabled:opacity-50"
      >
        가지고 있는 녹음 파일 올리기
      </button>

      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
    </div>
  );
}
