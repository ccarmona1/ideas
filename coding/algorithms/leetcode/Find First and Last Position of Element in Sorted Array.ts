function searchRange(nums: number[], target: number): number[] {
  // Busca la primera posición (lower bound)
  function findFirst(): number {
    let left = 0,
      right = nums.length - 1,
      res = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        res = mid;
        right = mid - 1; // sigue buscando a la izquierda
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res;
  }

  // Busca la última posición (upper bound)
  function findLast(): number {
    let left = 0,
      right = nums.length - 1,
      res = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        res = mid;
        left = mid + 1; // sigue buscando a la derecha
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res;
  }

  const first = findFirst();
  const last = findLast();
  return [first, last];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3,4]
console.log(searchRange([5, 7, 7, 8, 8, 8, 10], 8)); // [3,5]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1,-1]
