function isValid(s: string): boolean {
  const charsMap = new Map([
    ['}', '{'],
    [']', '['],
    [')', '('],
  ]);
  let queue: string[] = [];

  for (const char of s) {
    const isClose = charsMap.has(char);
    if (!isClose) {
      queue.push(char);
    } else {
      const openChar = charsMap.get(char);
      if (queue[queue.length - 1] === openChar) {
        queue = queue.slice(0, queue.length - 1);
      } else {
        return false;
      }
    }
  }

  return queue.length === 0;
}

console.log(isValid('()'));
console.log(isValid('(())'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('([])'));
