function twoSum(nums: number[], target: number): number[] {
    let answer: number[] = [];
    const hashMap = new Map()

    nums.forEach((num, i) => {
        const complemento = target - num;
        const existsInMap = hashMap.has(complemento);
        if (existsInMap) {
            answer = [i, hashMap.get(complemento)]
        }
        hashMap.set(num, i)
    })

    return answer
};

twoSum([3, 2, 4], 6)