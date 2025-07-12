function maxArea(columns: number[]): number {
  const n = columns.length;
  if (n < 3) {
    return Math.min(...columns);
  }

  let indexLeft = 0;
  let indexRight = n - 1;
  let maxArea = 0;

  for (let index = 0; index < columns.length; index++) {
    const columnLeft = columns[indexLeft];
    const columnRight = columns[indexRight];
    const minColumn = Math.min(columnLeft, columnRight);
    const area = (indexRight - indexLeft) * minColumn;
    maxArea = Math.max(maxArea, area);

    if (columnLeft > columnRight) {
      indexRight = indexRight - 1;
    } else if (columnLeft < columnRight) {
      indexLeft = indexLeft + 1;
    } else {
      indexLeft = indexLeft + 1;
    }
  }

  return maxArea;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea([1, 2]));
console.log(maxArea([1, 1]));
console.log(maxArea([8, 7, 2, 1]));
