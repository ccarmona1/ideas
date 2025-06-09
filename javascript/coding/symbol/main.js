const MY_SYMBOL = Symbol('my private data');


class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this._precio = precio; // Convención de propiedad "privada"
    this.id = Symbol('productId'); // Propiedad usando un Símbolo
    this[MY_SYMBOL] = 3;
    this[MY_SYMBOL] = 2;
  }

  getPrecio() {
    return this._precio;
  }

  setPrecio(nuevoPrecio) {
    if (nuevoPrecio >= 0) {
      this._precio = nuevoPrecio;
    } else {
      console.warn("El precio no puede ser negativo.");
    }
  }
}

const item = new Producto("Laptop", 1200);

console.log(item.id)

const newItem = new Producto("Smartphone", 800);
console.log(newItem.id);

console.log(item.id === newItem.id); // false, porque son símbolos únicos

console.log(item[MY_SYMBOL]); // 2, accediendo a la propiedad privada con símbolo