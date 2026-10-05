import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text(), msg.location());
    }
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });
  
  await page.goto('http://localhost:8080/login.html');
  await page.evaluate(() => {
    localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'}));
  });
  await page.goto('http://localhost:8080/index.html');
  
  await page.waitForTimeout(2000);
  await browser.close();
  process.exit(0);
})();
