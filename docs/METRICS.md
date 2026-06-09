# 핵심 지표 및 통과 기준 (Metrics & Pass Criteria)

| FD | 라우트 | 핵심 이벤트 퍼널 | 통과 기준 |
|----|--------|------------------|-----------|
| pc1-quiz | `/fd/pc1-quiz` | `quiz_complete` → `lead_submit` | ≥40% |
| pc1-preorder | `/fd/pc1-preorder` | `price_view` → `preorder_intent` | ≥8~10% (variant별 비교) |
| pc1-channel | pc1-quiz + UTM 레이어 | 채널별 CPL 비교 | 목표 CPL 이하 채널 ≥1 |
| pc2-checklist | `/fd/pc2-checklist` | `form_start` → `form_complete` | ≥50% |
| pc2-checklist | `/fd/pc2-checklist` | `form_complete` → `lead_submit` | ≥35% |
| pc2-subscribe | `/fd/pc2-subscribe` | `page_view` → `subscribe_intent` | 목표치 설정 후 비교 |
| pc2-kakao | `/fd/pc2-kakao` | `page_view` → `kakao_channel_click` | 목표치 설정 후 비교 |
| pc3-settle | `/fd/pc3-settle` | `tool_start` → `lead_submit` | 목표치 설정 후 비교 |
| pc3-board | `/fd/pc3-board` | `board_create_attempt` → `invite_click` | 목표치 설정 후 비교 |
| pc3-content | `/fd/pc3-content/[slug]` | `content_view` → `lead_submit` | `utm_term`별 비교 |

---

## 측정 방법

### 로컬 환경 (Supabase 없음)
```bash
# 이벤트 확인
cat data/events.jsonl | jq 'select(.event_name == "quiz_complete")'

# 퍼널 전환율 계산
# quiz_complete 수 / lead_submit 수
cat data/events.jsonl | jq -s 'map(select(.event_name)) | group_by(.event_name) | map({event: .[0].event_name, count: length})'
```

### /admin 대시보드
`http://localhost:3000/admin` → 비밀번호 입력 (`.env.local`의 `ADMIN_PASSWORD`)

### PostHog (연동 후)
- Funnel 리포트: pc1-quiz 퍼널 (`quiz_start` → `quiz_complete` → `lead_submit`)
- UTM 분해: Properties → `utm_source`, `channel_variant` 기준 필터

---

## A/B 테스트 해석

### 가격 variant (pc1-preorder)
- `preorder_intent` 이벤트의 `variant` 속성으로 A/B/C 구분
- 통계적 유의성: 각 variant별 최소 100 노출 후 판단

### 채널 variant (pc1-quiz ?ch=)
- `channel_variant` 속성으로 search/community/partner 구분
- CPL = 광고비 / `lead_submit` 수
