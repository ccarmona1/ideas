function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  // Si llegamos aquí, todos eran 9
  digits.unshift(1);
  return digits;
}

console.log(plusOne([1, 2, 9, 9])); // [1,3,0,0]
console.log(plusOne([9])); // [1,0]
console.log(plusOne([9, 9])); // [1,0,0]
console.log(plusOne([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
