export interface LeadData {
  fd_id: string;
  session_id: string;
  email: string;
  name?: string;
  channel?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  channel_variant?: string;
  price_variant?: string;
  consent: boolean;
  /** 후속 인터뷰(5분 통화) 가능 여부 */
  interview_ok?: boolean;
  /** 인터뷰용 연락처(전화/카카오 ID 등). 선택. */
  contact?: string;
  extra_json?: Record<string, unknown>;
}

export async function saveLead(data: LeadData): Promise<void> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const errorMsg = (errorBody as Record<string, unknown>).error || `HTTP ${res.status}`;
    throw new Error(`Lead save failed: ${errorMsg}`);
  }
}
