import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '../.env.local');

dotenv.config({ path: envPath });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 환경변수가 없습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const schema = `
-- events 테이블
create table if not exists public.events (
  id bigint primary key generated always as identity,
  name text not null,
  fd_id text,
  properties jsonb,
  created_at timestamp with time zone default now()
);

-- leads 테이블
create table if not exists public.leads (
  id bigint primary key generated always as identity,
  fd_id text,
  session_id text,
  email text not null,
  name text,
  channel text,
  consent boolean,
  price_variant text,
  interview_ok boolean,
  contact text,
  extra_json jsonb,
  created_at timestamp with time zone default now()
);

-- RLS 정책
alter table public.events enable row level security;
alter table public.leads enable row level security;

drop policy if exists "public can insert events" on public.events;
drop policy if exists "public can insert leads" on public.leads;

create policy "public can insert events" on public.events
for insert to anon with check (true);

create policy "public can insert leads" on public.leads
for insert to anon with check (true);
`;

async function setup() {
  try {
    console.log('📡 Supabase에서 SQL 실행 중...');

    const { error } = await supabase.rpc('execute_sql', {
      sql: schema,
    }).catch(() => {
      return { error: { message: 'rpc_not_available' } };
    });

    if (error?.message === 'rpc_not_available') {
      console.log('⚠️  RPC를 통한 SQL 실행이 불가능합니다.');
      console.log('\n📋 다음 SQL을 Supabase 대시보드의 SQL Editor에서 수동으로 실행해주세요:\n');
      console.log(schema);
      process.exit(0);
    }

    if (error) {
      console.error('❌ 에러:', error);
      process.exit(1);
    }

    console.log('✅ 테이블이 성공적으로 생성되었습니다!');
  } catch (err) {
    console.error('❌ 실패:', err.message);
    process.exit(1);
  }
}

setup();
