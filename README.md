# 마음 잇기 (maeum-itgi)

매일 질문 하나로 부모님의 이야기를 모아 한 권의 책으로 남기는 서비스. Turborepo 모노레포(`apps/web`, `packages/*`).

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

## 배포 (Vercel)

- git 커밋 푸시 시 자동 배포된다(프로덕션 도메인: https://maeum-itgi.vercel.app).
- 스키마는 빌드 단계의 `packages/db/prisma/prod-sync.sql`(멱등 DDL)로 운영 DB에 반영된다. `schema.prisma` 변경 시 이 파일에 멱등 DDL을 추가한다.
- AI 키 우선순위: `GOOGLE_AI_API_KEY`/`GEMINI_API_KEY`(Gemini 2.5 Flash) → `ANTHROPIC_API_KEY` → 없으면 Mock 폴백. 키는 **서버 전용**.
