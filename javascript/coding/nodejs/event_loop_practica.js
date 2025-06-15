// Practica de Event Loop y Thread Pool en Node.js

const fs = require('fs');

console.log('1');

setTimeout(() => {
  console.log('4');
  Promise.resolve().then(() => {
    console.log('10');
    process.nextTick(() => {
      console.log('11');
    });
  });
}, 0);

setImmediate(() => {
  console.log('5');
  setTimeout(() => {
    console.log('12');
  }, 0);
});

Promise.resolve().then(() => {
  console.log('3');
  setImmediate(() => {
    console.log('13');
  });
});

process.nextTick(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('14');
  });
});

fs.readFile(__filename, () => {
  console.log('6');
  process.nextTick(() => {
    console.log('15');
  });
});

async function something()  {
  console.log('7');
  await Promise.resolve();
  console.log('8');
  setTimeout(() => {
    console.log('16');
  }, 0);
};

something().then();

console.log('9');