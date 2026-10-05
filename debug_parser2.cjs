const acorn = require('acorn');
const fs = require('fs');

const files = [
  'dist/web/app.js',
  'dist/web/feedback-config.js',
  'dist/web/login.js',
  'dist/web/monetization.js',
  'dist/web/storage.js',
  'dist/web/supabase-client.js'
];

for (const file of files) {
  try {
    const src = fs.readFileSync(file, 'utf8');
    acorn.parse(src, { ecmaVersion: 2020 });
    console.log(file, 'Valid syntax!');
  } catch (err) {
    console.log(file, 'SYNTAX ERROR:', err.message);
  }
}
