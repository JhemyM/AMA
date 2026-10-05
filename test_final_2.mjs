import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let hasErrors = false;
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
      if (!msg.text().includes('404')) hasErrors = true;
    }
  });
  
  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.message);
    hasErrors = true;
  });
  
  try {
    await page.goto('http://localhost:8080/login.html');
    await page.evaluate(() => localStorage.setItem('agra_current_user', JSON.stringify({role: 'demo'})));
    await page.goto('http://localhost:8080/index.html');
    
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      const d = document.getElementById('onboardingDialog');
      if (d && d.open) d.close();
    });
    
    const sections = ['fields', 'production', 'soil', 'weather', 'tasks', 'inventory', 'team', 'embrapa'];
    for (const section of sections) {
      await page.click('button[data-section="' + section + '"]');
      await page.waitForTimeout(500);
      const isVisible = await page.evaluate(() => document.getElementById('dynamicModuleSection').hidden === false);
      if (!isVisible) hasErrors = true;
    }
    
    await page.evaluate(() => localStorage.setItem('agra_property_data', '123'));
    
    // Use evaluate to bypass UI blocking
    await page.evaluate(() => {
      const btn = document.getElementById('logoutButton');
      if (btn) btn.click();
    });
    
    // Handle confirm dialog
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await page.waitForTimeout(2000);
    
    const wiped = await page.evaluate(() => localStorage.getItem('agra_property_data') === null);
    if (!wiped) {
      console.log('WIPE FAILED');
      hasErrors = true;
    } else {
      console.log('WIPE SUCCESS');
    }
    
  } catch (err) {
    console.log('TEST ERROR:', err.message);
    hasErrors = true;
  }
  
  await browser.close();
  
  if (hasErrors) {
    console.log('E2E Tests Finished with ERRORS.');
    process.exit(1);
  } else {
    console.log('E2E Tests Finished SUCCESSFULLY.');
  }
})();
