'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trpc } from '@/lib/trpc';

// 페이지 진입 시 접속 기록을 남긴다 (관리자 대시보드에서 확인).
export function VisitTracker() {
  const pathname = usePathname();
  const log = trpc.tracking.log.useMutation();
  const heartbeat = trpc.tracking.heartbeat.useMutation();

  useEffect(() => {
    // UTM·클릭ID는 진입 URL의 쿼리에서 파싱 (first-touch 저장은 서버가 처리)
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const get = (k: string) => params.get(k) || undefined;
    log.mutate({
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      utmSource: get('utm_source'),
      utmMedium: get('utm_medium'),
      utmCampaign: get('utm_campaign'),
      utmContent: get('utm_content'),
      utmTerm: get('utm_term'),
      fbclid: get('fbclid'),
      gclid: get('gclid'),
    });
    // pathname이 바뀔 때마다 1회만 기록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || !localStorage.getItem('sessionToken')) return;

    heartbeat.mutate();
    const id = window.setInterval(() => {
      if (localStorage.getItem('sessionToken')) heartbeat.mutate();
    }, 45_000);

    return () => window.clearInterval(id);
    // heartbeat mutation identity is stable enough for this app-level tracker.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
