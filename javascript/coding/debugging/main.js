function Animal(name) {
  this.name = name;
  this.species = "Generic Animal"; // Propiedad propia
}

Animal.prototype.makeSound = function() { // Método en el prototipo de Animal
  console.log("...");
};

Animal.prototype.describe = function() {
  // Aquí this debería referirse a la instancia
  console.log(`${this.name} is a ${this.species}.`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Llama al constructor padre para heredar propiedades propias
  this.breed = breed; // Propiedad propia de Dog
  this.species = "Canine"; // Sombrea la propiedad 'species' de Animal
}

// Configura la cadena de prototipos: Dog.prototype hereda de Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Corrige la propiedad 'constructor'

Dog.prototype.makeSound = function() { // Sombrea el método 'makeSound' de Animal
  console.log("Woof!");
};

const myDog = new Dog("Buddy", "Golden Retriever");
const myCat = new Animal("Whiskers"); // Un animal genérico

// PROBLEMA SIMULADO: myDog.describe() no imprime la especie correcta inicialmente.
// O un dev modifica Animal.prototype y afecta a todos.

console.log("--- Debugging Scenario 1: Dog's describe() ---");
myDog.describe(); // <--- BREAKPOINT 1: en la llamada a describe()
console.log("--- Debugging Scenario 2: Cat's makeSound() ---");
myCat.makeSound(); // <--- BREAKPOINT 2: en la llamada a makeSound()
console.log("--- Debugging Scenario 3: Investigating Shadowing ---");
console.log(myDog.hasOwnProperty('species')); // true
console.log(Object.getPrototypeOf(myDog).hasOwnProperty('species')); // false
console.log(Object.getPrototypeOf(Object.getPrototypeOf(myDog)).hasOwnProperty('species')); // true (Animal.prototype)
