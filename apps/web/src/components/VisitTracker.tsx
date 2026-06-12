'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trpc } from '@/lib/trpc';

// 페이지 진입 시 접속 기록을 남긴다 (관리자 대시보드에서 확인).
export function VisitTracker() {
  const pathname = usePathname();
  const log = trpc.tracking.log.useMutation();

  useEffect(() => {
    log.mutate({
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    });
    // pathname이 바뀔 때마다 1회만 기록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
