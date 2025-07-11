function longestValidParentheses(s: string): number {
  let left = 0;
  let right = 0;
  let tempQueue: string[] = [];
  let max = 0;

  while (right < s.length) {
    const itemLeft = s[right];
    if (itemLeft === '(') {
      tempQueue.push(itemLeft);
    } else if (tempQueue.pop() !== '(') {
      left++;
    } else {
      max = Math.max(max, right - left);
    }
    right++;
  }

  return max;
}

console.log(longestValidParentheses('(()')); // 2
console.log(longestValidParentheses(')()())')); // 4
console.log(longestValidParentheses('()(()')); // 2
console.log(longestValidParentheses('()(())')); // 6
