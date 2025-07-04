const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const files = [
  'course.md',
  'module1.md',
  'module2.md',
  'module3.md',
  'module4.md',
  'module5.md',
  'module6.md',
];

let output = '';

for (const file of files) {
  output += readFileSync(join(__dirname, file), 'utf8') + '\n';
}

writeFileSync(join(__dirname, 'course_full.md'), output);
console.log('Archivo consolidado generado.');
