function searchInsert(nums: number[], target: number): number {
  const n = nums.length;
  let low = 0;
  let high = n;

  while (low <= high) {
    const cut = Math.floor((low + high) / 2);
    // la busqueda binaria se trata de hacer el corte en el array y mirar items de izquierda y derecha

    const leftItem = nums[cut - 1];
    const rightItem = nums[cut];

    if (leftItem === target) {
      return cut - 1;
    } else if (rightItem === target) {
      return cut;
    }

    if (!leftItem) {
      return rightItem > target ? cut : cut + 1;
    } else if (!rightItem) {
      return leftItem < target ? cut : cut - 1;
    }

    if (leftItem > target) {
      // si el item de la izquiera es mayor, significa que seguiremos buscando por el lado izquiero
      high = cut - 1;
    } else if (rightItem < target && cut !== 0) {
      // si el item de la derecha es menor, significa que seguiremos buscando por el lado derecho
      low = cut + 1;
    } else {
      return cut; // en caso de que ningún lado sea el correcto, significa que ya encontramos el item o la posición donde debería de ir
    }
  }

  return 0;
}

console.log(searchInsert([1, 3, 5, 6], 5));
console.log(searchInsert([1, 3, 5, 6], 2));
console.log(searchInsert([1, 3, 5, 6], 7));
console.log(searchInsert([1, 3, 5, 6], 0));
console.log(searchInsert([1, 3], 2));
