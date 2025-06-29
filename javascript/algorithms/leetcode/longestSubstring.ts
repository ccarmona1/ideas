function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char)! >= left) {
      left = map.get(char)! + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  console.log(maxLen);

  return maxLen;
}

/* 

Este algoritmo va moviendo una ventana en el arreglo (representemos la ventana con {}), algo así

string original = [a,n,v,i,a,j]

primera iteración

left = 0
right = 0
mapa = a-0
[{a},n,v,i,a,j]

segunda iteración

left = 0
right = 1
mapa = a-0,n-1
[{a,n},v,i,a,j]

tercera iteración 

left = 0
right = 2
mapa = a-0,n-1,v-2
[{a,n,v},i,a,j]

cuarta iteración

left = 0
right = 3
mapa = a-0,n-1,v-2,i-3
[{a,n,v,i},a,j]

quinta iteración, se encuentra una a (el valor máximo del string 
sin repeticiones se actualiza a 4 y se actualiza el left)

left = 1 (la última vez que se vio a "a" fue en la posición 0, por ende continuamos con el siguiente caracter)
right = 1 (se reinicia right, la ventana empieza con un solo caracter)
maxLengt = 4
mapa = n-1 se reinicia el mapa
[a,{n},v,i,a,j]

sexta iteración

left=1
right=2
maxLengt = 4
mapa = n-1,v-2
[a,{n,v},i,a,j]

... se continua así hasta la j

left=1
right=5
maxLengt = 5
mapa = n-1,v-2,i-3,a-4,j-5
[a,{n,v,i,a,j}]

se termina el ciclo, maxLenght = 5

*/

lengthOfLongestSubstring('anviaj');
lengthOfLongestSubstring('bbbbb');
lengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('pwwkew');
lengthOfLongestSubstring('dvdf');
lengthOfLongestSubstring('aab');
