function buildLPS(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let length = 0;

  for (let i = 1; i < pattern.length; ) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length > 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;

  const lps = buildLPS(needle);
  let i = 0; // puntero en haystack
  let j = 0; // puntero en needle

  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;

      if (j === needle.length) {
        return i - j;
      }
    } else {
      if (j > 0) {
        j = lps[j - 1];
      } else {
        i++; // i solo avanza si j es 0
      }
    }
  }

  return -1;
}

// console.log(strStr('aaa', 'aaaa')); // -1
console.log(strStr('mississippi', 'issip')); // 4
// console.log(strStr('mississippi', 'pi')); // 9
// console.log(strStr('sadbutsad', 'sad')); // 0
// console.log(strStr('leetcode', 'leeto')); // -1
// console.log(strStr('hello', 'll')); // 2
