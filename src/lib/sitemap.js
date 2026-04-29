import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { getAllPublicRoutes } from './routes';
import { configuredSiteUrl } from './siteConfig';

const ROOT = process.cwd();

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
  if (route === '/') {
    return 1;
  }
  if (route.startsWith('/counter/')) {
    return 0.9;
  }
  return 0.6;
}

export function filesForRoute(route) {
  if (route === '/') {
    return ['src/views/Home.jsx', 'src/components/JapaCounter.jsx'];
  }
  if (route === '/mantra-library') {
    return ['src/views/MantraLibrary.jsx', 'src/lib/mantras.js'];
  }
  if (route === '/meditation-timer') {
    return ['src/views/MeditationTimer.jsx'];
  }
  if (
    route.startsWith('/blog') ||
    ['/about', '/contact', '/privacy', '/terms', '/disclaimer'].includes(route)
  ) {
    return ['src/views/StaticPages.jsx', 'src/lib/blogPosts.js'];
  }
  if (route.startsWith('/counter/')) {
    return [
      'src/views/MantraCounterPage.jsx',
      'src/lib/mantras.js',
      'src/components/JapaCounter.jsx',
    ];
  }
  return ['app/layout.jsx'];
}

function maxMtimeMs(relativeFiles) {
  let max = 0;

  for (const file of relativeFiles) {
    try {
      const stat = fs.statSync(path.join(ROOT, file));
      if (stat.mtimeMs > max) {
        max = stat.mtimeMs;
      }
    } catch {
      /* ignore missing files */
    }
  }

  return max;
}

function gitLastCommitIso(relativeFiles) {
  const existing = relativeFiles.filter((file) =>
    fs.existsSync(path.join(ROOT, file)),
  );
  if (!existing.length) {
    return null;
  }

  try {
    const quoted = existing.map((file) => JSON.stringify(file)).join(' ');
    const output = execSync(`git log -1 --format=%cI -- ${quoted}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();

    return output || null;
  } catch {
    return null;
  }
}

export function lastmodForRoute(route) {
  const files = filesForRoute(route);
  const gitIso = gitLastCommitIso(files);
  if (gitIso) {
    return toUtcW3c(new Date(gitIso));
  }

  const mtimeMs = maxMtimeMs(files);
  return toUtcW3c(new Date(mtimeMs || Date.now()));
}

export function getSitemapEntries() {
  return getAllPublicRoutes().map((route) => ({
    url: configuredSiteUrl(route),
    lastModified: lastmodForRoute(route),
    priority: priorityForRoute(route),
  }));
}
