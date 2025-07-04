const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');

const modDir = join(__dirname, 'modulos');
const moduleFiles = readdirSync(modDir)
  .filter((f) => /^module\d+\.md$/.test(f))
  .sort((a, b) => {
    const numA = parseInt(a.match(/module(\d+)\.md/)[1], 10);
    const numB = parseInt(b.match(/module(\d+)\.md/)[1], 10);
    return numA - numB;
  })
  .map((f) => `modulos/${f}`);

const files = ['course.md', ...moduleFiles];

let output = '';

for (const file of files) {
  output += readFileSync(join(__dirname, file), 'utf8') + '\n';
}

writeFileSync(join(__dirname, 'course_full.md'), output);
console.log('Archivo consolidado generado.');
