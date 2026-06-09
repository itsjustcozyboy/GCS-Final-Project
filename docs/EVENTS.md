# 이벤트 사전 (Events Dictionary)

모든 이벤트에는 다음 공통 속성이 자동 부착됩니다:
`fd_id, session_id, ts, utm_source, utm_medium, utm_campaign, utm_term, channel_variant`

---

## 공통 퍼널 이벤트

| 이벤트 | 속성 | 설명 | 단계 |
|--------|------|------|------|
| `page_view` | `fd_id` | 페이지 진입 | 노출 |
| `cta_click` | `cta_id` | 주요 CTA 버튼 클릭 | 관심 |
| `lead_submit` | `channel` | 리드 폼 제출 완료 | 전환 |

---

## PC1 — 상속 리스크 내비게이터

| 이벤트 | 속성 | 설명 |
|--------|------|------|
| `quiz_start` | — | 퀴즈 시작 |
| `quiz_answer` | `q, choice` | 개별 문항 응답 |
| `quiz_complete` | `band` | 퀴즈 완료 + 결과 band (green/yellow/red) |
| `result_view` | `band` | 결과 화면 노출 |
| `result_item_click` | `item` | 위험 항목 클릭 (debt/deadline/assets/admin) |
| `price_view` | `variant` | 가격 화면 노출 (A/B/C) |
| `preorder_intent` | `variant` | 사전예약 버튼 클릭 |

---

## PC2 — 사후 행정 코디네이터

| 이벤트 | 속성 | 설명 |
|--------|------|------|
| `form_start` | — | 체크리스트 폼 시작 |
| `form_complete` | — | 체크리스트 폼 완료 |
| `question_abandon` | `q` | 민감 문항에서 30초 이상 체류 후 이탈 |
| `subscribe_intent` | `plan` | 구독 시작 클릭 (monthly/onetime) |
| `kakao_channel_click` | — | 카카오 채널 추가 버튼 클릭 |

---

## PC3 — 가족 역할분담·부의금 정리

| 이벤트 | 속성 | 설명 |
|--------|------|------|
| `tool_start` | — | 정산기 계산 시작 |
| `tool_compute` | `total, funeral, heirs` | 계산 실행 |
| `preview_view` | — | 미리보기 결과 표시 |
| `board_create_attempt` | — | 가족 보드 만들기 클릭 |
| `invite_click` | — | 가족 초대 클릭 (핵심 지표) |
| `content_view` | `slug` | 콘텐츠 페이지 진입 |
| `content_cta_click` | `slug` | 콘텐츠 말미 CTA 클릭 |
