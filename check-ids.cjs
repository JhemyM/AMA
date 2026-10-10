const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');
const idMatches = code.match(/getElementById\(['"]([^'"]+)['"]\)/g);
if (idMatches) {
  idMatches.forEach(m => console.log(m));
}
const queryMatches = code.match(/querySelector\(['"]#([^'"]+)['"]\)/g);
if (queryMatches) {
  queryMatches.forEach(m => console.log(m));
}
