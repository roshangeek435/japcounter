const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");

async function findSystemChrome() {
  const commonPaths = [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/lib/chromium-browser/chromium-browser",
  ];
  for (const p of commonPaths) {
    if (fs.existsSync(p)) return p;
  }
  
  // Try 'which'
  try {
    const path = execSync("which google-chrome || which chromium-browser || which chromium", { encoding: "utf8" }).trim();
    if (path) return path;
  } catch (e) {}
  
  return null;
}

async function prerender() {
  console.log("[prerender] Starting serverless prerenderer...");

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const routes = pkg.reactSnap?.include || ["/"];
  
  const systemChrome = await findSystemChrome();
  if (systemChrome) {
    console.log(`[prerender] Found system browser at: ${systemChrome}`);
  } else {
    console.log("[prerender] No system browser found. Using Puppeteer default.");
  }

  const launchOptions = {
    args: [
        "--no-sandbox", 
        "--disable-setuid-sandbox", 
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-software-rasterizer"
    ],
  };

  if (systemChrome) {
    launchOptions.executablePath = systemChrome;
  }

  let browser;
  try {
    console.log(`[prerender] Launching browser...`);
    browser = await puppeteer.launch(launchOptions);
  } catch (err) {
    console.error("[prerender] Browser launch failed:", err.message);
    if (!systemChrome) {
        console.log("[prerender] Attempting to find any chromium binary in /usr...");
        try {
            const found = execSync("find /usr -name 'chromium' -o -name 'google-chrome' | head -n 1", { encoding: "utf8" }).trim();
            if (found) {
                console.log(`[prerender] Found a binary at ${found}, trying to launch...`);
                launchOptions.executablePath = found;
                browser = await puppeteer.launch(launchOptions);
            }
        } catch (e) {
            console.error("[prerender] Emergency search failed:", e.message);
        }
    }
    
    if (!browser) {
        console.error("[prerender] CRITICAL: Could not launch browser. Cloudflare environment might be missing dependencies.");
        process.exit(1);
    }
  }

  let failedCount = 0;
  const page = await browser.newPage();
  
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith("http://localhost")) {
      const urlObj = new URL(url);
      let relPath = urlObj.pathname;
      
      if (relPath === "/" || relPath === "") {
        relPath = "/index.html";
      } else if (!relPath.includes(".")) {
        relPath = "/index.html";
      }

      const filePath = path.join(BUILD_DIR, relPath);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        const ext = path.extname(relPath).toLowerCase();
        const contentType = {
          ".js": "application/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".svg": "image/svg+xml",
        }[ext] || "text/html";

        request.respond({
          status: 200,
          contentType,
          body: content,
        });
        return;
      }
      
      if (!relPath.includes(".")) {
        const indexContent = fs.readFileSync(path.join(BUILD_DIR, "index.html"));
        request.respond({
          status: 200,
          contentType: "text/html",
          body: indexContent,
        });
        return;
      }
    }
    request.continue();
  });

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    console.log(`[prerender] (${i + 1}/${routes.length}) Processing ${route}...`);
    
    try {
      await page.goto(`http://localhost${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      const content = await page.content();
      const outPath = path.join(BUILD_DIR, route === "/" ? "index.html" : `${route}.html`);
      const outDir = path.dirname(outPath);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outPath, content);
    } catch (e) {
      console.error(`[prerender] Error processing ${route}:`, e.message);
      failedCount++;
    }
    await new Promise(r => setTimeout(r, 50));
  }

  await browser.close();
  console.log(`[prerender] Done! (Failed: ${failedCount})`);
  process.exit(failedCount > routes.length / 2 ? 1 : 0);
}

prerender().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
