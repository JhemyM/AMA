import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:8080/login.html');
    
    // Login as Demo
    await page.click('#demoLoginBtn');
    
    // Wait for redirect to index.html
    await page.waitForURL('**/index.html*');
    
    // Close onboarding dialog if it exists
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      const d = document.getElementById('onboardingDialog');
      if (d && d.open) d.close();
    });
    
    // Insert dummy data
    await page.evaluate(() => localStorage.setItem('agra_property_data', '123'));
    
    // Click logout
    await page.evaluate(() => {
      const btn = document.getElementById('logoutButton');
      if (btn) btn.click();
    });
    
    // Wait for redirect
    await page.waitForURL('**/login.html*');
    
    // Check if data is wiped
    const wiped = await page.evaluate(() => localStorage.getItem('agra_property_data') === null);
    if (!wiped) {
      console.log('WIPE FAILED');
      process.exit(1);
    } else {
      console.log('WIPE SUCCESS');
    }
    
  } catch (err) {
    console.log('TEST ERROR:', err.message);
    process.exit(1);
  }
  
  await browser.close();
  process.exit(0);
})();
