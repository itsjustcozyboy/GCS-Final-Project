import { NextRequest, NextResponse } from 'next/server';
import { appendToJsonl } from '@/lib/server/storage';
import { saveLeadToSupabase } from '@/lib/server/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const record = { ...body, created_at: new Date().toISOString() };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    await saveLeadToSupabase(record);
  } else {
    await appendToJsonl('data/leads.jsonl', record);
  }

  return NextResponse.json({ ok: true });
}
