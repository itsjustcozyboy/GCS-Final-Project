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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase 환경 변수 미설정' }, { status: 500 });
  }

  const supabase = createClient(url, key);

  const { error: eventsError } = await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: leadsError } = await supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  if (eventsError || leadsError) {
    console.error('[admin/reset] 삭제 오류:', { eventsError, leadsError });
    return NextResponse.json({ error: '데이터 삭제 실패', eventsError, leadsError }, { status: 500 });
  }

  console.log('[admin/reset] ✅ 모든 테스트 데이터 삭제 완료');
  return NextResponse.json({ ok: true });
}
