import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function saveEventToSupabase(record: Record<string, unknown>) {
  const supabase = getClient();
  const { error } = await supabase.from('events').insert(record);
  if (error) console.error('supabase event error', error);
}

export async function saveLeadToSupabase(record: Record<string, unknown>) {
  const supabase = getClient();
  const { error } = await supabase.from('leads').insert(record);
  if (error) console.error('supabase lead error', error);
}

export async function getAdminDataFromSupabase() {
  const supabase = getClient();
  const { data: events } = await supabase.from('events').select('*');
  const { data: leads } = await supabase.from('leads').select('*');
  return { events: events ?? [], leads: leads ?? [] };
}
