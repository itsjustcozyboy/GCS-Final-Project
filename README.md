# 토닥 (To-dak)

매일 질문 하나로 부모님의 이야기를 모아 한 권의 책으로 남기는 서비스. Turborepo 모노레포(`apps/web`, `packages/*`).

> 서비스명 표기: 한국어 **토닥**, 영어 **To-dak**. 내부 식별자(코드 스코프 `@maeum/*`, 쿠키 `maeum_aid`, 배포 슬러그 `maeum-itgi`)는 기능 안정성을 위해 그대로 둔다 — 도메인/슬러그 변경은 별도 작업.

## 랜딩 스크린샷 교체

랜딩 "이렇게 이어져요" 섹션의 단계별 화면은 `apps/web/public/landing/step1~3.png` 회색 placeholder다. 실제 앱 화면을 같은 파일명(권장 9:19.5 세로, 540×1170 이상)으로 덮어쓰면 반영된다. 자세한 안내: [`apps/web/public/landing/README.md`](apps/web/public/landing/README.md).

## 개발 시작

```bash
pnpm install
cp .env.example apps/web/.env.local   # 값 채우기 (.env.local 은 git 무시됨)
pnpm db:push                          # Prisma 스키마를 로컬 DB에 반영
pnpm dev                              # http://localhost:3000
```

환경변수는 `.env.example` 참고. 비밀키·자격증명은 **`.env.local`(git 무시) 또는 Vercel 환경변수**로만 두고, 소스/커밋에 평문으로 넣지 않는다.

## 관리자(Admin) 권한 부여

관리자는 **DB의 `Admin` 테이블**로 관리하며, 이메일 화이트리스트 환경변수로 부트스트랩한다. 소스코드에 이메일을 하드코딩하지 않는다.

관리자 자격은 **화이트리스트(`ADMIN_EMAILS*`) ↔ 비밀번호(`ADMIN_PASSWORD*`) 쌍("세트")** 으로 관리한다. 접미사로 세트를 여러 개 둘 수 있어, 관리자마다 **독립된 비밀번호**를 줄 수 있다.

1. **화이트리스트에 이메일 추가** — 같은 세트의 `ADMIN_EMAILS*`(쉼표 구분)에 관리자 이메일을 넣는다.
   - 로컬: `apps/web/.env.local`
   - 운영: Vercel 프로젝트 환경변수 (Production/Preview/Development)
   ```
   # 세트 1
   ADMIN_EMAILS=leokor5069@gmail.com
   ADMIN_PASSWORD=<강한 무작위 비밀번호 1>
   # 세트 2 (다른 관리자 — 독립 비밀번호)
   ADMIN_EMAILS2=taei518@gmail.com
   ADMIN_PASSWORD2=<강한 무작위 비밀번호 2>
   ```
2. **강한 관리자 비밀번호 설정** — 각 `ADMIN_PASSWORD*`에 **길고 무작위한** 값을 넣는다.
   ```bash
   openssl rand -base64 24   # 강한 임시 비밀번호 생성
   ```
   - 어떤 세트든 그 세트의 이메일 + 그 세트의 비밀번호로 로그인하면 계정이 없어도 자동 생성되고 `Admin` 행이 등록된다(`packages/api/src/routers/auth.ts`). 즉 `taei518@gmail.com`은 `ADMIN_PASSWORD2`로 로그인한다.
3. **로그인 확인** — 해당 계정으로 로그인 후 `/admin` 접근, 문의/방문 로그 관리가 되는지 확인한다. 일반 계정은 `/admin` 접근이 차단된다(`adminProcedure` → `Admin` 테이블 검증).

### ⚠️ 보안 주의 (반드시 준수)

