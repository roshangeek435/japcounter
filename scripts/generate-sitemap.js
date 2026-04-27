/**
 * Generates public/sitemap.xml with per-URL <lastmod> from Git history (fallback: file mtime).
 * URL list matches package.json → reactSnap.include (same routes as prerender).
 *
 * Usage:
 *   REACT_APP_SITE_URL=https://your-domain.com node scripts/generate-sitemap.js
 *   node scripts/generate-sitemap.js https://your-domain.com
 *
 * Run automatically via npm prebuild (set REACT_APP_SITE_URL in .env for production).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
  require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
} catch {
  /* optional */
}

const ROOT = path.join(__dirname, '..');

function pad2(n) {
  return String(n).padStart(2, '0');
}

/** W3C datetime UTC, e.g. 2026-03-22T17:35:42+00:00 */
function toUtcW3c(d) {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}T${pad2(
    d.getUTCHours(),
  )}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())}+00:00`;
}

function priorityForRoute(route) {
  if (route === '/' || route === '') return '1.0';
  if (route.startsWith('/counter/')) return '0.9';
  return '0.6';
}

/** Source files that determine when this route’s content last changed (no shared shell). */
function filesForRoute(route) {
  const r = route === '' ? '/' : route;
  if (r === '/') {
    return ['src/pages/Home.jsx', 'src/components/JapaCounter.jsx'];
  }
  if (r === '/mantra-library') {
    return ['src/pages/MantraLibrary.jsx', 'src/lib/mantras.js'];
  }
  if (r === '/meditation-timer') {
    return ['src/pages/MeditationTimer.jsx'];
  }
  if (r.startsWith('/blog') || ['/about', '/contact', '/privacy', '/terms', '/disclaimer'].includes(r)) {
    return ['src/pages/StaticPages.jsx'];
  }
  if (r.startsWith('/counter/')) {
    return ['src/pages/MantraCounterPage.jsx', 'src/lib/mantras.js', 'src/components/JapaCounter.jsx'];
  }
  return ['src/App.js'];
}

function maxMtimeMs(relFiles) {
  let max = 0;
  for (const f of relFiles) {
    const p = path.join(ROOT, f);
    try {
      const st = fs.statSync(p);
      if (st.mtimeMs > max) max = st.mtimeMs;
    } catch {
      /* missing */
    }
  }
  return max;
}

function gitLastCommitIso(relFiles) {
  const existing = relFiles.filter((f) => fs.existsSync(path.join(ROOT, f)));
  if (!existing.length) return null;
  try {
    const quoted = existing.map((f) => JSON.stringify(f)).join(' ');
    const out = execSync(`git log -1 --format=%cI -- ${quoted}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function lastmodForRoute(route) {
  const files = filesForRoute(route);
  const gitIso = gitLastCommitIso(files);
  if (gitIso) {
    return toUtcW3c(new Date(gitIso));
  }
  const ms = maxMtimeMs(files);
  return toUtcW3c(new Date(ms || Date.now()));
}

function loadRoutes() {
  const pkgPath = path.join(ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const routes = pkg.reactSnap?.include;
  if (!Array.isArray(routes) || !routes.length) {
    throw new Error('package.json reactSnap.include is missing or empty');
  }
  return routes;
}

const origin = (
  process.argv[2] ||
  process.env.REACT_APP_SITE_URL ||
  ''
)
  .trim()
  .replace(/\/$/, '');

if (!origin || !/^https?:\/\//i.test(origin)) {
  console.error(
    '[generate-sitemap] Set REACT_APP_SITE_URL in .env or pass the site URL:\n  node scripts/generate-sitemap.js https://your-domain.com',
  );
  process.exit(1);
}

const routes = loadRoutes();
const lines = routes.map((route) => {
  const pathNorm = route.startsWith('/') ? route : `/${route}`;
  const loc = pathNorm === '/' ? `${origin}/` : `${origin}${pathNorm}`;
  const lastmod = lastmodForRoute(pathNorm);
  const pr = priorityForRoute(pathNorm);
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${pr}</priority></url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join('\n')}
</urlset>
`;

const pubDir = path.join(ROOT, 'public');
fs.writeFileSync(path.join(pubDir, 'sitemap.xml'), xml);

const robots = `# REACT_APP_SITE_URL=${origin}
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
fs.writeFileSync(path.join(pubDir, 'robots.txt'), robots);

console.log(
  '[generate-sitemap] Wrote',
  routes.length,
  'URLs with dynamic lastmod (git or mtime) and robots.txt for',
  origin,
);
