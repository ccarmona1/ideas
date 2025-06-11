// Función que simula el comportamiento de un decorador de clase
function addTimestamp(TargetClass) {
  return class extends TargetClass {
    constructor(...args) {
      super(...args);
      this.createdAt = new Date(); // Añade una nueva propiedad a la instancia
      console.log(`[${TargetClass.name}] Instancia creada en: ${this.createdAt.toLocaleString()}`);
    }

    getTimestamp() {
      return this.createdAt;
    }
  };
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getProductInfo() {
    return `${this.name} - $${this.price}`;
  }
}

// Aplicar el "decorador" manualmente
const TimestampedProduct = addTimestamp(Product);

console.log("--- Simulación de Decorador de Clase ---");

const tv = new TimestampedProduct("Smart TV", 899.99);
console.log(tv.getProductInfo());
console.log(`Timestamp: ${tv.getTimestamp()}`);
// console.log(tv instanceof Product); // true si el decorador usa Proxy o mezcla directamente

const phone = new TimestampedProduct("Smartphone", 599.99);
console.log(phone.getProductInfo());
console.log(`Timestamp: ${phone.getTimestamp()}`);

// javascript todavía no soporta decoradores de clase de forma nativa, pero esta es una simulación