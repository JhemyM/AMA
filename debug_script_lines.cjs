const fs = require('fs');
const content = fs.readFileSync('dist/web/index.html', 'utf8');

const scriptMatch = content.match(/<script>\s*(var _0x[a-f0-9]+.*?)<\/script>/s);
if (scriptMatch) {
  const scriptContent = scriptMatch[1];
  console.log('Script length:', scriptContent.length);
  const lines = scriptContent.split('\n');
  console.log('Number of lines in script:', lines.length);
}
