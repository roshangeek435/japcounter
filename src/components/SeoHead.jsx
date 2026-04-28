import { Helmet } from 'react-helmet-async';
import { getSiteOrigin, siteUrl } from '../lib/siteConfig';
import ogImageAsset from '../assets/images/og-image.png';

/** Merge multiple schema nodes into one JSON-LD @graph (preferred for Google). */
function toJsonLd(schema) {
  if (!schema) return null;
  if (Array.isArray(schema)) {
    const graph = schema.map((node) => {
      if (node && typeof node === 'object' && '@context' in node) {
        const { '@context': _ctx, ...rest } = node;
        return rest;
      }
      return node;
    });
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  return schema;
}

export const SeoHead = ({
  title,
  description,
  canonical,
  ogImage,
  schema,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}) => {
  const url =
    canonical ||
    (typeof window !== 'undefined' ? window.location.href : getSiteOrigin());
  const jsonLd = toJsonLd(schema);
  const resolvedOg = ogImage ?? siteUrl(ogImageAsset);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Jap Counter Online" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={resolvedOg} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOg} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SeoHead;
