const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");

async function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const commonPaths = [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  for (const p of commonPaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function prerender() {
  console.log("[prerender] Starting serverless prerenderer...");

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const routes = pkg.reactSnap?.include || ["/"];
  
  const executablePath = await findChrome();
  if (!executablePath) {
    console.error("[prerender] Error: Chrome/Chromium not found.");
    process.exit(1);
  }
  console.log(`[prerender] Using browser at: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  let failedCount = 0;
  
  // We use a single page and reuse it for speed and memory efficiency
  const page = await browser.newPage();
  
  // Intercept requests to serve files directly from the build directory
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith("http://localhost")) {
      const urlObj = new URL(url);
      let relPath = urlObj.pathname;
      
      // Default to index.html for routes
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
      
      // If file not found locally but it's a route, serve index.html
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
      
      // If we hit too many failures, something is wrong with the browser
      if (failedCount > 10 && i < 20) {
          console.error("[prerender] Too many early failures. Aborting.");
          break;
      }
    }
    
    // Optional: Small pause
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
