const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const wipeLogic = 
    const currentUser = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
    if (currentUser.role === 'demo') {
      console.log('Demo user logging out, wiping local storage...');
      const keysToKeep = ['agra_theme', 'agra_font_size', 'agra_reduced_motion'];
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      }
    } else {
      localStorage.removeItem('agra_current_user');
      localStorage.removeItem('agra_demo_start');
    }
;

appJs = appJs.replace(/localStorage\.removeItem\('agra_current_user'\);/g, wipeLogic);
fs.writeFileSync('app.js', appJs, 'utf8');
