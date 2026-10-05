import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'index.html',
  'login.html',
  'login.js',
  'sw.js',
  'scripts/build.mjs'
];

for (const file of filesToUpdate) {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/0\.7\.16/g, '0.7.17');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated version in', file);
  }
}
