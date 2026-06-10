# 유가족 사후관리 — Fake Door MVP

유가족을 위한 상속·행정·가족 협력 서비스의 수요를 측정하는 Fake Door 테스트 9종입니다.

## 로컬 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env.local
# .env.local에서 ADMIN_PASSWORD 설정 (기본값: admin1234)

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000
```

**Supabase/PostHog 없이도 즉시 실행됩니다.** 이벤트는 콘솔에 출력되고, 데이터는 `data/events.jsonl`, `data/leads.jsonl`에 저장됩니다.

## 9개 라우트

| 라우트 | 설명 |
|--------|------|
| `/fd/pc1-quiz` | 상속 리스크 5문항 자가진단 (`?ch=search\|community\|partner`) |
| `/fd/pc1-preorder` | 전문가 리포트 가격 A/B 사전예약 |
| `/fd/pc2-checklist` | 상황별 맞춤 30일 체크리스트 생성 |
| `/fd/pc2-subscribe` | 카카오 행정 알림 구독 |
| `/fd/pc2-kakao` | 카카오 컨시어지 랜딩 |
| `/fd/pc3-settle` | 부의금 정산기 (미리보기 + 리드) |
| `/fd/pc3-board` | 가족 역할 보드 (초대 의향 측정) |
| `/fd/pc3-content/burial-fund-split` | 부의금 분배 가이드 콘텐츠 |
| `/fd/pc3-content/inheritance-checklist` | 상속 한정승인 가이드 콘텐츠 |
| `/fd/pc3-content/admin-chaos` | 사후 2주 행정 총정리 콘텐츠 |
| `/admin` | 퍼널 대시보드 |

## 환경 변수 (.env.local)

```env
# PostHog (없으면 콘솔 출력)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Supabase (없으면 data/*.jsonl에 저장)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# 관리자 비밀번호
ADMIN_PASSWORD=admin1234

# 카카오 채널 링크
NEXT_PUBLIC_KAKAO_CHANNEL_URL=https://pf.kakao.com/_xxxxx
```

## Supabase 스키마

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  fd_id text, session_id text, email text, name text,
  channel text, utm_source text, utm_medium text,
  utm_campaign text, utm_term text,
  channel_variant text, price_variant text,
  consent boolean, extra_json jsonb,
  created_at timestamptz default now()
);

create table events (
  id uuid default gen_random_uuid() primary key,
  fd_id text, session_id text, event_name text,
  props_json jsonb, ts timestamptz default now()
);
```

## Vercel 배포

```bash
npm i -g vercel
vercel
```

환경 변수는 Vercel 대시보드 → **Settings → Environment Variables**에서 설정합니다.
`.env.local`은 Git/배포에 포함되지 않으므로, **여기에 등록하지 않은 변수는 프로덕션에서 `undefined`** 가 됩니다.

### 필수: 관리자 로그인 (`/admin`)

| 이름 | 값 | Environment |
|------|----|-------------|
| `ADMIN_PASSWORD` | 원하는 관리자 비밀번호 | Production (필요 시 Preview도) |

- **미설정 시 배포본에서 로그인이 무조건 실패합니다** (서버가 `undefined`와 비교 → 항상 401). 서버 로그에 `[admin] ADMIN_PASSWORD env not set` 이 남습니다.
- 값에 **따옴표·앞뒤 공백을 넣지 마세요.** (예: `"admin1234"` ❌ → `admin1234` ✅). 코드가 방어적으로 정리하긴 하지만 깔끔히 넣는 게 안전합니다.
- 변경 후에는 **재배포(Redeploy)** 해야 새 값이 반영됩니다.
- 로컬에서는 env 없이도 기본값 `admin1234`로 로그인됩니다(개발 모드 한정). 프로덕션에는 기본값이 적용되지 않습니다.

> Vercel CLI로 등록: `vercel env add ADMIN_PASSWORD production`

### 권장: 도메인·공개범위

| 이름 | 값 | 설명 |
|------|----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://<배포도메인>` | OG 이미지·robots·sitemap의 절대경로 기준. 미설정 시 `gcs-final-project.vercel.app`로 폴백(localhost로 나가지 않음). |
| `ACTIVE_PCS` | `pc1` | 공개할 티어(콤마 구분). 기본 `pc1`만 공개, pc2-*·pc3-*는 프로덕션에서 `/`로 리다이렉트. `pc1,pc2`로 바꾸면 PC2 재공개. |

## 데이터 확인

```bash
# 이벤트 로그
cat data/events.jsonl

# 관리자 대시보드
open http://localhost:3000/admin
```

## 문서

- `docs/EVENTS.md` — 이벤트 사전
- `docs/METRICS.md` — FD별 핵심 지표·통과 기준
