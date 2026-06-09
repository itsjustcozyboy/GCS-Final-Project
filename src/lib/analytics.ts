'use client';

import { getFdId, getSessionId } from './session';
import { getUtm } from './utm';

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
      identify: (id: string) => void;
    };
  }
}

export function track(event: string, props?: Record<string, unknown>): void {
  const fd_id = getFdId();
  const session_id = getSessionId();
  const utm = getUtm();

  const payload = {
    fd_id,
    session_id,
    ts: new Date().toISOString(),
    ...utm,
    ...props,
  };

  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, payload);
  } else {
    console.log('[track]', event, payload);
  }

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name: event, fd_id, session_id, props_json: payload }),
  }).catch(() => {});
}
