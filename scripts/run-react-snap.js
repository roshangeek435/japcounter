/**
 * react-snap runs Puppeteer/Chromium. Vercel (and many CI images) omit libnss3 and
 * other libraries, so launch fails. Skip prerender there; the SPA build is still valid.
 *
 * Opt out locally: SKIP_REACT_SNAP=true npm run build
 */
const { spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");

const isCI =
  process.env.SKIP_REACT_SNAP === "true" || process.env.SKIP_REACT_SNAP === "1";

if (isCI) {
  console.log(`[postbuild] Skipping react-snap: SKIP_REACT_SNAP is set.`);
  process.exit(0);
}

const cli = path.join(root, "node_modules", "react-snap", "run.js");

if (!require("fs").existsSync(cli)) {
  console.error(`[postbuild] Error: react-snap not found at ${cli}`);
  process.exit(1);
}

// On Cloudflare Pages V3 (Ubuntu 24.04), Chromium is available in the system.
// We point Puppeteer to it if it's not already set.
if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
  const commonPaths = [
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome-stable",
  ];
  for (const p of commonPaths) {
    if (require("fs").existsSync(p)) {
      console.log(`[postbuild] Found system browser at ${p}.`);
      process.env.PUPPETEER_EXECUTABLE_PATH = p;
      break;
    }
  }
}

// If still not found, try to use npx to install it (might work in some environments)
if (!process.env.PUPPETEER_EXECUTABLE_PATH && process.env.CF_PAGES) {
  console.log(`[postbuild] No system browser found. Attempting to install chrome via npx...`);
  try {
    const installOut = spawnSync("npx", ["@puppeteer/browsers", "install", "chrome@stable"], {
      stdio: "inherit",
      cwd: root,
    });
    if (installOut.status === 0) {
      console.log(`[postbuild] Browser installation successful. (Path discovery might be needed)`);
      // Puppeteer might find it automatically now in its cache.
    }
  } catch (e) {
    console.error(`[postbuild] Browser installation failed:`, e);
  }
}

console.log(`[postbuild] Starting react-snap...`);
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  console.log(`[postbuild] Using PUPPETEER_EXECUTABLE_PATH: ${process.env.PUPPETEER_EXECUTABLE_PATH}`);
}

const result = spawnSync(process.execPath, [cli], {
  stdio: "inherit",
  cwd: root,
  env: {
    ...process.env,
    REACT_SNAP_CONCURRENCY: "1",
  },
});

if (result.error) {
  console.error("[postbuild] Failed to start react-snap process:", result.error);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`[postbuild] react-snap exited with code ${result.status}`);
}

process.exit(result.status === null ? 1 : result.status);
