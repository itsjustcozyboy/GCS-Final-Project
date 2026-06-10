import { NextRequest, NextResponse } from 'next/server';
import { readJsonl } from '@/lib/server/storage';
import { getAdminDataFromSupabase } from '@/lib/server/supabase';
import { aggregate, utmSourceOptions, AdminFilters } from '@/lib/admin/aggregate';

// 로컬 개발 편의용 기본값. 프로덕션에서는 반드시 Vercel 환경변수 ADMIN_PASSWORD를 설정할 것.
const DEV_FALLBACK_PASSWORD = 'admin1234';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  // env 값에 실수로 섞인 따옴표/공백/줄바꿈을 방어적으로 정리
  const configured = (process.env.ADMIN_PASSWORD ?? '').trim().replace(/^['"]|['"]$/g, '');

  // env가 비어 있으면: 프로덕션은 거부(원인 로그), 개발은 기본값 허용
  const expected = configured || (process.env.NODE_ENV !== 'production' ? DEV_FALLBACK_PASSWORD : '');

  if (!configured) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[admin] ADMIN_PASSWORD env not set — Vercel Settings → Environment Variables에 등록 필요. 모든 로그인 거부.');
    } else {
      console.warn('[admin] ADMIN_PASSWORD env not set — 개발 기본값(admin1234) 사용 중.');
    }
  }

  if (!expected || password !== expected) {
    if (!expected) {
      console.error('[admin] 로그인 거부: 서버에 비밀번호가 구성되지 않음(ADMIN_PASSWORD 미설정).');
    } else {
      console.warn('[admin] 로그인 거부: 비밀번호 불일치.');
    }
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const filters: AdminFilters = {
    from: searchParams.get('from') || undefined,
    to: searchParams.get('to') || undefined,
    utm_source: searchParams.get('utm_source') || undefined,
  };

  let events: Record<string, unknown>[];
  let leads: Record<string, unknown>[];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const data = await getAdminDataFromSupabase();
    events = data.events as Record<string, unknown>[];
    leads = data.leads as Record<string, unknown>[];
  } else {
    events = await readJsonl('data/events.jsonl');
    leads = await readJsonl('data/leads.jsonl');
  }

  const payload = aggregate(events, leads, filters);
  return NextResponse.json({ ...payload, utmSourceOptions: utmSourceOptions(events) });
}
