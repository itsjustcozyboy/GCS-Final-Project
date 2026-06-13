'use client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './trpc';
import { VisitTracker } from '@/components/VisitTracker';
import { MarketingPixels } from '@/components/MarketingPixels';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // 항상 현재 origin 기준 상대 경로로 호출한다.
          // 절대 URL(NEXT_PUBLIC_APP_URL)을 쓰면 배포별 URL에서 접속 시
          // cross-origin이 되어 CORS preflight 실패로 모든 요청이 막힌다.
          url: '/api/trpc',
          headers() {
            const token = typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null;
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <VisitTracker />
        <MarketingPixels />
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
