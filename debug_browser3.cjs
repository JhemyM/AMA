const fs = require('fs');
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('--- ERROR FOUND ---');
    console.log(err.message);
    console.log(err.stack);
  });
  
  const indexUrl = 'file:///' + path.resolve('dist/web/index.html').replace(/\\/g, '/');
  await page.goto(indexUrl);
  await browser.close();
})();
