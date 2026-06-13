'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// 광고 픽셀(Meta/GA)은 보조 지표일 뿐 1차 신뢰 소스는 우리 DB(직접 구축)다.
// 동의 기반 로딩: 광고/쿠키 추적 동의 전에는 픽셀을 로드하지 않고 이벤트도 보내지 않는다.
// 픽셀 ID(NEXT_PUBLIC_*)가 없으면 배너도 픽셀도 비활성 — 앱은 정상 동작.
const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = 'maeum_ad_consent'; // 'granted' | 'denied'
const PIXELS_CONFIGURED = !!(META_ID || GA_ID);

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __maeumPixelsLoaded?: boolean;
  }
}

export function hasAdConsent(): boolean {
  return typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'granted';
}

// 표준 전환 이벤트(가입 완료) — 동의 + 로드된 경우에만 발화
export function trackCompleteRegistration(): void {
  if (!hasAdConsent()) return;
  window.fbq?.('track', 'CompleteRegistration');
  window.gtag?.('event', 'sign_up');
}

function loadPixels(): void {
  if (typeof window === 'undefined' || window.__maeumPixelsLoaded) return;
  window.__maeumPixelsLoaded = true;

  if (META_ID) {
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq?.('init', META_ID);
    window.fbq?.('track', 'PageView');
  }

  if (GA_ID) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    const gtag = function () {
      window.dataLayer!.push(arguments);
    } as (...args: any[]) => void;
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function MarketingPixels() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(localStorage.getItem(CONSENT_KEY));
  }, []);

  useEffect(() => {
    if (consent === 'granted' && PIXELS_CONFIGURED) loadPixels();
  }, [consent]);

  // 라우트 변경 시 PageView (동의 + 로드된 경우에만)
  useEffect(() => {
    if (consent !== 'granted' || !window.__maeumPixelsLoaded) return;
    window.fbq?.('track', 'PageView');
    if (GA_ID) window.gtag?.('event', 'page_view', { page_path: pathname });
  }, [pathname, consent]);

  // 픽셀 미설정이거나 이미 선택했으면 배너 숨김
  if (!mounted || !PIXELS_CONFIGURED || consent) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          서비스 개선과 광고 효과 측정을 위해 쿠키·광고 추적을 사용해도 될까요? 동의하지 않아도 서비스 이용에는 영향이 없어요.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, 'denied');
              setConsent('denied');
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-500"
          >
            거부
          </button>
          <button
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, 'granted');
              setConsent('granted');
            }}
            className="px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
