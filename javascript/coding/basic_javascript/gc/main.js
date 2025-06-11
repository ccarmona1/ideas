function createLeakyArray() {
  const bigData = new Array(1000000).fill("some long string data");
  let dataStore = [];

  return function addData(item) {
    // Intencionalmente creamos una referencia a bigData dentro de la closure
    // aunque no se use directamente para 'item'.
    dataStore.push({ item: item, reference: bigData });
    if (dataStore.length > 5) {
      // Intentamos "limpiar" los primeros elementos, pero ¿es suficiente?
      dataStore = dataStore.slice(dataStore.length - 5);
    }
    console.log(
      `Array size: ${dataStore.length}, RSS: ${
        process.memoryUsage().rss / (1024 * 1024)
      } MB`
    );
  };
}

const addDataToStore = createLeakyArray();

for (let i = 0; i < 20; i++) {
  addDataToStore(`item_${i}`);
  // Pequeña pausa para permitir que el GC actúe si es posible
  if (i % 5 === 0) {
    //global.gc(); // Solo para propósitos de demostración, no usar en producción
  }
}

// Después del bucle, ¿qué sucede con 'bigData'?
// Intencionalmente dejamos una referencia a addDataToStore para mantener la closure viva
console.log("--- Fin del bucle ---");
setTimeout(() => {
  console.log(`Final RSS: ${process.memoryUsage().rss / (1024 * 1024)} MB`);
  // Una forma de "romper" la referencia si se quisiera forzar la recolección eventualmente
  // addDataToStore = null;
}, 5000);
