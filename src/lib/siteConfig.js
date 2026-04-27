function normalizeOrigin(url) {
  if (!url || typeof url !== 'string') return '';
  return url.trim().replace(/\/$/, '');
}

/**
 * Public site origin (no trailing slash).
 * Set `REACT_APP_SITE_URL=https://your-domain.com` in `.env` for production builds and for `react-snap`.
 * In the browser, falls back to `window.location.origin` when unset (local dev).
 */
export function getSiteOrigin() {
  const env = normalizeOrigin(process.env.REACT_APP_SITE_URL || '');
  if (env) return env;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return normalizeOrigin(window.location.origin);
  }
  return '';
}

/** Hostname for UI copy (footer, canvas tagline, share text). */
export function siteHostname() {
  const o = getSiteOrigin();
  try {
    const host = new URL(o).hostname;
    const h = host.replace(/^www\./i, '');
    return h || 'this site';
  } catch {
    return 'this site';
  }
}

export function siteUrl(pathname = '/') {
  const origin = getSiteOrigin();
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!origin) {
    return path === '/' ? '/' : path;
  }
  if (path === '/') return `${origin}/`;
  return `${origin}${path}`;
}

/** Contact page email; override with REACT_APP_CONTACT_EMAIL if the default hello@ host is wrong. */
export function contactEmail() {
  if (process.env.REACT_APP_CONTACT_EMAIL) {
    return process.env.REACT_APP_CONTACT_EMAIL;
  }
  const o = getSiteOrigin();
  try {
    const host = new URL(o).hostname;
    if (host && host !== 'localhost' && !/^127\./.test(host)) {
      return `hello@${host}`;
    }
  } catch {
    /* ignore */
  }
  return 'hello@example.com';
}
