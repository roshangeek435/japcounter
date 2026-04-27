/**
 * react-snap runs Puppeteer/Chromium. Vercel (and many CI images) omit libnss3 and
 * other libraries, so launch fails. Skip prerender there; the SPA build is still valid.
 *
 * Opt out locally: SKIP_REACT_SNAP=true npm run build
 */
const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');

if (process.env.VERCEL || process.env.SKIP_REACT_SNAP === 'true' || process.env.SKIP_REACT_SNAP === '1') {
  const reason = process.env.VERCEL ? 'VERCEL' : 'SKIP_REACT_SNAP';
  console.log(`[postbuild] Skipping react-snap (${reason}): no Chromium deps on this host. Deploy is a client-rendered SPA unless you prerender elsewhere.`);
  process.exit(0);
}

const cli = path.join(root, 'node_modules', 'react-snap', 'run.js');
const result = spawnSync(process.execPath, [cli], {
  stdio: 'inherit',
  cwd: root,
  env: process.env,
});

process.exit(result.status === null ? 1 : result.status);
