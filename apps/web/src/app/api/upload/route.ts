import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@maeum/db';
import { createStorageAdapter } from '@maeum/storage';
import { createAIClient } from '@maeum/ai';

export const runtime = 'nodejs';

// 형식별 허용 MIME / 용량 제한
const LIMITS: Record<string, { mimes: string[]; maxBytes: number; label: string }> = {
  photo: {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'],
    maxBytes: 10 * 1024 * 1024,
    label: '사진은 10MB 이하의 JPG·PNG·WEBP·HEIC 파일',
  },
  video: {
    mimes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v'],
    maxBytes: 100 * 1024 * 1024,
    label: '영상은 100MB 이하의 MP4·MOV·WEBM 파일',
  },
  audio: {
    mimes: ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/x-m4a', 'audio/3gpp'],
    maxBytes: 25 * 1024 * 1024,
    label: '음성은 25MB 이하의 녹음 파일',
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
  // 세션 인증 (tRPC와 동일한 Bearer 토큰 방식)
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }
  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || session.expiresAt <= new Date()) {
    return NextResponse.json({ error: '로그인이 만료됐어요. 다시 로그인해주세요.' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: '파일을 읽지 못했어요. 다시 시도해주세요.' }, { status: 400 });
  }

  const file = formData.get('file');
  const kind = String(formData.get('kind') ?? '');
  if (!(file instanceof File) || !LIMITS[kind]) {
    return NextResponse.json({ error: '올바른 파일이 아니에요. 다시 선택해주세요.' }, { status: 400 });
  }

  const limit = LIMITS[kind];
  // 일부 브라우저 녹음 MIME에 codec 정보가 붙음 (예: audio/webm;codecs=opus)
  const mime = file.type.split(';')[0].trim().toLowerCase();
  if (!limit.mimes.includes(mime)) {
    return NextResponse.json({ error: `이 형식은 올릴 수 없어요. ${limit.label}만 가능해요.` }, { status: 415 });
  }
  if (file.size > limit.maxBytes) {
    return NextResponse.json({ error: `파일이 너무 커요. ${limit.label}만 올릴 수 있어요.` }, { status: 413 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: '빈 파일이에요. 다시 선택해주세요.' }, { status: 400 });
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
      { error: '저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
