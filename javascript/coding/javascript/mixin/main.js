const withConducible = (Base) =>
  class extends Base {
    #encendido = false;

    constructor(...args) {
      super(...args);
    }

    arrancar() {
      console.log("Arrancando el motor");
      this.#encendido = true;
    }
    detener() {
      console.log("Deteniendo el motor");
      this.#encendido = false;
    }
    estado() {
      console.log(
        this.#encendido ? "El motor está encendido" : "El motor está detenido"
      );
    }
  };

const withNavegable = (Base) =>
  class extends Base {
    #navegando = false;

    constructor(...args) {
      super(...args);
    }

    anclar() {
      console.log("Anclando el barco");
      this.#navegando = true;
    }
    soltarAncla() {
      console.log("Soltando el ancla del barco");
      this.#navegando = false;
    }
    estado() {
      return this.#navegando
        ? "El barco está navegando"
        : "El barco está atracado";
    }
  };

class Carro extends withNavegable(withConducible(Object)) {
  constructor(marca, modelo) {
    super();
    this.marca = marca;
    this.modelo = modelo;
  }

  info() {
    return `Carro: ${this.marca} ${this.modelo}`;
  }
}

class Barco extends withNavegable(Object) {
  constructor(marca, modelo) {
    super();
    this.marca = marca;
    this.modelo = modelo;
  }

  info() {
    return `Barco: ${this.marca} ${this.modelo}`;
  }
}

const miCarro = new Carro("Toyota", "Corolla");

miCarro.estado();
