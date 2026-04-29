const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const express = require('express');

const buildDir = path.join(__dirname, '../build');
const routes = require('../package.json').reactSnap.include || ['/'];

const app = express();
app.use(express.static(buildDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const server = app.listen(3000, async () => {
  console.log('Server started on port 3000');
  
  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    try {
      const dom = await JSDOM.fromURL(`http://localhost:3000${route}`, {
        runScripts: 'dangerously',
        resources: 'usable'
      });
      
      // Wait for React to render
      await new Promise(r => setTimeout(r, 2000));
      
      // Get the HTML
      const html = dom.serialize();
      
      // Save it
      const filePath = path.join(buildDir, route === '/' ? 'index.html' : `${route}.html`);
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(filePath, html);
      console.log(`Saved ${filePath}`);
      
      dom.window.close();
    } catch (e) {
      console.error(`Error prerendering ${route}:`, e);
    }
  }
  
  server.close();
});
