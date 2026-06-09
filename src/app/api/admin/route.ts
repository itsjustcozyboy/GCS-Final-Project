import { NextRequest, NextResponse } from 'next/server';
import { readJsonl } from '@/lib/server/storage';
import { getAdminDataFromSupabase } from '@/lib/server/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const data = await getAdminDataFromSupabase();
    return NextResponse.json(data);
  }

  const events = await readJsonl('data/events.jsonl');
  const leads = await readJsonl('data/leads.jsonl');

  const funnelMap: Record<string, Record<string, number>> = {};
  for (const e of events) {
    const fd = String(e.fd_id ?? 'unknown');
    const ev = String(e.event_name ?? 'unknown');
    if (!funnelMap[fd]) funnelMap[fd] = {};
    funnelMap[fd][ev] = (funnelMap[fd][ev] ?? 0) + 1;
  }

  const channelMap: Record<string, number> = {};
  for (const e of events) {
    const props = e.props_json as Record<string, unknown> | undefined;
    const ch = String(props?.channel_variant ?? e.channel_variant ?? 'none');
    channelMap[ch] = (channelMap[ch] ?? 0) + 1;
  }

  const utmMap: Record<string, number> = {};
  for (const e of events) {
    const props = e.props_json as Record<string, unknown> | undefined;
    const src = String(props?.utm_source ?? e.utm_source ?? 'direct');
    utmMap[src] = (utmMap[src] ?? 0) + 1;
  }

  return NextResponse.json({
    total_events: events.length,
    total_leads: leads.length,
    funnel_by_fd: funnelMap,
    by_channel: channelMap,
    by_utm_source: utmMap,
  });
}
