import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gcs-final-project.vercel.app';

// 공개 진입점(PC1 자가진단)만 사이트맵에 포함.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/fd/pc1-quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
