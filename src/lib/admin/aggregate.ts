// 서버 측 집계: raw events/leads → 대시보드 페이로드.
// 모든 fd 식별은 props_json.fd_id 기준(최상위 fd_id는 디바이스 UUID라 사용 금지).

import {
  FD_ORDER,
  FD_DEFS,
  FdId,
  CHECKLIST,
  SAMPLE,
  verdict,
  Verdict,
} from './config';

type Raw = Record<string, unknown>;

export interface AdminFilters {
  from?: string; // ISO date (inclusive)
  to?: string; // ISO date (inclusive, end of day)
  utm_source?: string;
}

export interface MasterRow {
  fd_id: string;
  label: string;
  visits: number;
  cta: number | null;
  start: number | null;
  complete: number | null;
  lead: number;
  intent: number | null;
  intentLabel: string | null;
  coreNum: number;
  coreDen: number;
  coreRate: number | null;
  stepRates: { pageCta: number | null; ctaComplete: number | null; completeLead: number | null };
  threshold: number | null;
  verdict: Verdict;
  sampleOk: boolean;
}

export interface FunnelStage {
  key: string;
  label: string;
  count: number;
  /** 직전 단계 대비 전환율(첫 단계는 null) */
  rateFromPrev: number | null;
  /** 직전 단계 대비 이탈률 */
  dropFromPrev: number | null;
}

export interface FunnelDetail {
  fd_id: string;
  stages: FunnelStage[];
  /** 최대 이탈 구간 stage key */
  maxDropStage: string | null;
  /** pc2-checklist 전용: 문항별 이탈 카운트 */
  questionAbandon?: Record<string, number>;
}

export interface SegmentRow {
  key: string;
  visits: number;
  lead: number;
  rate: number | null;
}

export interface AdminPayload {
  total_events: number;
  total_leads: number;
  filters: AdminFilters;
  master: MasterRow[];
  funnels: Record<string, FunnelDetail>;
  segments: {
    byUtmSource: SegmentRow[];
    byUtmMedium: SegmentRow[];
    byChannelVariant: SegmentRow[];
    byPriceVariant: SegmentRow[]; // pc1-preorder
    byUtmTerm: SegmentRow[]; // pc3-content
  };
  intents: { preorder_intent: number; subscribe_intent: number; invite_click: number; kakao_channel_click: number };
  leads: LeadRow[];
  sessions: SessionRow[];
}

export interface LeadRow {
  id: string;
  email: string;
  name: string;
  fd_id: string;
  utm_source: string;
  utm_medium: string;
  utm_term: string;
  interview_ok: boolean;
  contact: string;
  created_at: string;
}

export interface SessionRow {
  session_id: string;
  fd_id: string;
  utm_source: string;
  first_seen: string;
  event_count: number;
  event_names: string[];
}

function props(e: Raw): Raw {
  return (e.props_json as Raw) ?? {};
}

function eventFd(e: Raw): string {
  const p = props(e);
  return String(p.fd_id ?? e.fd_id ?? 'unknown');
}

function eventName(e: Raw): string {
  return String(e.event_name ?? 'unknown');
}

function rate(num: number, den: number): number | null {
  return den > 0 ? num / den : null;
}

function filterEvents(events: Raw[], f: AdminFilters): Raw[] {
  const fromMs = f.from ? Date.parse(f.from) : null;
  const toMs = f.to ? Date.parse(f.to) + 24 * 60 * 60 * 1000 - 1 : null; // 종료일 포함
  return events.filter((e) => {
    const tsRaw = (props(e).ts as string) ?? (e.ts as string);
    const ms = tsRaw ? Date.parse(tsRaw) : NaN;
    if (fromMs !== null && !(ms >= fromMs)) return false;
    if (toMs !== null && !(ms <= toMs)) return false;
    if (f.utm_source && String(props(e).utm_source ?? 'direct') !== f.utm_source) return false;
    return true;
  });
}

/** 특정 fd의 이벤트만 추림. 파생 채널 행은 channel_variant≠default만. */
function eventsForFd(events: Raw[], fd: FdId): Raw[] {
  const def = FD_DEFS[fd];
  return events.filter((e) => {
    if (eventFd(e) !== def.baseFd) return false;
    if (def.derivedChannel) {
      const cv = String(props(e).channel_variant ?? 'default');
      return cv !== 'default' && cv !== 'none' && cv !== '';
    }
    return true;
  });
}

/** event_name → 고유 session 수(분모 중복 제거). 단계 인원 집계에 사용. */
function countSessions(events: Raw[], name: string): number {
  const set = new Set<string>();
  for (const e of events) {
    if (eventName(e) === name) set.add(String(props(e).session_id ?? e.session_id ?? Math.random()));
  }
  return set.size;
}

