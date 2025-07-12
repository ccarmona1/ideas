function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  console.log(nums);
  return k;
}

// Ejemplo de uso:
const nums1 = [1, 1, 2];
//const k1 = removeDuplicates(nums1);
//console.log(k1, nums1.slice(0, k1)); // 2, [1,2]

const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k2 = removeDuplicates(nums2);
//console.log(k2, nums2.slice(0, k2)); // 5, [0,1,2,3,4]
