import { NextRequest, NextResponse } from 'next/server';
import { appendToJsonl } from '@/lib/server/storage';
import { saveEventToSupabase } from '@/lib/server/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = { ...body, ts: new Date().toISOString() };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const result = await saveEventToSupabase(record);
      if (result.error) {
        console.error('[events] Supabase error:', result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }
      console.log('[events] ✅ Saved to Supabase');
    } else {
      await appendToJsonl('data/events.jsonl', record);
      console.log('[events] ✅ Saved to local file');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[events] Error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
