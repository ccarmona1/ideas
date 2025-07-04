type Action = 'NEW_COLUMN' | 'NEW_ROW' | 'NEW_DIAGONAL';

function convert(s: string, numRows: number): string {
  const rows: string[] = Array.from({ length: numRows }, () => '');

  let x = 0;
  let y = -1;
  let drawingDiagonal = false;

  for (const char of s) {
    if (!drawingDiagonal) {
      y = y + 1;
    } else {
      y = Math.max(y - 1, 0);
      x = x + 1;
      if (y === 0) {
        drawingDiagonal = false;
      }
    }

    rows[y] += char;

    if (!drawingDiagonal) {
      if (y === numRows - 1) {
        drawingDiagonal = true;
        y = numRows - 1;
      } else {
        drawingDiagonal = false;
      }
    }
  }

  return rows.join('');
}

console.log(convert('PAYPALISHIRING', 3));
console.log(convert('PAYPALISHIRING', 4));
console.log(convert('ABCDE', 5));
