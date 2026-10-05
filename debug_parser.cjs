const acorn = require('acorn');
const fs = require('fs');

const src = fs.readFileSync('debug_inline_script.js', 'utf8');
try {
  acorn.parse(src, { ecmaVersion: 2020 });
  console.log('Valid syntax!');
} catch (err) {
  console.log('SYNTAX ERROR:', err.message);
  console.log('Location:', err.loc);
  const lines = src.split('\n');
  const line = lines[err.loc.line - 1];
  console.log('CODE AT ERROR:', line.substring(Math.max(0, err.loc.column - 20), err.loc.column + 20));
}
