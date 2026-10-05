import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.message);
    console.log('STACK:', err.stack);
  });
  
  await page.goto('http://localhost:8080/login.html');
  await page.evaluate(() => {
    localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'}));
  });
  
  console.log('Going to index.html...');
  await page.goto('http://localhost:8080/index.html');
  
  await page.waitForTimeout(2000);
  await browser.close();
  process.exit(0);
})();
