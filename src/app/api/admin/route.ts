import { NextRequest, NextResponse } from 'next/server';
import { readJsonl } from '@/lib/server/storage';
import { getAdminDataFromSupabase } from '@/lib/server/supabase';
import { aggregate, utmSourceOptions, AdminFilters } from '@/lib/admin/aggregate';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  if (password !== process.env.ADMIN_PASSWORD) {
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
