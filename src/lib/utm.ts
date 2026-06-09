'use client';

const UTM_KEY = 'utm_params';

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  channel_variant?: string;
}

export function extractUtmFromUrl(): UtmParams {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  if (params.get('utm_source')) utm.utm_source = params.get('utm_source')!;
  if (params.get('utm_medium')) utm.utm_medium = params.get('utm_medium')!;
  if (params.get('utm_campaign')) utm.utm_campaign = params.get('utm_campaign')!;
  if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!;
  if (params.get('ch')) utm.channel_variant = params.get('ch')!;
  return utm;
}

export function saveUtm(utm: UtmParams): void {
  if (typeof window === 'undefined') return;
  const existing = getUtm();
  const merged = { ...existing, ...utm };
  localStorage.setItem(UTM_KEY, JSON.stringify(merged));
}

export function getUtm(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(UTM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function initUtm(): UtmParams {
  const fromUrl = extractUtmFromUrl();
  if (Object.keys(fromUrl).length > 0) {
    saveUtm(fromUrl);
    return fromUrl;
  }
  return getUtm();
}
