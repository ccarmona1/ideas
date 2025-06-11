function suma(a, b) {
  return a + b;
}

// Calienta la función con números (para que se optimice)
for (let i = 0; i < 1_000_000; i++) {
  suma(1, 2);
}

// Provoca desoptimización usando un tipo diferente
suma("a", 2);

// node --trace-opt --trace-deopt practicalTask.js