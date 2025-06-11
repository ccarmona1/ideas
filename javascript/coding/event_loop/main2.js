console.log(1); // Código sincrónico

// Promesa resuelta inmediatamente (Microtask)
Promise.resolve().then(() => {
  console.log(2);
});

// Macrotask: setTimeout con 1 segundo de retraso
setTimeout(() => {
  console.log(3);
}, 1000);

// Macrotask: setTimeout con 0 milisegundos de retraso
setTimeout(() => {
  console.log(4);
}, 0);

// Microtask manualmente programada
queueMicrotask(() => {
  console.log(5);
});

// Promesa resuelta después de un segundo (Microtask después de resolución)
new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
}).then(() => {
  console.log(6);
});

// Función async/await
async function ejemploAsyncAwait() {
  console.log(7); // Código sincrónico dentro de la función async

  const resultado1 = await Promise.resolve();
  console.log(8); // Después del primer await (Microtask)

  const resultado2 = await new Promise((resolve) =>
    setTimeout(() => resolve(), 1000)
  );
  console.log(9); // Después del segundo await (Microtask)
}

ejemploAsyncAwait();

console.log(10); // Código sincrónico

/**
 * 1
7
10
2
5
8
4
3
6
9
 */