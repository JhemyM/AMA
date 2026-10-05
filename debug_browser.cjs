const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => {
    console.log('BROWSER ERROR MESSAGE:', err.message);
    console.log('BROWSER ERROR STACK:', err.stack);
  });
  
  const indexUrl = 'file:///' + path.resolve('dist/web/index.html').replace(/\\/g, '/');
  
  console.log('Navigating to', indexUrl);
  await page.goto(indexUrl);
  
  await page.evaluate(() => {
    localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'}));
  });
  
  await page.goto(indexUrl);
  
  await page.waitForTimeout(1000);
  
  await browser.close();
})();
