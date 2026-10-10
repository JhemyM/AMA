const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const code = fs.readFileSync('app.js', 'utf8');
const idMatches = code.match(/getElementById\(['"]([^'"]+)['"]\)/g) || [];
const queryMatches = code.match(/querySelector\(['"]#([^'"]+)['"]\)/g) || [];

const requiredIds = new Set();
idMatches.forEach(m => requiredIds.add(m.match(/['"]([^'"]+)['"]/)[1]));
queryMatches.forEach(m => requiredIds.add(m.match(/['"]#([^'"]+)['"]/)[1]));

const html = fs.readFileSync('demo.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const missing = [];
for (const id of requiredIds) {
  if (!document.getElementById(id)) {
    missing.push(id);
  }
}

console.log('Missing IDs in demo.html:');
console.log(missing);
