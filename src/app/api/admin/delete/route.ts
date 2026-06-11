import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEV_FALLBACK_PASSWORD = 'admin1234';

function auth(password: string | null): boolean {
  const configured = (process.env.ADMIN_PASSWORD ?? '').trim().replace(/^['"]|['"]$/g, '').trim();
  const expected = configured || (process.env.NODE_ENV !== 'production' ? DEV_FALLBACK_PASSWORD : '');
  return !!expected && password === expected;
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// DELETE /api/admin/delete?password=xxx&type=lead&id=xxx
// DELETE /api/admin/delete?password=xxx&type=session&session_id=xxx
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  if (!auth(password)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const type = searchParams.get('type');
  const supabase = getServiceClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase 환경 변수 미설정 (SUPABASE_SERVICE_ROLE_KEY 필요)' }, { status: 500 });
  }

  if (type === 'lead') {
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id 파라미터 필요' }, { status: 400 });
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (type === 'session') {
    const session_id = searchParams.get('session_id');
    if (!session_id) return NextResponse.json({ error: 'session_id 파라미터 필요' }, { status: 400 });
    // session_id is stored inside props_json JSONB column
    const { error } = await supabase.from('events').delete().eq('props_json->>session_id', session_id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'type 파라미터 필요 (lead | session)' }, { status: 400 });
}
