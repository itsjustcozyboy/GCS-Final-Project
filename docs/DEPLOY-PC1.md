# PC1 배포 가이드 (자가진단 → 사전예약)

PC1은 **하나의 흐름**입니다. 사용자에게 뿌리는 링크는 **PC1-1 자가진단(`/fd/pc1-quiz`) 하나**뿐입니다.

- **PC1-1 자가진단** = 유일한 진입점 (색인 허용)
- **PC1-2 사전예약** = 진단 결과 화면 뒤에 자동으로 이어짐 (독립 배포 X)
- **PC1-3 채널 분기** = 별도 페이지가 아니라 `?ch=` 값으로 PC1-1 헤드라인만 분기

> PC2·PC3 라우트와 통합 메뉴(`/`)는 기본 `noindex`(데모/내부용). 검색·공유에는 `/fd/pc1-quiz`만 노출됩니다.

---

## 1. 배포 전 체크리스트

- [ ] `.env.local`에 `ADMIN_PASSWORD` 설정 (관리자/링크 빌더 보호)
- [ ] `NEXT_PUBLIC_SITE_URL`에 실제 배포 도메인 설정 (OG 이미지 절대경로 해석용. 미설정 시 `http://localhost:3000`)
- [ ] (선택) Supabase 사용 시 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정. 미설정 시 `data/*.jsonl` stub로 동작
- [ ] `npm run build` 통과 확인
- [ ] `/fd/pc1-quiz` 진입 → 진단 → 결과 → 무료 리포트 신청 → 사전예약까지 한 흐름 동작 확인
- [ ] 카톡/슬랙에 링크 붙여 **OG 미리보기**(제목/설명/이미지) 노출 확인
- [ ] `/admin` 로그인 → 상단 **PC1 현황 카드** 표시 확인
- [ ] `/admin/links`에서 채널별 링크 생성·복사·QR 동작 확인
- [ ] 결제/실서비스 코드 없음(Fake Door): 사전예약 버튼은 의향만 기록하고 "지금은 과금되지 않습니다" 고지

---

## 2. 채널별 UTM 링크 예시

`/admin/links`에서 프리셋 선택 후 키워드만 바꿔 생성하는 것을 권장합니다. 수동 예시:

| 채널 | 링크 |
|---|---|
| 검색 광고 | `https://<도메인>/fd/pc1-quiz?ch=search&utm_source=google&utm_medium=cpc&utm_campaign=pc1&utm_term=상속포기` |
| 커뮤니티/SNS | `https://<도메인>/fd/pc1-quiz?ch=community&utm_source=naver_cafe&utm_medium=social&utm_campaign=pc1` |
| 추천/파트너 | `https://<도메인>/fd/pc1-quiz?ch=referral&utm_source=partner&utm_medium=referral&utm_campaign=pc1` |

- `ch` = 헤드라인 분기 (`search` | `community` | `referral`). 문구는 `src/lib/pc1-content.ts`에서 교체.
- `utm_*` = 유입 분석용. 첫 진입 시 저장되어 **진단→사전예약 내내 보존**되고 모든 이벤트·리드에 부착됩니다.

---

## 3. 결과 해석 가이드

`/admin` 상단 **PC1 현황 카드**에서 한눈에 판단합니다.

### 표본 충분 여부 먼저 확인
- **방문 < 100** 또는 **진단완주 < 15** → ⚪ **"전환율 판단 보류"**. 트래픽을 더 모은 뒤 판단하세요.

### 표본이 충분하면
| 신호 | 조건 |
|---|---|
| 🟢 **수요 신호 양호** | 완주→신청 **≥ 40%** **그리고** 사전예약의향(price_view→preorder_intent) **≥ 8~10%** |
| 🟡 **주의** | 위 두 기준 중 일부만 충족 |
| 🔴 **미달** | 방문→신청 **< 15%** (진입 대비 신청이 너무 적음 → 메시지/타겟 재검토) |

### 채널 비교
- 카드 하단 `utm_source별 (방문 / 리드)`로 채널별 효율을 비교하고, 좋은 채널에 예산을 집중하세요.
- 더 자세한 분해(utm_medium / 가격 variant / 키워드)는 `/admin` 섹션 C 참고.

---

## 4. 후속 인터뷰

- 리드 폼의 "5분 통화 가능?(선택)" 체크 + 연락처가 리드에 `interview_ok` / `contact`로 저장됩니다.
- `/admin` 섹션 D에서 **"인터뷰 가능만"** 필터 → **인터뷰 리드 CSV**로 내보내 후속 인터뷰 대상자를 확보하세요.

---

## 5. 주의 (Fake Door 원칙)

- 실제 결제·서비스 제공 금지. 사전예약은 **의향 기록 + 대기등록**까지만.
- 사용자에게 "지금은 과금되지 않습니다 / 베타 오픈 시 우선 안내"를 명확히 고지합니다(모달·문구에 반영됨).
