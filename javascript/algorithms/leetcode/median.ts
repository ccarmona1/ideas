function convertInfinitePositive(number: number) {
  return Number.isFinite(number)
    ? number
    : number > 0
    ? 0
    : Number.MIN_SAFE_INTEGER;
}

function convertInfiniteNegative(number: number) {
  return Number.isFinite(number)
    ? number
    : number < 0
    ? 0
    : Number.MAX_SAFE_INTEGER;
}

function findMedianSortedArrays(
  smallerArray: number[],
  largerArray: number[]
): number {
  // Asegurar que nums1 sea el array más pequeño
  if (smallerArray.length > largerArray.length) {
    return findMedianSortedArrays(largerArray, smallerArray);
  }

  const n = smallerArray.length;
  const m = largerArray.length;

  const isOdd = (n + m) % 2 === 0;
  let low = 0; // nos permitirá recorrer el smallerArray para ir haciendo particiones
  let high = n; // es el limite hasta donde haremos particiones. Es el valor length de smallerArray

  while (low <= high) {
    const indexCut1 = Math.floor((low + high) / 2);
    // es el indice donde vamos a partir smallerArray,
    // el índice también indica la cantidad de items hacia la izquier
    const indexCut2 = Math.floor((m + n + 1) / 2) - indexCut1;
    // es el indice donde vamos a partir largerArray,
    // el largerArray se debe de partir donde la suma de los items a la izquiera de largerArray y smallerArray
    // sean igual a la mitad del total de items (igual o +1)

    const itemLeftCut1 = smallerArray[indexCut1 - 1] ?? -Infinity;
    const itemRightCut1 = smallerArray[indexCut1] ?? Infinity;
    const itemLeftCut2 = largerArray[indexCut2 - 1] ?? -Infinity;
    const itemRightCut2 = largerArray[indexCut2] ?? Infinity;

    const allLeftSideIsSmallerThanRightSide =
      itemLeftCut1 <= itemRightCut1 &&
      itemLeftCut1 <= itemRightCut2 &&
      itemLeftCut2 <= itemRightCut1 &&
      itemLeftCut2 <= itemRightCut2;

    if (allLeftSideIsSmallerThanRightSide) {
      if (isOdd) {
        const maxLeftSide = Math.max(
          convertInfinitePositive(itemLeftCut1),
          convertInfinitePositive(itemLeftCut2)
        );
        const minRightSide = Math.min(
          convertInfiniteNegative(itemRightCut1),
          convertInfiniteNegative(itemRightCut2)
        );
        return (maxLeftSide + minRightSide) / 2;
      } else {
        return Math.max(
          convertInfinitePositive(itemLeftCut1),
          convertInfinitePositive(itemLeftCut2)
        );
      }
    } else if (itemLeftCut1 > itemRightCut2) {
      high = indexCut1 - 1;
    } else {
      low = indexCut1 + 1;
    }
  }

  return 0;
}

// console.log(findMedianSortedArrays([1, 3], [2]));
// console.log(findMedianSortedArrays([1, 4, 7], [2, 3, 5, 6, 8, 9]));
// console.log(findMedianSortedArrays([1, 2], [3, 4]));
// console.log(findMedianSortedArrays([0, 0], [0, 0]));
// console.log(findMedianSortedArrays([0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 1]));
// console.log(findMedianSortedArrays([], [2, 3]));
// console.log(findMedianSortedArrays([3], [-2, -1]));
console.log(findMedianSortedArrays([3, 4], [1, 2]));
