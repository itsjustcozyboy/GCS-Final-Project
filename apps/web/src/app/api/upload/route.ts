import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@maeum/db';
import { createStorageAdapter } from '@maeum/storage';
import { createAIClient } from '@maeum/ai';
import { resolveLocale, LOCALE_COOKIE, translate } from '@maeum/i18n';

export const runtime = 'nodejs';

// 형식별 허용 MIME / 용량 제한
const LIMITS: Record<string, { mimes: string[]; maxBytes: number; labelKey: string }> = {
  photo: {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'],
    maxBytes: 10 * 1024 * 1024,
    labelKey: 'uploadLabelPhoto',
  },
  video: {
    mimes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v'],
    maxBytes: 100 * 1024 * 1024,
    labelKey: 'uploadLabelVideo',
  },
  audio: {
    mimes: ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/x-m4a', 'audio/3gpp'],
    maxBytes: 25 * 1024 * 1024,
    labelKey: 'uploadLabelAudio',
  },
};

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
    'image/heic': 'heic', 'image/heif': 'heif',
    'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm', 'video/x-m4v': 'm4v',
    'audio/webm': 'webm', 'audio/mp4': 'm4a', 'audio/mpeg': 'mp3', 'audio/wav': 'wav',
    'audio/ogg': 'ogg', 'audio/aac': 'aac', 'audio/x-m4a': 'm4a', 'audio/3gpp': '3gp',
  };
  return map[mime] ?? 'bin';
}

export async function POST(req: NextRequest) {
  const locale = resolveLocale({ cookie: req.cookies.get(LOCALE_COOKIE)?.value, acceptLanguage: req.headers.get('accept-language') });
  const te = (k: string, vars?: Record<string, string | number>) => translate(locale, 'errors', k, vars);
  // 세션 인증 (tRPC와 동일한 Bearer 토큰 방식)
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: te('loginRequired') }, { status: 401 });
  }
  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || session.expiresAt <= new Date()) {
    return NextResponse.json({ error: te('sessionExpired') }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: te('uploadRead') }, { status: 400 });
  }

  const file = formData.get('file');
  const kind = String(formData.get('kind') ?? '');
  if (!(file instanceof File) || !LIMITS[kind]) {
    return NextResponse.json({ error: te('uploadInvalid') }, { status: 400 });
  }

  const limit = LIMITS[kind];
  // 일부 브라우저 녹음 MIME에 codec 정보가 붙음 (예: audio/webm;codecs=opus)
  const mime = file.type.split(';')[0].trim().toLowerCase();
  if (!limit.mimes.includes(mime)) {
    return NextResponse.json({ error: te('uploadBadFormat', { label: te(limit.labelKey) }) }, { status: 415 });
  }
  if (file.size > limit.maxBytes) {
    return NextResponse.json({ error: te('uploadTooBig', { label: te(limit.labelKey) }) }, { status: 413 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: te('uploadEmpty') }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `media/${session.userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extFromMime(mime)}`;

  try {
    const storage = createStorageAdapter();
    const url = await storage.upload(key, buffer, mime);

    // 음성은 자동 전사 (현재 Mock — TODO: 실제 STT 연동)
    let transcript: string | undefined;
    if (kind === 'audio') {
      const ai = createAIClient();
      const result = await ai.transcribeAudio({ mediaUrl: url, mimeType: mime });
      transcript = result.text;
    }

    return NextResponse.json({ url, transcript });
  } catch (e) {
    console.error('[upload] 저장 실패:', e);
    return NextResponse.json(
      { error: te('uploadSaveFail') },
      { status: 500 },
    );
  }
}
