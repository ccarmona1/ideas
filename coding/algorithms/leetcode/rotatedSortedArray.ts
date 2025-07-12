function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    console.log(nums[left], nums[mid], nums[right]);
    if (nums[mid] === target) return mid;

    // Determina si la mitad izquierda está ordenada
    if (nums[left] <= nums[mid]) {
      // ¿El target está en la mitad izquierda ordenada?
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Si no, la mitad derecha está ordenada
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

// Ejemplo de uso:
console.log(search([4, 5, 6, 7, 8, 0, 1, 2], 0)); // 4
// console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
// console.log(search([1], 0)); // -1