function buildMasterRow(events: Raw[], fd: FdId): MasterRow {
  const def = FD_DEFS[fd];
  const evs = eventsForFd(events, fd);

  const visits = countSessions(evs, def.visit);
  const cta = def.cta ? countSessions(evs, def.cta) : null;
  const start = def.start ? countSessions(evs, def.start) : null;
  const complete = def.complete ? countSessions(evs, def.complete) : null;
  const lead = countSessions(evs, def.lead);
  const intent = def.intent ? countSessions(evs, def.intent) : null;

  const coreNum = countSessions(evs, def.core.num);
  const coreDen = countSessions(evs, def.core.den);
  const coreRate = rate(coreNum, coreDen);

  const sampleOk = visits >= SAMPLE.MIN_VISITS && coreDen >= SAMPLE.MIN_DENOMINATOR;

  return {
    fd_id: fd,
    label: def.label,
    visits,
    cta,
    start,
    complete,
    lead,
    intent,
    intentLabel: def.intentLabel ?? null,
    coreNum,
    coreDen,
    coreRate,
    stepRates: {
      pageCta: cta !== null ? rate(cta, visits) : null,
      ctaComplete: cta !== null && complete !== null ? rate(complete, cta) : null,
      completeLead: complete !== null ? rate(lead, complete) : null,
    },
    threshold: def.threshold,
    verdict: verdict(coreRate, def.threshold, visits, coreDen),
    sampleOk,
  };
}

function buildFunnel(events: Raw[], fd: FdId): FunnelDetail {
  const def = FD_DEFS[fd];
  const evs = eventsForFd(events, fd);

  const stageDefs: { key: string; label: string; name?: string }[] = [
    { key: 'visit', label: '방문', name: def.visit },
    { key: 'cta', label: 'CTA', name: def.cta },
    { key: 'start', label: '입력시작', name: def.start },
    { key: 'complete', label: '완주', name: def.complete },
    { key: 'lead', label: '리드', name: def.lead },
  ].filter((s) => s.name) as { key: string; label: string; name: string }[];

  const stages: FunnelStage[] = [];
  let prev: number | null = null;
  let maxDrop = -1;
  let maxDropStage: string | null = null;

  for (const s of stageDefs) {
    const count = countSessions(evs, s.name!);
    const rateFromPrev = prev !== null && prev > 0 ? count / prev : null;
    const dropFromPrev = rateFromPrev !== null ? 1 - rateFromPrev : null;
    if (dropFromPrev !== null && dropFromPrev > maxDrop) {
      maxDrop = dropFromPrev;
      maxDropStage = s.key;
    }
    stages.push({ key: s.key, label: s.label, count, rateFromPrev, dropFromPrev });
    prev = count;
  }

  const detail: FunnelDetail = { fd_id: fd, stages, maxDropStage };

  if (fd === 'pc2-checklist') {
    const qa: Record<string, number> = {};
    for (const q of CHECKLIST.sensitiveQuestions) qa[q] = 0;
    for (const e of evs) {
      if (eventName(e) === 'question_abandon') {
        const q = String(props(e).q ?? '');
        if (q in qa) qa[q] += 1;
      }
    }
    detail.questionAbandon = qa;
  }

  return detail;
}

