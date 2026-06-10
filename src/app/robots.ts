import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gcs-final-project.vercel.app';

// 공개 진입점(pc1-quiz)만 크롤 허용. 관리자·데모·비공개 fd는 차단.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/fd/pc1-quiz'],
      disallow: ['/admin', '/api', '/fd/pc1-preorder'],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
