function longestValidParentheses(s: string): number {
  let maxLen = 0;
  let openCount = 0;
  let closeCount = 0;

  // Left to right
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      openCount++;
    } else {
      closeCount++;
    }
    if (openCount === closeCount) {
      maxLen = Math.max(maxLen, 2 * closeCount);
    } else if (closeCount > openCount) {
      openCount = 0;
      closeCount = 0;
    }
  }

  openCount = 0;
  closeCount = 0;
  // Right to left
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '(') {
      openCount++;
    } else {
      closeCount++;
    }
    if (openCount === closeCount) {
      maxLen = Math.max(maxLen, 2 * openCount);
    } else if (openCount > closeCount) {
      openCount = 0;
      closeCount = 0;
    }
  }

  return maxLen;
}

// console.log(longestValidParentheses('(()')); // 2
// console.log(longestValidParentheses(')()())')); // 4
// console.log(longestValidParentheses('()(()')); // 2
// console.log(longestValidParentheses('()(())')); // 6
// console.log(longestValidParentheses('(()())')); // 6
// console.log(longestValidParentheses('((()))())')); // 8
// console.log(longestValidParentheses(')()())()()(')); // 4
console.log(longestValidParentheses(')(((((()())()()))()(()))(')); // 22
