function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const finalList = [...nums1, ...nums2].sort((a, b) => a - b);

    const finalListLenght = finalList.length;

    const isOdd = finalListLenght % 2 === 0;

    if (isOdd) {
        const indexRight = finalListLenght / 2;
        const indexLeft = indexRight - 1;
        return (finalList[indexLeft] + finalList[indexRight]) / 2;
    } else {
        const index = Math.trunc(finalListLenght / 2);
        const answer = finalList[index];
        return answer
    }
};

console.log(findMedianSortedArrays([1, 3], [2]))
console.log(findMedianSortedArrays([1, 2], [3, 4]))

