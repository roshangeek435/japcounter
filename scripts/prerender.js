const puppeteer = require("puppeteer-core");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

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
  console.log("[prerender] Starting custom prerenderer...");

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const routes = pkg.reactSnap?.include || ["/"];
  
  const executablePath = await findChrome();
  if (!executablePath) {
    console.error("[prerender] Error: Chrome/Chromium not found. Please set PUPPETEER_EXECUTABLE_PATH.");
    process.exit(1);
  }
  console.log(`[prerender] Using browser at: ${executablePath}`);

  // Start local server to serve the build directory
  const app = express();
  app.use(express.static(BUILD_DIR));
  app.get("*", (req, res) => {
    res.sendFile(path.join(BUILD_DIR, "index.html"));
  });

  const server = app.listen(3000, async () => {
    console.log("[prerender] Local server started on port 3000");

    const browser = await puppeteer.launch({
      executablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      console.log(`[prerender] (${i + 1}/${routes.length}) Processing ${route}...`);
      
      const page = await browser.newPage();
      try {
        await page.goto(`http://localhost:3000${route}`, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        // Get content
        const content = await page.content();
        
        // Save to file
        const outPath = path.join(BUILD_DIR, route === "/" ? "index.html" : `${route}.html`);
        const outDir = path.dirname(outPath);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        
        fs.writeFileSync(outPath, content);
      } catch (e) {
        console.error(`[prerender] Error processing ${route}:`, e.message);
      } finally {
        await page.close();
      }
    }

    await browser.close();
    server.close();
    console.log("[prerender] Done!");
    process.exit(0);
  });
}

prerender().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