- **`123456` 등 약한 비밀번호를 관리자에 쓰지 않는다.** 관리자는 전체 사용자 개인정보에 접근하므로 자동 공격의 1차 표적이다.
- `ADMIN_PASSWORD`/키는 **평문으로 코드·설정 파일에 하드코딩하지 않는다.** 개발/테스트로 임시 약한 값을 썼더라도 **운영 배포 전 반드시 강한 무작위 값으로 교체**한다.
- 초기 비밀번호는 강한 임시값으로 설정하고, 운영 시작 시점에 교체한다.
- TODO(보안 강화): 관리자 로그인 실패 제한(lockout) + 2단계 인증(2FA/TOTP) 도입 — `auth.ts` 참고.

## 방문자 전환율(퍼널) 추적

익명 방문자 → 가입/로그인 전환을 **직접 구축 DB로 1차 측정**한다(광고 픽셀은 보조).

- **익명 식별:** 미들웨어(`apps/web/src/middleware.ts`)가 첫 방문에 `maeum_aid`(httpOnly) 쿠키로 무작위 anonymousId를 발급. 방문은 서버에서 `VisitorEvent`/`Visitor`에 적재(UTM·기기·referrer·ipHash). **IP 원문은 저장하지 않고 해시만**, 이름/이메일/원문 IP는 로그인+분석동의 후 `AccessLog`에만.
- **전환:** 가입(`signup_completed`)·로그인(`first_login`) 시 anonymousId ↔ user_id를 연결(`Visitor.convertedUserId`, `ConversionEvent`).
- **대시보드:** `/admin` → "📈 방문자 분석" — 총 방문자/전환/전환율, 채널별(first-touch) 표, 일자별 추이, 비로그인/전환 목록.

### 링크 배포 시 UTM 규칙 (운영자 필수)

채널마다 **일관된 UTM**을 붙여야 채널별 전환율이 정확하다. URL 뒤에 쿼리로 추가:

| 채널 | 예시 |
|---|---|
| Meta 광고 | `?utm_source=meta&utm_medium=cpc&utm_campaign=launch_2026_06` |
| 커뮤니티 A 게시글 | `?utm_source=community_a&utm_medium=post&utm_campaign=launch` |
| 인스타 프로필 링크 | `?utm_source=instagram&utm_medium=bio&utm_campaign=launch` |
| 카카오 채널 | `?utm_source=kakao&utm_medium=message&utm_campaign=launch` |

- `utm_source`(필수): 채널명 — 채널별 표의 집계 기준.
- `utm_medium`: 매체 유형(cpc/post/bio/message 등). `utm_campaign`: 캠페인 식별.
- UTM이 없으면 `direct`로 분류. Meta는 `fbclid`, Google은 `gclid`도 자동 캡처(→ meta/google로 귀속).
- 첫 진입 출처는 **first-touch**로 고정(덮어쓰지 않음), 최근 출처는 last-touch로 갱신.

### 광고 픽셀 (Meta / GA4) — 동의 기반 보조

- `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID` 설정 시에만 활성. 미설정이면 동의 배너·픽셀 모두 비활성(앱 정상).
- **쿠키·광고 추적 동의 배너**(`MarketingPixels`)에서 "동의" 전에는 픽셀을 로드하지 않고 이벤트도 보내지 않는다. 표준 이벤트는 PageView, CompleteRegistration(가입완료)만.
- 픽셀은 광고 최적화용 보조 지표일 뿐, 정확한 수치는 위 대시보드(우리 DB)를 기준으로 본다.

## 배포 (Vercel)

- git 커밋 푸시 시 자동 배포된다(프로덕션 도메인: https://maeum-itgi.vercel.app).
- 스키마는 빌드 단계의 `packages/db/prisma/prod-sync.sql`(멱등 DDL)로 운영 DB에 반영된다. `schema.prisma` 변경 시 이 파일에 멱등 DDL을 추가한다.
- AI 키 우선순위: `GOOGLE_AI_API_KEY`/`GEMINI_API_KEY`(Gemini 2.5 Flash) → `ANTHROPIC_API_KEY` → 없으면 Mock 폴백. 키는 **서버 전용**.
