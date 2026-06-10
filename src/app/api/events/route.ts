import { NextRequest, NextResponse } from 'next/server';
import { appendToJsonl } from '@/lib/server/storage';
import { saveEventToSupabase } from '@/lib/server/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // body는 이미 { event_name, fd_id, session_id, props_json }으로 구조화됨
    // ts는 props_json에 포함되어 있으므로 추가로 할당하지 않음
    const record = body;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const result = await saveEventToSupabase(record);
      if (result.error) {
        console.error('[events] ❌ Supabase error:', result.error);
        return NextResponse.json({ error: `Supabase: ${result.error.message}` }, { status: 500 });
      }
      console.log('[events] ✅ Saved to Supabase:', { event_name: body.event_name, fd_id: body.fd_id });
    } else {
      await appendToJsonl('data/events.jsonl', record);
      console.log('[events] ✅ Saved to local file');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[events] ❌ Error:', errorMsg);
    return NextResponse.json({ error: `Server error: ${errorMsg}` }, { status: 500 });
  }
}
