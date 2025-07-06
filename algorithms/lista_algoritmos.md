# Lista de Ejercicios de Algoritmos para Comprender Complejidad Algorítmica

Esta lista está ordenada de menor a mayor dificultad y cubre distintos tipos de complejidad (tiempo y espacio). Cada ejercicio incluye una breve descripción y casos de prueba, incluyendo algunos casos complejos para testear tus soluciones.

---

## 1. Suma de un array

**Descripción:** Dado un array de números, devuelve la suma de todos sus elementos.

**Casos de prueba:**

- `[1, 2, 3, 4, 5]` → `15`
- `[]` → `0`
- `[1000000, 2000000, 3000000]` → `6000000`
- Array de 1 millón de elementos aleatorios

---

## 2. Búsqueda lineal

**Descripción:** Dado un array y un valor, determina si el valor está presente en el array.

**Casos de prueba:**

- `[1, 2, 3, 4, 5], 3` → `true`
- `[1, 2, 3, 4, 5], 6` → `false`
- Array de 1 millón de elementos, buscar el último elemento

---

## 3. Búsqueda binaria

**Descripción:** Dado un array ordenado y un valor, determina si el valor está presente usando búsqueda binaria.

**Casos de prueba:**

- `[1, 2, 3, 4, 5], 4` → `true`
- `[1, 2, 3, 4, 5], 0` → `false`
- Array ordenado de 1 millón de elementos, buscar el elemento central

---

## 4. Inversión de una cadena

**Descripción:** Dada una cadena, invierte su contenido.

**Casos de prueba:**

- `"hola"` → `"aloh"`
- `""` → `""`
- Cadena de 100,000 caracteres

---

## 5. Detección de palíndromos

**Descripción:** Determina si una cadena es un palíndromo (se lee igual al derecho y al revés).

**Casos de prueba:**

- `"anilina"` → `true`
- `"hola"` → `false`
- Cadena palíndroma de 100,000 caracteres

---

## 6. Ordenamiento por burbuja (Bubble Sort)

**Descripción:** Implementa el algoritmo de ordenamiento burbuja.

**Casos de prueba:**

- `[5, 3, 8, 4, 2]` → `[2, 3, 4, 5, 8]`
- Array de 1,000 elementos aleatorios

---

## 7. Ordenamiento rápido (Quick Sort)

**Descripción:** Implementa el algoritmo de ordenamiento rápido.

**Casos de prueba:**

- `[5, 3, 8, 4, 2]` → `[2, 3, 4, 5, 8]`
- Array de 10,000 elementos aleatorios

---

## 8. Fibonacci recursivo y dinámico

**Descripción:** Calcula el n-ésimo número de Fibonacci de forma recursiva y usando programación dinámica.

**Casos de prueba:**

- `n = 10` → `55`
- `n = 30` → `832040`
- `n = 45` (prueba la diferencia de rendimiento entre ambas soluciones)

---

## 9. Suma de subarrays máximos (Maximum Subarray Sum, Kadane)

**Descripción:** Dado un array de enteros, encuentra la suma máxima de un subarray contiguo.

**Casos de prueba:**

- `[-2,1,-3,4,-1,2,1,-5,4]` → `6`
- Array de 100,000 elementos con valores positivos y negativos

---

## 10. Búsqueda de caminos en una matriz (Backtracking)

**Descripción:** Dada una matriz de 0s y 1s, encuentra si existe un camino de la esquina superior izquierda a la inferior derecha solo pasando por 1s.

**Casos de prueba:**

- Matriz 3x3 simple
- Matriz 10x10 con obstáculos
- Matriz 100x100 con caminos complejos

---

## 11. Problema de la mochila (Knapsack, DP)

**Descripción:** Dado un conjunto de pesos y valores, y una capacidad máxima, encuentra el valor máximo que se puede obtener sin exceder la capacidad.

**Casos de prueba:**

- Pesos: `[1, 3, 4, 5]`, Valores: `[1, 4, 5, 7]`, Capacidad: `7` → `9`
- 20 elementos, capacidad 50

---

## 12. Dijkstra (camino más corto en grafos)

**Descripción:** Dado un grafo representado como lista de adyacencia y un nodo origen, encuentra el camino más corto a todos los nodos.

**Casos de prueba:**

- Grafo simple de 5 nodos
- Grafo de 100 nodos, caminos aleatorios

---

## 13. Combinaciones y permutaciones (Backtracking)

**Descripción:** Genera todas las combinaciones/permutaciones posibles de un conjunto de elementos.

**Casos de prueba:**

- `[1,2,3]` → todas las permutaciones
- Conjunto de 6 elementos (verifica rendimiento)

---

## 14. Problemas clásicos de entrevistas

- Anagrama
- Dos sumas (Two Sum)
- Subconjuntos (Subsets)
- Longest Substring Without Repeating Characters

Incluye casos de prueba grandes para cada uno.

---

**Sugerencia:**

- Implementa cada algoritmo, mide su tiempo y espacio, y analiza cómo crece la complejidad con los casos de prueba grandes.
- Puedes agregar tus propios ejercicios o variantes.
