function threeSum(nums: number[]): number[][] {
  let x = 0;
  let y = 1;
  const setSums = new Set(nums);
  const answer: number[][] = [];

  while (x < nums.length && y < nums.length) {
    if (x === y) {
      y = y + 1;
      continue;
    }

    const numX = nums[x];
    const numY = nums[y];

    let numZ = -(numX + numY);
    console.log('numX', x, numX);
    console.log('numY', y, numY);
    console.log('numZ', numZ);
    console.log('sum', numX + numY + numZ);

    if (setSums.has(numZ) && numX !== numZ && numY !== numZ) {
      answer.push([numX, numY, numZ]);
    }
    if (y + 1 > nums.length) {
      x = x + 1;
      y = 0;
    } else {
      y = y + 1;
    }
  }

  return answer;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
