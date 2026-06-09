'use client';

import { useEffect } from 'react';
import { initUtm } from '@/lib/utm';

export default function PostHogInit() {
  useEffect(() => {
    initUtm();

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
        capture_pageview: true,
      });
      (window as Window & { posthog?: typeof posthog }).posthog = posthog;
    });
  }, []);

  return null;
}
