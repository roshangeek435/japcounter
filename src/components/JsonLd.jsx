import { buildJsonLd } from '@/lib/metadata';

export function JsonLd({ data, id }) {
  const jsonLd = buildJsonLd(data);
  if (!jsonLd) {
    return null;
  }

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default JsonLd;
