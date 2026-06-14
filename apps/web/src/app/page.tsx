import { LanguageToggle } from '@/components/LanguageToggle';
import Link from 'next/link';
import { AdminLink } from '@/components/AdminLink';
import { HowItWorks } from '@/components/HowItWorks';
import { Reveal } from '@/components/Reveal';
import { getServerT } from '@/lib/i18n-server';

const VALUE_ICONS = ['🌱', '💬', '📚'];

export default async function Home() {
  const t = await getServerT('common');
  const values = ['1', '2', '3'].map((n, i) => ({
    icon: VALUE_ICONS[i],
    title: t(`landing.values.${n}.title`),
    desc: t(`landing.values.${n}.desc`),
  }));

  return (
    <main className="min-h-dvh" style={{ background: 'var(--color-background)' }}>
      <div className="w-full max-w-5xl mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:py-20 space-y-12 sm:space-y-16">
        <div className="flex justify-end"><LanguageToggle /></div>
        {/* 1. 히어로 */}
        <section className="max-w-2xl mx-auto text-center space-y-5 break-keep">
          <div className="text-4xl sm:text-5xl" aria-hidden>💌</div>
          <h1 className="text-[26px] sm:text-[32px] md:text-4xl leading-snug font-bold text-balance" style={{ color: 'var(--color-primary-dark)' }}>
            {t('landing.hero.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-balance">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-3 pt-2">
            <Link
              href="/onboarding"
              className="flex min-h-12 w-full sm:w-auto items-center justify-center px-6 py-3 rounded-2xl text-white text-base sm:text-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {t('landing.hero.start')}
            </Link>
            <Link
              href="/login"
              className="flex min-h-12 w-full sm:w-auto items-center justify-center px-6 py-3 rounded-2xl font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              {t('landing.hero.haveAccount')}
            </Link>
          </div>
          <AdminLink />
        </section>

        {/* 2. 작동 방식 (스크롤 시퀀스 + 스크린샷) */}
        <HowItWorks />

        {/* 3. 핵심 가치 */}
        <section className="space-y-6 break-keep">
          <Reveal>
            <h2 className="text-center text-xl font-bold text-gray-900">{t('landing.values.heading')}</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={i} delayMs={i * 100} className="h-full">
                <div className="flex h-full gap-3 sm:gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                  <span className="shrink-0 text-2xl mt-0.5" aria-hidden>{v.icon}</span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-gray-900">{v.title}</p>
                    <p className="text-[15px] text-gray-500 mt-0.5 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 4. 현재 응답 방식 안내 + 로드맵 */}
        <Reveal className="max-w-2xl mx-auto block">
          <div
            className="rounded-2xl p-5 space-y-2 border break-keep"
            style={{ backgroundColor: '#FBF7EF', borderColor: 'var(--color-secondary)' }}
          >
            <p className="text-base font-semibold" style={{ color: 'var(--color-primary-dark)' }}>
              {t('landing.channel.heading')}
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              {t('landing.channel.body')}
            </p>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              {t('landing.channel.comingSoon')} <span className="text-gray-400">{t('landing.channel.comingSoonBadge')}</span>
            </p>
          </div>
        </Reveal>

        {/* 5. 푸터 */}
        <footer className="pt-8 border-t border-gray-100 space-y-4 text-center">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-800">{t('legalLinks.terms')}</Link>
            <Link href="/privacy" className="hover:text-gray-800">{t('legalLinks.privacy')}</Link>
            <Link href="/faq" className="hover:text-gray-800">{t('legalLinks.faq')}</Link>
            <Link href="/profile/inquiry" className="hover:text-gray-800">{t('legalLinks.inquiry')}</Link>
          </nav>
          <p className="text-xs text-gray-400">
            {t('landing.footer.contact')} <a href="mailto:leokor1214@gachon.ac.kr" className="underline">leokor1214@gachon.ac.kr</a>
          </p>
          <Link href="/admin" className="inline-block text-xs text-gray-300 hover:text-gray-500">{t('landing.footer.admin')}</Link>
        </footer>
      </div>
    </main>
  );
}
