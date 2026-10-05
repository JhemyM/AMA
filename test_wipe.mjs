import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:8080/login.html');
    await page.evaluate(() => localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'})));
    await page.goto('http://localhost:8080/index.html');
    
    await page.evaluate(() => localStorage.setItem('agra_property_data', '123'));
    
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await page.evaluate(() => {
      const btn = document.getElementById('logoutButton');
      if (btn) btn.click();
    });
    
    await page.waitForTimeout(2000);
    
    const wiped = await page.evaluate(() => localStorage.getItem('agra_property_data') === null);
    if (!wiped) {
      console.log('WIPE FAILED');
    } else {
      console.log('WIPE SUCCESS');
    }
    
  } catch (err) {
    console.log('TEST ERROR:', err.message);
  }
  
  await browser.close();
  process.exit(0);
})();
