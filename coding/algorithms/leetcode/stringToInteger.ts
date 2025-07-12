function myAtoi(s: string): number {
  const validStartChars = ['-', '+'];

  let stringNumber = '';
  let startedNumber = false;

  for (const char of s) {
    if (!Number.isNaN(Number(char)) && char !== ' ') {
      stringNumber += char;
      startedNumber = true;
    } else if (!startedNumber && char === ' ') {
      continue;
    } else if (!startedNumber && validStartChars.includes(char)) {
      stringNumber += char;
      startedNumber = true;
    } else {
      break;
    }
  }

  const number = Number(stringNumber ?? 0);

  const isNegative = number < 0;

  const n = Math.log2(Math.abs(number));

  if (n >= 31) {
    return isNegative ? 2 ** 31 * -1 : 2 ** 31 - 1;
  }

  return Number.isNaN(number) ? 0 : number;
}

console.log(myAtoi('42'));
console.log(myAtoi('1337c0d3'));
console.log(myAtoi(' -042'));
console.log(myAtoi('-1337c0d3'));
console.log(myAtoi('0-1'));
console.log(myAtoi('words and 987'));
console.log(myAtoi('91283472332'));
console.log(myAtoi('-91283472332'));
console.log(myAtoi('.1'));
console.log(myAtoi('+-12'));
console.log(myAtoi('2147483648'));
