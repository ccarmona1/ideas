'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });

    main();
});

function readline() {
    return inputString[currentLine++];
}
// Make a Snippet for the code above this and then write your logic in main();

function main() {
    const [n, m, a] = readline().split(' ').map(Number);
    const y = Math.ceil(n / a);
    const x = Math.ceil(m / a);
    const result = x * y
    console.log(result);
}
