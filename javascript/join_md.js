const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const files = [
  'course.md',
  'module6.md',
];

let output = '';

for (const file of files) {
  output += readFileSync(join(__dirname, file), 'utf8') + '\n';
}

writeFileSync(join(__dirname, 'course_full.md'), output);
console.log('Archivo consolidado generado.');