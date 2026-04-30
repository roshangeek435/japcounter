import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { getAllPublicRoutes } from './routes';
import { configuredSiteUrl } from './siteConfig';

const ROOT = process.cwd();
const CACHE_LASTMOD = new Map();

function pad2(value) {
  return String(value).padStart(2, '0');
}

function toUtcW3c(date) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(
    date.getUTCDate(),
  )}T${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(
    date.getUTCSeconds(),
  )}+00:00`;
}

export function priorityForRoute(route) {
  if (route === '/') return 1;
  if (route.startsWith('/counter/')) return 0.9;
  if (route.startsWith('/blog/')) return 0.8;
  return 0.6;
}

export function filesForRoute(route) {
  if (route === '/') return ['src/views/Home.jsx', 'src/components/JapaCounter.jsx'];
  if (route === '/mantra-library') return ['src/views/MantraLibrary.jsx', 'src/lib/mantras.js'];
  if (route === '/meditation-timer') return ['src/views/MeditationTimer.jsx'];
  if (route.startsWith('/blog/') || ['/about', '/contact', '/privacy', '/terms', '/disclaimer'].includes(route)) {
    return ['src/views/StaticPages.jsx', 'src/lib/blogPosts.js'];
  }
  if (route.startsWith('/counter/')) {
    return ['src/views/MantraCounterPage.jsx', 'src/lib/mantras.js', 'src/components/JapaCounter.jsx'];
  }
  return ['app/layout.jsx'];
}

function getFileLastmod(relativeFiles) {
  const key = relativeFiles.sort().join(',');
  if (CACHE_LASTMOD.has(key)) return CACHE_LASTMOD.get(key);

  let lastmod = null;

  // 1. Try Git (Only works at build time or local dev)
  if (typeof execSync === 'function') {
    try {
      const existing = relativeFiles.filter(f => fs.existsSync(path.join(ROOT, f)));
      if (existing.length) {
        const quoted = existing.map(f => `"${f}"`).join(' ');
        const output = execSync(`git log -1 --format=%cI -- ${quoted}`, {
          cwd: ROOT,
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'ignore'],
        }).trim();
        if (output) lastmod = new Date(output);
      }
    } catch { /* Git failed or not available */ }
  }

  // 2. Fallback to fs.statSync
  if (!lastmod) {
    let maxMs = 0;
    for (const file of relativeFiles) {
      try {
        const stat = fs.statSync(path.join(ROOT, file));
        if (stat.mtimeMs > maxMs) maxMs = stat.mtimeMs;
      } catch { /* missing file */ }
    }
    if (maxMs > 0) lastmod = new Date(maxMs);
  }

  // 3. Absolute fallback
  if (!lastmod) lastmod = new Date();

  const formatted = toUtcW3c(lastmod);
  CACHE_LASTMOD.set(key, formatted);
  return formatted;
}

export function lastmodForRoute(route) {
  return getFileLastmod(filesForRoute(route));
}

export function getSitemapEntries() {
  return getAllPublicRoutes().map((route) => ({
    url: configuredSiteUrl(route),
    lastModified: lastmodForRoute(route),
    priority: priorityForRoute(route),
  }));
}
