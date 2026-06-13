import Link from 'next/link';
import type { Locale } from '@maeum/i18n';

type Block = { p?: string; ul?: string[] };
type Section = { title: string; blocks: Block[] };
export type LegalContent = {
  heading: string;
  intro?: string;
  sections: Section[];
  version?: string;
  crossLinkPre: string;
  crossLinkPost: string;
};

const EMAIL = 'leokor1214@gachon.ac.kr';

// 본문 문자열 안의 이메일을 자동으로 mailto 링크로 만든다 (번역문에 마크업을 넣지 않기 위함).
function withEmail(text: string) {
  const idx = text.indexOf(EMAIL);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>
      {text.slice(idx + EMAIL.length)}
    </>
  );
}

export function LegalDoc({
  locale,
  backLink,
  disclaimer,
  content,
  crossLinkHref,
  crossLinkLabel,
}: {
  locale: Locale;
  backLink: string;
  disclaimer: string;
  content: LegalContent;
  crossLinkHref: string;
  crossLinkLabel: string;
}) {
  // 영어본은 참고 번역이며 원본(한국어)이 우선함을 상·하단에 고지.
  // TODO: legal review for non-KR jurisdictions (GDPR/CCPA 등)
  const Disclaimer = locale === 'en' ? (
    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 leading-relaxed">
      ⚠️ {disclaimer}
    </p>
  ) : null;

  return (
    <main className="min-h-dvh px-4 py-10 sm:px-6 sm:py-12 max-w-2xl mx-auto break-keep" style={{ background: 'var(--color-background)' }}>
      <Link href="/profile" className="inline-flex items-center min-h-11 text-sm text-gray-400 hover:text-gray-600">{backLink}</Link>

      <h1 className="text-2xl font-bold mt-6 mb-2" style={{ color: 'var(--color-primary-dark)' }}>{content.heading}</h1>
      {content.intro && <p className="text-sm text-gray-500 mb-4">{content.intro}</p>}
      {Disclaimer && <div className="mb-6">{Disclaimer}</div>}

      <div className="text-gray-700 space-y-6 text-[15px] leading-relaxed">
        {content.sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h2>
            {s.blocks.map((b, i) =>
              b.ul ? (
                <ul key={i} className="list-disc pl-5 space-y-1">
                  {b.ul.map((li, j) => <li key={j}>{withEmail(li)}</li>)}
                </ul>
              ) : (
                <p key={i} className={i > 0 ? 'mt-2' : undefined}>{withEmail(b.p ?? '')}</p>
              ),
            )}
          </section>
        ))}

        <div className="text-sm text-gray-500 pt-4 border-t border-gray-100 space-y-2">
          {content.version && <p>{content.version}</p>}
          <p>
            {content.crossLinkPre}
            <Link href={crossLinkHref} className="underline" style={{ color: 'var(--color-primary)' }}>{crossLinkLabel}</Link>
            {content.crossLinkPost}
          </p>
          {Disclaimer}
        </div>
      </div>
    </main>
  );
}
