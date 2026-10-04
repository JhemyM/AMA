const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const target = `      let colorClass = 'soy';
      if (crop.toLowerCase() === 'milho') colorClass = 'corn';
      else if (crop.toLowerCase().includes('caf')) colorClass = 'coffee';
      else if (crop.toLowerCase() === 'trigo') colorClass = 'wheat';`;

const replacement = `      let colorClass = 'soy';
      const cLower = crop.toLowerCase();
      if (cLower === 'milho' || cLower.includes('cana') || cLower.includes('hortali')) colorClass = 'corn';
      else if (cLower.includes('caf') || cLower.includes('feij') || cLower.includes('fruti')) colorClass = 'coffee';
      else if (cLower === 'trigo' || cLower.includes('algod') || cLower.includes('arroz')) colorClass = 'wheat';`;

// Normalize line endings
let nCode = code.replace(/\r\n/g, '\n');
let nTarget = target.replace(/\r\n/g, '\n');
let nReplacement = replacement.replace(/\r\n/g, '\n');

if (nCode.includes(nTarget)) {
  nCode = nCode.replace(nTarget, nReplacement);
  fs.writeFileSync('app.js', nCode);
  console.log("Success!");
} else {
  console.log("Target not found!");
}
