function reverse(x: number): number {
  let num = Math.abs(x);
  let reversed = 0;

  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }

  if (reversed > 2 ** 31 - 1) return 0;
  return x < 0 ? -reversed : reversed;
}

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(1534236469));
