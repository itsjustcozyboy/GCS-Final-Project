import { NextRequest, NextResponse } from 'next/server';
import { appendToJsonl } from '@/lib/server/storage';
import { saveLeadToSupabase } from '@/lib/server/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = { ...body, created_at: new Date().toISOString() };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const result = await saveLeadToSupabase(record);
      if (result.error) {
        console.error('[leads] Supabase error:', result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }
      console.log('[leads] ✅ Saved to Supabase');
    } else {
      await appendToJsonl('data/leads.jsonl', record);
      console.log('[leads] ✅ Saved to local file');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[leads] Error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
