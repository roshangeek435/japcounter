const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

async function test() {
  const html = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
  const dom = new JSDOM(html, {
    url: 'http://localhost/',
    runScripts: 'dangerously',
    resources: 'usable'
  });
  
  await new Promise(r => setTimeout(r, 2000));
  console.log(dom.window.document.getElementById('root').innerHTML);
}
test();
