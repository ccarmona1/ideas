
# 🧠 Herencia en JavaScript y TypeScript — Resumen

---

## 🧱 Clases abstractas en TypeScript

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("El animal se mueve.");
  }
}

class Perro extends Animal {
  makeSound(): void {
    console.log("Guau");
  }
}

const perro = new Perro();
perro.makeSound(); // "Guau"
perro.move();      // "El animal se mueve."
```

- Una clase abstracta no puede instanciarse directamente.
- Los métodos abstractos **deben** implementarse en las subclases.
- Los métodos concretos pueden heredarse y usarse directamente.

---

## 🧭 El uso de `super`

| Contexto                | Ejemplo                                       | Uso                                                                 |
|-------------------------|-----------------------------------------------|----------------------------------------------------------------------|
| En el constructor       | `super(param)`                                | Llamar al constructor del padre                                     |
| En métodos de instancia | `super.metodo()`                              | Llamar a un método del padre desde una subclase                     |
| En getters/setters      | `get valor() { return super.valor + " extra"; }` | Llamar al getter/setter del padre                                   |
| En métodos estáticos    | `static metodo() { super.metodo(); }`         | Llamar al método estático del padre                                 |

---

## ✅ ¿Se puede usar `carro.metodo()` en lugar de `super.metodo()`?

Sí. Si `Carro` hereda de `Vehiculo`, entonces los métodos de `Vehiculo` están disponibles directamente:

```ts
const carro = new Carro();
carro.mostrarMarca(); // ✅
```

`super.metodo()` solo se usa **dentro de la subclase** para referirse específicamente al método del padre.

---

## 🧬 ¿En qué se basa la herencia en JavaScript?

> JavaScript implementa herencia mediante la **cadena de prototipos**.

Cada objeto tiene un `[[Prototype]]` interno (visible como `__proto__`), que apunta a otro objeto. Al acceder a una propiedad o método, JS busca en esa cadena.

---

## 🧪 Herencia con `Object.create`

```js
const Animal = {
  tipo: "Desconocido",
  saludar() {
    console.log(`Hola, soy un ${this.tipo}`);
  }
};

const Perro = Object.create(Animal);
Perro.ladrar = () => console.log("¡Guau!");

const firulais = Object.create(Perro);
firulais.tipo = "Perro";

firulais.saludar(); // Hola, soy un Perro
firulais.ladrar();  // ¡Guau!
```

Cadena prototípica:  
`firulais → Perro → Animal → Object.prototype`

---

## 🔄 `__proto__` vs `prototype`

| Término        | ¿Qué es?                                      | ¿Dónde aparece?         | Uso principal                                       |
|----------------|------------------------------------------------|--------------------------|-----------------------------------------------------|
| `__proto__`    | Referencia al prototipo del objeto             | Cualquier objeto         | Delegación de propiedades a través del prototipo    |
| `prototype`    | Objeto prototipo que usarán instancias creadas | Solo en funciones/clases | Define el prototipo de los objetos creados con `new`|

```js
function Persona() {}
const juan = new Persona();

console.log(juan.__proto__ === Persona.prototype); // true
```

---

## ⚠️ ¿Por qué evitar usar `__proto__` directamente?

- Es una **forma obsoleta** y no estándar (aunque ahora está en el estándar por compatibilidad).
- Puede causar errores sutiles.
- Es más lento.
- Es innecesario: existen alternativas como `Object.create`, `Object.getPrototypeOf`, `Object.setPrototypeOf`.

---

## ✅ Alternativas modernas

| Acción                   | Método recomendado            |
|--------------------------|-------------------------------|
| Obtener prototipo        | `Object.getPrototypeOf(obj)`  |
| Establecer prototipo     | `Object.setPrototypeOf(obj, proto)` |
| Crear objeto con herencia| `Object.create(proto)`        |

---

## 🧠 Frase clave

> **La herencia en JavaScript es una cadena de objetos, donde cada nivel puede actuar como una instancia.**
