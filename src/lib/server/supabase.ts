import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('[supabase] ❌ 환경 변수 미설정:', {
      url: url ? '✓' : '❌ NEXT_PUBLIC_SUPABASE_URL 없음',
      key: key ? '✓' : '❌ NEXT_PUBLIC_SUPABASE_ANON_KEY 없음',
    });
  } else {
    console.log('[supabase] ✅ 환경 변수 로드됨:', { url, key: key.substring(0, 20) + '...' });
  }

  return createClient(url!, key!);
}

export async function saveEventToSupabase(record: Record<string, unknown>) {
  const supabase = getClient();
  return await supabase.from('events').insert(record);
}

export async function saveLeadToSupabase(record: Record<string, unknown>) {
  const supabase = getClient();
  return await supabase.from('leads').insert(record);
}

export async function getAdminDataFromSupabase() {
  const supabase = getClient();
  const { data: events } = await supabase.from('events').select('*');
  const { data: leads } = await supabase.from('leads').select('*');
  return { events: events ?? [], leads: leads ?? [] };
}
