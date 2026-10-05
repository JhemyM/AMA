import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  
  await page.goto('http://localhost:8080/index.html');
  await page.evaluate(() => {
    localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'}));
    localStorage.setItem('agra_property_data', '123');
  });
  
  await page.evaluate(async () => {
    console.log('Clicking logout...');
    document.getElementById('logoutButton').click();
  });
  
  await page.waitForTimeout(2000);
  
  const val = await page.evaluate(() => localStorage.getItem('agra_property_data'));
  console.log('agra_property_data =', val);
  
  await browser.close();
  process.exit(0);
})();
