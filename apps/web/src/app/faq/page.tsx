import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocale } from '@/lib/i18n-server';
import { resources } from '@maeum/i18n';

export const metadata: Metadata = { title: '자주 묻는 질문 — 마음 잇기 / FAQ — Maeum Itgi' };

export default async function FaqPage() {
  const locale = await getLocale();
  const f = resources[locale].faq;
  const items = f.items as ReadonlyArray<{ q: string; a: string }>;

  return (
    <main className="min-h-dvh px-4 py-10 sm:px-6 sm:py-12 max-w-2xl mx-auto break-keep" style={{ background: 'var(--color-background)' }}>
      <Link href="/profile" className="inline-flex items-center min-h-11 text-sm text-gray-400 hover:text-gray-600">{f.back}</Link>

      <h1 className="text-2xl font-bold mt-6 mb-8" style={{ color: 'var(--color-primary-dark)' }}>{f.heading}</h1>

      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm">
            <summary className="flex items-start gap-3 px-5 py-4 cursor-pointer list-none text-base font-medium text-gray-900">
              <span className="font-bold shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden>
                Q{i + 1}.
              </span>
              <span className="flex-1">{item.q}</span>
              <span className="text-gray-300 transition-transform group-open:rotate-90" aria-hidden>›</span>
            </summary>
            <p className="px-5 pb-5 pl-12 text-[15px] leading-relaxed text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center space-y-3">
        <p className="text-base font-medium text-gray-900">{f.ctaTitle}</p>
        <p className="text-sm text-gray-500">{f.ctaSubtitle}</p>
        <Link
          href="/profile/inquiry"
          className="inline-flex min-h-12 items-center justify-center px-6 py-3 rounded-2xl text-white text-base font-semibold"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {f.ctaButton}
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        {f.emailHint}{' '}
        <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
      </p>
    </main>
  );
}
