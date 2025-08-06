const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');

const modDir = join(__dirname, 'modules');
const moduleFiles = readdirSync(modDir)
  .filter((f) => /^\d+_.+\.md$/.test(f))
  .sort((a, b) => {
    const numA = parseInt(a.match(/^(\d+)_/)[1], 10);
    const numB = parseInt(b.match(/^(\d+)_/)[1], 10);
    return numA - numB;
  })
  .map((f) => join('modules', f));

let output = '';

for (const file of moduleFiles) {
  output += readFileSync(join(__dirname, file), 'utf8') + '\n';
}

writeFileSync(join(__dirname, 'course_full.md'), output);
console.log('Full file generated.');
