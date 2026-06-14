'use client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { I18nextProvider } from 'react-i18next';
import { trpc } from './trpc';
import { createI18n } from './i18n';
import { defaultLocale, type Locale } from '@maeum/i18n';
import { VisitTracker } from '@/components/VisitTracker';
import { MarketingPixels } from '@/components/MarketingPixels';
import { ToastProvider } from '@/components/Toast';

export function Providers({ children, initialLocale = defaultLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [i18nInstance] = useState(() => createI18n(initialLocale));
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
    <I18nextProvider i18n={i18nInstance}>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <VisitTracker />
          <MarketingPixels />
          {children}
        </ToastProvider>
      </QueryClientProvider>
    </trpc.Provider>
    </I18nextProvider>
  );
}
