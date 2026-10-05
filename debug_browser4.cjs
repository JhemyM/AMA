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
  await page.goto(indexUrl);
  
  await page.evaluate(() => {
    localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'}));
  });
  await page.goto(indexUrl);
  
  // Close onboarding dialog if it exists
  await page.evaluate(() => {
    const d = document.getElementById('onboardingDialog');
    if (d && d.open) d.close();
  });
  
  await page.waitForTimeout(500);
  
  console.log('Clicking Embrapa...');
  await page.click('button[data-section="embrapa"]');
  
  await page.waitForTimeout(2000);
  
  // Dump the HTML of the dynamic module section
  const html = await page.evaluate(() => {
    return document.getElementById('dynamicModuleSection').innerHTML;
  });
  console.log('MODULE SECTION HTML LENGTH:', html.length);
  if (html.length < 100) console.log(html);
  
  await browser.close();
})();
