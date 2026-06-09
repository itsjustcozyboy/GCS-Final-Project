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
  extra_json?: Record<string, unknown>;
}

export async function saveLead(data: LeadData): Promise<void> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('lead save failed');
}
