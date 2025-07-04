"use strict";

// Definición de Records y Tuples
console.log("--- Definición de Records y Tuples ---");

const point = #{ x: 10, y: 20 };
const color = #{ r: 255, g: 0, b: 0, alpha: 1.0 };
const coordinates = #[100, 200, 300];
const items = #["apple", "banana", "orange"];

console.log("Point:", point);
console.log("Color:", color);
console.log("Coordinates:", coordinates);
console.log("Items:", items);

// Inmutabilidad (intentos de modificación - esto lanzaría un TypeError si estuvieran implementados)
console.log("\n--- Inmutabilidad (intentos de modificación) ---");

// Esto intentaría mutar el Record 'point', y lanzaría un TypeError:
// point.x = 15;

// Esto intentaría mutar el Tuple 'coordinates', y lanzaría un TypeError:
// coordinates.push(400);

try {
  // Si la implementación fuera estricta, estas líneas generarían errores
  // point.x = 15;
  // console.log("ERROR: Point modificado inesperadamente:", point);
} catch (e) {
  // console.log("Correcto: No se pudo modificar el Record 'point'.", e.message);
}

try {
  // coordinates.push(400);
  // console.log("ERROR: Tuple modificado inesperadamente:", coordinates);
} catch (e) {
  // console.log("Correcto: No se pudo modificar el Tuple 'coordinates'.", e.message);
}

// Comparación por valor
console.log("\n--- Comparación por Valor ---");

const point2 = #{ x: 10, y: 20 };
const point3 = #{ x: 15, y: 20 };

// Para objetos literales normales:
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log("{} === {}:", obj1 === obj2); // false (comparación por referencia)

// Para Records:
console.log("point === point2:", point === point2); // true (comparación por valor)
console.log("point === point3:", point === point3); // false (diferentes valores)

const items2 = #["apple", "banana", "orange"];
const items3 = #["apple", "banana", "grape"];

// Para Arrays normales:
const arr1 = [1, 2];
const arr2 = [1, 2];
console.log("[] === []:", arr1 === arr2); // false (comparación por referencia)

// Para Tuples:
console.log("items === items2:", items === items2); // true (comparación por valor)
console.log("items === items3:", items === items3); // false (diferentes valores)

// Records y Tuples anidados
console.log("\n--- Records y Tuples Anidados ---");

const userProfile = #{
  id: 1,
  name: "Alice",
  address: #{
    street: "123 Main St",
    city: "Anytown",
    zip: #[12345, 67890], // Tuple anidado
  },
  hobbies: #["reading", "coding"], // Tuple anidado
  preferences: #{
    theme: "dark",
    notifications: true,
  },
};

console.log("User Profile:", userProfile);

const userProfile2 = #{
  id: 1,
  name: "Alice",
  address: #{
    street: "123 Main St",
    city: "Anytown",
    zip: #[12345, 67890],
  },
  hobbies: #["reading", "coding"],
  preferences: #{
    theme: "dark",
    notifications: true,
  },
};

console.log("userProfile === userProfile2:", userProfile === userProfile2); // true (comparación por valor profundo)

// Acceso a propiedades (como objetos/arrays normales)
console.log("\n--- Acceso a Propiedades ---");
console.log("point.x:", point.x);
console.log("coordinates[1]:", coordinates[1]);
console.log("userProfile.address.city:", userProfile.address.city);
console.log("userProfile.address.zip[0]:", userProfile.address.zip[0]);

// Uso en funciones
console.log("\n--- Uso en Funciones ---");

function updatePoint(p, deltaX, deltaY) {
  // Retorna un NUEVO Record, no muta el original
  return #{ x: p.x + deltaX, y: p.y + deltaY };
}

let currentPoint = #{ x: 0, y: 0 };
console.log("Initial Point:", currentPoint);

currentPoint = updatePoint(currentPoint, 5, 5);
console.log("Updated Point:", currentPoint); // #{ x: 5, y: 5 }

currentPoint = updatePoint(currentPoint, 3, -2);
console.log("Updated Point Again:", currentPoint); // #{ x: 8, y: 3 }

// Uso en estructuras de datos (ej. como claves en Map, lo cual es imposible con objetos/arrays normales)
console.log("\n--- Uso en Map como Claves (Ventaja Mayor) ---");

const myMap = new Map();
const key1 = #{ id: 1, type: "user" };
const key2 = #{ id: 1, type: "user" }; // Mismo contenido que key1

myMap.set(key1, "Value for User 1");

console.log("Map has key1:", myMap.has(key1)); // true (comparación por valor)
console.log("Map has key2:", myMap.has(key2)); // true (comparación por valor)
console.log("Value for key1:", myMap.get(key1)); // "Value for User 1"
console.log("Value for key2:", myMap.get(key2)); // "Value for User 1"

const key3 = #{ id: 2, type: "product" };
console.log("Map has key3:", myMap.has(key3)); // false (diferente contenido)

// Arrays/Objetos regulares NO funcionarían así en Map como claves
const objKey1 = { id: 1, type: "user" };
const objKey2 = { id: 1, type: "user" };
const regularMap = new Map();
regularMap.set(objKey1, "Value for User 1");
console.log("Regular Map has objKey1:", regularMap.has(objKey1)); // true
console.log("Regular Map has objKey2:", regularMap.has(objKey2)); // false (diferente referencia)
