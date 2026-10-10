const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Use optional chaining for safe assignments
code = code.replace(/document\.getElementById\('([^']+)'\)\.textContent\s*=\s*(.+?);/g, "const el_$1 = document.getElementById('$1'); if(el_$1) el_$1.textContent = $2;");
code = code.replace(/document\.getElementById\('([^']+)'\)\.innerHTML\s*=\s*(.+?);/g, "const el_$1 = document.getElementById('$1'); if(el_$1) el_$1.innerHTML = $2;");
code = code.replace(/document\.querySelector\('([^']+)'\)\.addEventListener/g, "document.querySelector('$1')?.addEventListener");
code = code.replace(/document\.getElementById\('([^']+)'\)\.addEventListener/g, "document.getElementById('$1')?.addEventListener");

fs.writeFileSync('app.js', code);
console.log('app.js patched');
