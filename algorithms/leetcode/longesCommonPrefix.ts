function longestCommonPrefix(strs: string[]): string {
  const pivot = strs[0];
  let longestPrefix = '';

  for (let index = 0; index < pivot.length; index++) {
    let isValid = true;
    const currentChar = pivot[index];
    for (let j = 1; j < strs.length; j++) {
      isValid = currentChar === strs[j][index];
      if (!isValid) {
        break;
      }
    }
    if (!isValid) {
      break;
    } else {
      longestPrefix += currentChar;
    }
  }

  return longestPrefix;
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
