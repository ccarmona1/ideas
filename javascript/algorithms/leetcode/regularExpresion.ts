function isMatch(s: string, pattern: string): boolean {
  const m = s.length;
  const n = pattern.length;
  // dp[i][j] = true si s[0..i-1] hace match con pattern[0..j-1]
  const dp: boolean[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(false)
  );
  dp[0][0] = true;

  // Inicialización para patrones como a*, a*b*, etc.
  for (let j = 2; j <= n; j++) {
    if (pattern[j - 1] === '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (pattern[j - 1] === '*') {
        // '*' puede tomar cero ocurrencias del caracter anterior
        dp[i][j] = dp[i][j - 2];
        // o si el caracter anterior coincide con s[i-1] o es '.'
        if (pattern[j - 2] === s[i - 1] || pattern[j - 2] === '.') {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      } else if (pattern[j - 1] === s[i - 1] || pattern[j - 1] === '.') {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}

console.log(isMatch('aa', 'a')); // false
console.log(isMatch('aa', 'a*')); // true
console.log(isMatch('aa', '.*')); // true
console.log(isMatch('abcdddddd', 'ab.d*')); // true
console.log(isMatch('abcddddddeee', 'ab.d*')); // false
console.log(isMatch('aab', 'c*a*b')); // true
console.log(isMatch('ab', '.*c')); // false
console.log(isMatch('aaa', 'aaaa')); // false
