# List of Algorithm Exercises to Understand Algorithmic Complexity

This list is ordered from lowest to highest difficulty and covers different types of complexity (time and space). Each exercise includes a brief description and test cases, including some complex cases to test your solutions.

---

## 1. Array Sum

**Description:** Given an array of numbers, return the sum of all its elements.

**Test cases:**

- `[1, 2, 3, 4, 5]` → `15`
- `[]` → `0`
- `[1000000, 2000000, 3000000]` → `6000000`
- Array of 1 million random elements

---

## 2. Linear Search

**Description:** Given an array and a value, determine if the value is present in the array.

**Test cases:**

- `[1, 2, 3, 4, 5], 3` → `true`
- `[1, 2, 3, 4, 5], 6` → `false`
- Array of 1 million elements, search for the last element

---

## 3. Binary Search

**Description:** Given a sorted array and a value, determine if the value is present using binary search.

**Test cases:**

- `[1, 2, 3, 4, 5], 4` → `true`
- `[1, 2, 3, 4, 5], 0` → `false`
- Sorted array of 1 million elements, search for the middle element

---

## 4. String Reversal

**Description:** Given a string, reverse its content.

**Test cases:**

- `"hola"` → `"aloh"`
- `""` → `""`
- String of 100,000 characters

---

## 5. Palindrome Detection

**Description:** Determine if a string is a palindrome (reads the same forwards and backwards).

**Test cases:**

- `"anilina"` → `true`
- `"hola"` → `false`
- Palindrome string of 100,000 characters

---

## 6. Bubble Sort

**Description:** Implement the bubble sort algorithm.

**Test cases:**

- `[5, 3, 8, 4, 2]` → `[2, 3, 4, 5, 8]`
- Array of 1,000 random elements

---

## 7. Quick Sort

**Description:** Implement the quick sort algorithm.

**Test cases:**

- `[5, 3, 8, 4, 2]` → `[2, 3, 4, 5, 8]`
- Array of 10,000 random elements

---

## 8. Recursive and Dynamic Fibonacci

**Description:** Calculate the n-th Fibonacci number recursively and using dynamic programming.

**Test cases:**

- `n = 10` → `55`
- `n = 30` → `832040`
- `n = 45` (test the performance difference between both solutions)

---

## 9. Maximum Subarray Sum (Kadane's Algorithm)

**Description:** Given an array of integers, find the maximum sum of a contiguous subarray.

**Test cases:**

- `[-2,1,-3,4,-1,2,1,-5,4]` → `6`
- Array of 100,000 elements with positive and negative values

---

## 10. Pathfinding in a Matrix (Backtracking)

**Description:** Given a matrix of 0s and 1s, find if a path exists from the top-left corner to the bottom-right corner passing only through 1s.

**Test cases:**

- Simple 3x3 matrix
- 10x10 matrix with obstacles
- 100x100 matrix with complex paths

---

## 11. Knapsack Problem (DP)

**Description:** Given a set of weights and values, and a maximum capacity, find the maximum value that can be obtained without exceeding the capacity.

**Test cases:**

- Weights: `[1, 3, 4, 5]`, Values: `[1, 4, 5, 7]`, Capacity: `7` → `9`
- 20 items, capacity 50

---

## 12. Dijkstra's Algorithm (Shortest Path in Graphs)

**Description:** Given a graph represented as an adjacency list and a source node, find the shortest path to all other nodes.

**Test cases:**

- Simple 5-node graph
- 100-node graph, random paths

---

## 13. Combinations and Permutations (Backtracking)

**Description:** Generate all possible combinations/permutations of a set of elements.

**Test cases:**

- `[1,2,3]` → all permutations
- Set of 6 elements (check performance)

---

## 14. Classic Interview Problems

- Anagrama
- Two Sum
- Subconjuntos (Subsets)
- Longest Substring Without Repeating Characters

Include large test cases for each.

---

**Suggestion:**

- Implement each algorithm, measure its time and space, and analyze how the complexity grows with large test cases.
- You can add your own exercises or variations.
