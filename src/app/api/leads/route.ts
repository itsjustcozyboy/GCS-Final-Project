import { NextRequest, NextResponse } from 'next/server';
import { appendToJsonl } from '@/lib/server/storage';
import { saveLeadToSupabase } from '@/lib/server/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // created_at는 Supabase에서 자동 생성되므로 제거
    const { created_at, ...record } = body;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const result = await saveLeadToSupabase(record);
      if (result.error) {
        console.error('[leads] ❌ Supabase error:', result.error);
        return NextResponse.json({ error: `Supabase: ${result.error.message}` }, { status: 500 });
      }
      console.log('[leads] ✅ Saved to Supabase:', { email: record.email, fd_id: record.fd_id });
    } else {
      await appendToJsonl('data/leads.jsonl', { ...record, created_at: new Date().toISOString() });
      console.log('[leads] ✅ Saved to local file');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[leads] ❌ Error:', errorMsg);
    return NextResponse.json({ error: `Server error: ${errorMsg}` }, { status: 500 });
  }
}
