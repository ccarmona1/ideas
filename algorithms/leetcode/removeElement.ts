function removeElement(nums: any[], val: number): number {
  let k = 0;
  for (let x = 1; x < nums.length; x++) {
    const previous = nums[x - 1];
    const current = nums[x];
    if (previous === val && current !== val) {
      nums[x - 1] = current;
      nums[x] = '_';
    }
    if (previous !== val && current === val) {
      nums[x] = '_';
    }

    if (previous === val) k++;
  }

  if (nums[nums.length - 1] === val) {
    nums[nums.length - 1] = '_';
  }

  console.log(nums);

  return k;
}

console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); // 5 // [0,1,4,0,3,_,_,_]
