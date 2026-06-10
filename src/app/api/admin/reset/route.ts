import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEV_FALLBACK_PASSWORD = 'admin1234';

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  const configured = (process.env.ADMIN_PASSWORD ?? '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .trim();

  const expected = configured || (process.env.NODE_ENV !== 'production' ? DEV_FALLBACK_PASSWORD : '');

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  // service role key bypasses RLS — required for DELETE without restrictions
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase 환경 변수 미설정 (SUPABASE_SERVICE_ROLE_KEY 필요)' }, { status: 500 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { error: eventsError } = await supabase.from('events').delete().gte('created_at', '1970-01-01');
  const { error: leadsError } = await supabase.from('leads').delete().gte('created_at', '1970-01-01');

  if (eventsError || leadsError) {
    console.error('[admin/reset] 삭제 오류:', { eventsError, leadsError });
    return NextResponse.json({ error: '데이터 삭제 실패', eventsError, leadsError }, { status: 500 });
  }

  console.log('[admin/reset] ✅ 모든 테스트 데이터 삭제 완료');
  return NextResponse.json({ ok: true });
}
