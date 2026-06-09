import { NextRequest, NextResponse } from 'next/server';
import { appendToJsonl } from '@/lib/server/storage';
import { saveEventToSupabase } from '@/lib/server/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const record = { ...body, ts: new Date().toISOString() };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    await saveEventToSupabase(record);
  } else {
    await appendToJsonl('data/events.jsonl', record);
  }

  return NextResponse.json({ ok: true });
}
