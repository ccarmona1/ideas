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

quinta iteración, se encuentra una "a" 
se calcula el maxLength = right - left  + 1

se recalcula el left usando el mapa y mirando la última ubicación de "a" (0) + 1 = 1
left = 1
right = 4
mapa = a-4,n-1,v-2,i-3
[a,{n,v,i,a},j]

sexta iteración

left = 1
right = 5
mapa = a-4,n-1,v-2,i-3
[a,{n,v,i,a,j}]

se acaba el ciclo, maxLenght = 5


*/

lengthOfLongestSubstring('anviaj');
// lengthOfLongestSubstring('bbbbb');
// lengthOfLongestSubstring('abcabcbb');
// lengthOfLongestSubstring('pwwkew');
// lengthOfLongestSubstring('dvdf');
// lengthOfLongestSubstring('aab');
