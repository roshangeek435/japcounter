const legacyRedirects = [
  { source: '/ram-naam-japa-counter', destination: '/counter/ram-ram' },
  { source: '/radha-naam-japa-counter', destination: '/counter/radhe-radhe' },
  {
    source: '/om-namah-shivaya-counter',
    destination: '/counter/om-namah-shivaya',
  },
  {
    source: '/hanuman-japa-counter',
    destination: '/counter/om-han-hanumate-namah',
  },
  { source: '/freestyle-japa-counter', destination: '/counter/om' },
];

const nextConfig = {
  reactStrictMode: true,

  // Exclude non-JS directories from Next.js output file tracing.
  // venv/ contains a broken relative symlink (python -> python3) that causes
  // Turbopack to panic. Use NEXT_DISABLE_TURBOPACK=1 for production builds
  // until this Turbopack bug is resolved upstream.
  outputFileTracingExcludes: {
    '*': ['./venv/**', './scripts/**', './graphify-out/**'],
  },

  async redirects() {
    return legacyRedirects.map((item) => ({
      source: item.source,
      destination: item.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
