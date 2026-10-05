import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/login.html');
  await page.evaluate(() => {
    localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'}));
  });
  
  await page.exposeFunction('logError', (msg, url, line, col) => {
    console.log('WINDOW ONERROR:', msg, url, line, col);
  });
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', e => {
      window.logError(e.message, e.filename, e.lineno, e.colno);
    });
  });
  
  await page.goto('http://localhost:8080/index.html');
  await page.waitForTimeout(2000);
  await browser.close();
  process.exit(0);
})();
