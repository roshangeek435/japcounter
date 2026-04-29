import { configuredSiteUrl, isAllowCrawl } from '@/lib/siteConfig';

export default function robots() {
  if (!isAllowCrawl()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: configuredSiteUrl('/sitemap.xml'),
  };
}
