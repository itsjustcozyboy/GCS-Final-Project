'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

/**
 * 작동 방식 — 스크롤 시퀀스.
 * 각 단계는 실제 앱 스크린샷(현재는 placeholder) + 한 줄 설명으로 구성된다.
 *
 * 스크린샷 교체 방법:
 *  - 아래 `src` 경로의 파일만 같은 이름으로 교체하면 된다. (예: public/landing/step1.png)
 *  - 권장 사이즈: 모바일 목업 비율 9:19.5 (예: 540 x 1170 px), 세로형 PNG.
 *  - 자세한 안내는 apps/web/public/landing/README.md 참고.
 */
const STEPS = [
  { n: 1, src: '/landing/step1.png' },
  { n: 2, src: '/landing/step2.png' },
  { n: 3, src: '/landing/step3.png' },
] as const;

export function HowItWorks() {
  const { t } = useTranslation('common');
  return (
    <section className="space-y-10 break-keep sm:space-y-16">
      <Reveal>
        <h2 className="text-center text-xl font-bold text-gray-900 sm:text-2xl">
          {t('landing.how.heading')}
        </h2>
      </Reveal>

      <ol className="space-y-12 sm:space-y-20">
        {STEPS.map((step, i) => {
          const odd = i % 2 === 1;
          return (
            <li
              key={step.n}
              className={`flex flex-col items-center gap-6 sm:gap-10 md:flex-row ${
                odd ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* 스크린샷 (placeholder) */}
              <Reveal
                direction={odd ? 'right' : 'left'}
                className="flex w-full justify-center md:w-1/2"
              >
                <div className="relative w-44 sm:w-52">
                  <Image
                    src={step.src}
                    alt={t(`landing.how.${step.n}.alt`)}
                    width={540}
                    height={1170}
                    sizes="(max-width: 640px) 11rem, 13rem"
                    className="h-auto w-full rounded-[2rem] border border-gray-200 bg-white shadow-md"
                    priority={i === 0}
                  />
                  <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">
                    {t('landing.how.placeholderBadge')}
                  </span>
                </div>
              </Reveal>

              {/* 설명 */}
              <Reveal
                direction={odd ? 'left' : 'right'}
                delayMs={120}
                className="w-full text-center md:w-1/2 md:text-left"
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {t('landing.how.stepLabel', { n: step.n })}
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  {t(`landing.how.${step.n}.title`)}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500 sm:text-base">
                  {t(`landing.how.${step.n}.desc`)}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
