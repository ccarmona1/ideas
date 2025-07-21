function makeFancyString(s: string): string {
  let result = '';
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (i > 0 && s[i] === s[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    if (count <= 2) result += s[i];
  }

  return result;
}

console.log(makeFancyString('leeetcode')); // leetcode
console.log(makeFancyString('aaabaaaa')); // aabaa
console.log(makeFancyString('aab')); // aab
console.log(makeFancyString('abbcccddddeeeee')); // abbccddee
