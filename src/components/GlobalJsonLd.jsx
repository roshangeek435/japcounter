import { Helmet } from 'react-helmet-async';
import { getSiteOrigin } from '../lib/siteConfig';

/** Sitewide WebSite + Organization JSON-LD (repeated on each route is fine for Google). */
export function GlobalJsonLd() {
  const origin = getSiteOrigin();
  if (!origin) return null;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'Jap Counter Online',
        url: `${origin}/`,
        description:
          'Free digital mala for mantra meditation with live writing canvas, downloadable image, and 150+ preloaded mantras.',
        inLanguage: 'en-IN',
        publisher: { '@id': `${origin}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'Jap Counter Online',
        url: origin,
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
