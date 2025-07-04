function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  if (x % 10 === 0 && x !== 0) return false;

  let reverted = 0;
  let original = x;

  while (original > reverted) {
    reverted = reverted * 10 + (original % 10);
    original = Math.floor(original / 10);
  }

  return original === reverted || original === Math.floor(reverted / 10);
}
console.log(isPalindrome(121));
console.log(isPalindrome(123));
console.log(isPalindrome(10));
console.log(isPalindrome(-101));
