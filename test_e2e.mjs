import { chromium } from 'playwright';

(async () => {
  console.log('Starting E2E Tests...');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let hasErrors = false;
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
      hasErrors = true;
    }
  });
  
  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.message);
    hasErrors = true;
  });
  
  try {
    console.log('Navigating to login...');
    await page.goto('http://localhost:8080/index.html');
    
    // We should be redirected to login.html
    await page.waitForURL('**/login.html');
    console.log('On Login Page');
    
    // Login as Demo
    console.log('Logging in as Demo...');
    await page.click('#demoLoginBtn');
    
    // Wait for redirect to index.html
    await page.waitForURL('**/index.html');
    console.log('On Dashboard');
    
    await page.waitForTimeout(1000);
    
    // Close onboarding dialog if it exists
    await page.evaluate(() => {
      const d = document.getElementById('onboardingDialog');
      if (d && d.open) d.close();
    });
    
    await page.waitForTimeout(500);
    
    // Click through each section
    const sections = ['fields', 'production', 'soil', 'weather', 'tasks', 'inventory', 'team', 'embrapa'];
    for (const section of sections) {
      console.log('Navigating to ' + section + '...');
      await page.click('button[data-section="' + section + '"]');
      await page.waitForTimeout(1000);
      
      // Check if dynamicModuleSection is visible
      const isVisible = await page.evaluate(() => {
        return document.getElementById('dynamicModuleSection').hidden === false;
      });
      if (!isVisible) {
        console.log('ERROR: dynamicModuleSection is not visible for', section);
        hasErrors = true;
      }
    }
    
    console.log('Testing data wipe...');
    // Add some data to localStorage
    await page.evaluate(() => {
      localStorage.setItem('agra_property_data', JSON.stringify({fields: [{id: 1, name: 'Test Field'}]}));
    });
    
    // Logout
    console.log('Logging out...');
    await page.click('#logoutBtn');
    
    await page.waitForURL('**/login.html');
    console.log('Logged out.');
    
    // Check if data is wiped
    const isWiped = await page.evaluate(() => {
      return localStorage.getItem('agra_property_data') === null;
    });
    
    if (!isWiped) {
      console.log('ERROR: Data was NOT wiped after demo logout!');
      hasErrors = true;
    } else {
      console.log('SUCCESS: Demo data wiped correctly.');
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
