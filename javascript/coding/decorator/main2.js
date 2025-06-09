const SimulatedDecoratorAuditable = (reveiedClass) =>
  class extends reveiedClass {
    constructor(...args) {
      super(...args);
      this.createdAt = new Date(); // Añade una nueva propiedad a la instancia
      console.log(
        `[${
          reveiedClass.name
        }] Instancia creada en: ${this.createdAt.toLocaleString()}`
      );
    }

    getTimestamp() {
      return this.createdAt;
    }
  };

const SimulatedDecoratorSingleton = (reveiedClass) => {
  let instance;

  return class extends reveiedClass {
    constructor(...args) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this;
    }

    static getInstance() {
      return instance;
    }
  };
}

class BasicClass {

}


/**
 * function BasicClass() {}
 * 
 * const miClass = new BasicClass();
 * 
 * console.log(miClass instanceof BasicClass); // true
 * console.log(Object.getPrototypeOf(miClass) === BasicClass.prototype); // true
 * console.log(miClass.constructor === BasicClass); // true
 * console.log(miClass.__proto__ === BasicClass.prototype); // true
 * console.log(Object.getPrototypeOf(BasicClass.prototype) === Object.prototype); // true
 * 
 * function SimulatedDecoratorAuditable(createdAt) {
 *    #createdAt = createdAt;
 * }
 * 
 * miClass.prototype = Object.create(SimulatedDecoratorAuditable.prototype);
 * miClass.prototype.constructor = BasicClass;
 * 
 */

const AuditableClass = SimulatedDecoratorAuditable(BasicClass);

const miClass = new AuditableClass();