/** pc1-preorder: variant별 price_view→preorder_intent */
function priceVariantSegment(events: Raw[]): SegmentRow[] {
  const evs = eventsForFd(events, 'pc1-preorder');
  const map: Record<string, { view: Set<string>; intent: Set<string> }> = {};
  for (const e of evs) {
    const v = String(props(e).variant ?? 'none');
    if (!map[v]) map[v] = { view: new Set(), intent: new Set() };
    const sid = String(props(e).session_id ?? '');
    if (eventName(e) === 'price_view') map[v].view.add(sid);
    if (eventName(e) === 'preorder_intent') map[v].intent.add(sid);
  }
  return Object.entries(map)
    .map(([key, v]) => ({
      key,
      visits: v.view.size,
      lead: v.intent.size,
      rate: rate(v.intent.size, v.view.size),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

/** pc3-content: utm_term(없으면 slug)별 content_view→lead */
function contentTermSegment(events: Raw[]): SegmentRow[] {
  const evs = eventsForFd(events, 'pc3-content');
  const map: Record<string, { view: Set<string>; lead: Set<string> }> = {};
  for (const e of evs) {
    const key = String(props(e).utm_term ?? props(e).slug ?? 'none');
    if (!map[key]) map[key] = { view: new Set(), lead: new Set() };
    const sid = String(props(e).session_id ?? '');
    if (eventName(e) === 'content_view') map[key].view.add(sid);
    if (eventName(e) === 'lead_submit') map[key].lead.add(sid);
  }
  return Object.entries(map)
    .map(([key, v]) => ({ key, visits: v.view.size, lead: v.lead.size, rate: rate(v.lead.size, v.view.size) }))
    .sort((a, b) => b.visits - a.visits);
}

function countEvent(events: Raw[], name: string): number {
  return events.reduce((n, e) => (eventName(e) === name ? n + 1 : n), 0);
}

export function aggregate(rawEvents: Raw[], rawLeads: Raw[], filters: AdminFilters): AdminPayload {
  const events = filterEvents(rawEvents, filters);

  const master = FD_ORDER.map((fd) => buildMasterRow(events, fd));
  const funnels: Record<string, FunnelDetail> = {};
  for (const fd of FD_ORDER) funnels[fd] = buildFunnel(events, fd);

  // 세그먼트는 전체 이벤트 기준(섹션 C는 fd 선택 시 클라이언트에서 골라 보여줌 → 여기서는 fd별 사전계산은 비용이므로
  // 채널/utm은 전체, 가격/term은 해당 fd 전용으로 제공)
  const allEvs = events;
  const segVisit = (field: string): SegmentRow[] => {
    const map: Record<string, { v: Set<string>; l: Set<string> }> = {};
    for (const e of allEvs) {
      const key = String(props(e)[field] ?? 'none');
      if (!map[key]) map[key] = { v: new Set(), l: new Set() };
      const sid = String(props(e).session_id ?? '');
      if (eventName(e) === 'page_view' || eventName(e) === 'content_view') map[key].v.add(sid);
      if (eventName(e) === 'lead_submit') map[key].l.add(sid);
    }
    return Object.entries(map)
      .map(([key, x]) => ({ key, visits: x.v.size, lead: x.l.size, rate: rate(x.l.size, x.v.size) }))
      .sort((a, b) => b.visits - a.visits);
  };

  const leads: LeadRow[] = rawLeads.map((l) => ({
    id: String(l.id ?? ''),
    email: String(l.email ?? ''),
    name: String(l.name ?? ''),
    fd_id: String(l.fd_id ?? ''),
    utm_source: String(l.utm_source ?? 'direct'),
    utm_medium: String(l.utm_medium ?? ''),
    utm_term: String(l.utm_term ?? ''),
    interview_ok: Boolean(l.interview_ok),
    contact: String(l.contact ?? ''),
    created_at: String(l.created_at ?? ''),
  }));

  const sessionMap: Record<string, { fd_id: string; utm_source: string; first_seen: string; names: Set<string>; count: number }> = {};
  for (const e of events) {
    const p = props(e);
    const sid = String(p.session_id ?? e.session_id ?? '');
    if (!sid) continue;
    const fd = eventFd(e);
    const utm = String(p.utm_source ?? 'direct');
    const ts = String(p.ts ?? e.created_at ?? '');
    if (!sessionMap[sid]) {
      sessionMap[sid] = { fd_id: fd, utm_source: utm, first_seen: ts, names: new Set(), count: 0 };
    }
    sessionMap[sid].count++;
    sessionMap[sid].names.add(eventName(e));
    if (ts && (!sessionMap[sid].first_seen || ts < sessionMap[sid].first_seen)) sessionMap[sid].first_seen = ts;
  }
  const sessions: SessionRow[] = Object.entries(sessionMap)
    .map(([sid, v]) => ({
      session_id: sid,
      fd_id: v.fd_id,
      utm_source: v.utm_source,
      first_seen: v.first_seen,
      event_count: v.count,
      event_names: Array.from(v.names),
    }))
    .sort((a, b) => b.first_seen.localeCompare(a.first_seen))
    .slice(0, 200);

  return {
    total_events: events.length,
    total_leads: leads.length,
    filters,
    master,
    funnels,
    segments: {
      byUtmSource: segVisit('utm_source'),
      byUtmMedium: segVisit('utm_medium'),
      byChannelVariant: segVisit('channel_variant'),
      byPriceVariant: priceVariantSegment(events),
      byUtmTerm: contentTermSegment(events),
    },
    intents: {
      preorder_intent: countEvent(events, 'preorder_intent'),
      subscribe_intent: countEvent(events, 'subscribe_intent'),
      invite_click: countEvent(events, 'invite_click'),
      kakao_channel_click: countEvent(events, 'kakao_channel_click'),
    },
    leads,
    sessions,
  };
}

/** 클라이언트 필터용: 존재하는 utm_source 목록 */
export function utmSourceOptions(rawEvents: Raw[]): string[] {
  const set = new Set<string>();
  for (const e of rawEvents) set.add(String(props(e).utm_source ?? 'direct'));
  return Array.from(set).sort();
}
