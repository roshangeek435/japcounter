import { getSitemapEntries } from '@/lib/sitemap';

export const dynamic = 'force-static';

export default function sitemap() {
  return getSitemapEntries();
}
