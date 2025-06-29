function longestPalindrome(s: string): string {
  if (s.length < 2) return s; // si el string es menor a dos caracteres, obvio es palindromo

  let start = 0;
  let end = 0;

  function expandAroundCenter(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  }

  for (let i = 0; i < s.length; i++) {
    // Recorremos los caracteres y "expandimos"
    let [leftImpar, rightImpar] = expandAroundCenter(i, i); // expandimos para palindromos impares
    let [leftPar, rightPar] = expandAroundCenter(i, i + 1); // expandimos para palindromos pares

    if (rightImpar - leftImpar > end - start) {
      // se define el máximo
      start = leftImpar;
      end = rightImpar;
    }
    if (rightPar - leftPar > end - start) {
      // se define el maximo
      start = leftPar;
      end = rightPar;
    }
  }

  return s.substring(start, end + 1);
}

console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));
