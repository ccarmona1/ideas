# Examen de JavaScript Profundo y Mecanismos de Ejecución

Responde cada pregunta en el espacio provisto. Puedes usar texto, código o indicar verdadero/falso según corresponda. Justifica siempre tus respuestas.

---

1. Explica detalladamente cómo el motor de JavaScript transforma el código fuente en algo ejecutable. ¿Qué etapas intervienen y cómo afectan al rendimiento?

Respuesta: El motor JS consta de 3 partes (Parsing, Ignite y TurboFan). El parsing se encarga de convertir el código fuente en un código AST (una estructura de arbol, similar a un xml), de ahí lo envía al Ignite; el ignite toma el AST y lo convierte en bytecode y genera unos perfiles de rendimiento para el código; después, ignite envía estos datos a TurboFan: turboFan se encarga de tomar el bytecode y los perfiles de rendimiento para generar código de máquina eficiente. (los perfiles de rendimiento pueden incluir funciones "hot" que son funciones predecibles para turbofan)

2. ¿Qué es un Hidden Class? Da un ejemplo de cómo el uso inconsistente de propiedades puede afectar la optimización en V8.

Respuesta: Cada vez que se crea un objeto en javascript, javascript crea internamente un Hidden Class. Estas clases le permiten a TurboFan encontrar las propiedades de una Clase rápidamente usando el mecanismo inlineCaching. Sin embargo, si la hidden class cambia (porque hubo un cambio dinámico en tiempo de ejecución para la lista de propiedades de un objeto), turbofan invalidará la hidden class y le pedirá a ignite el codebyte recalculado (ahí es dónde se afectó el rendimiento)

3. Analiza el siguiente fragmento y predice el resultado. Explica el porqué:

```js
function test() {
  console.log(a);
  let a = 10;
}
test();
```

Respuesta: las variables let y const se crean en la TDZ pero no son accesibles hasta que son definidas, aquí se arrojará un ReferenceError

4. ¿En qué casos una función no será optimizada por el compilador JIT? Menciona al menos tres razones técnicas.

Respuesta (aportada por GitHub Copilot, ya que no la supe responder):

- Uso de la instrucción `try/catch/finally` dentro de la función, ya que dificulta la predicción del flujo de ejecución.
- Acceso inconsistente a las propiedades de los objetos (agregar/eliminar propiedades dinámicamente o en diferente orden).
- Uso de argumentos variables o el objeto `arguments` de forma no estándar.
- Funciones recursivas con patrones de llamada impredecibles.
- Uso de `eval` o `with` dentro de la función.

5. ¿Por qué el uso de `eval` y `with` puede ser problemático en términos de seguridad y performance? Da un caso realista.

Respuesta: el uso de eval y with es problematico porque permiten ejecutar código externo en un contexto nuevo, y esto al ser dinámico no es predecible para V8.

6. Dado el siguiente código, ¿qué imprime y por qué?

```js
const obj = {};
Object.defineProperty(obj, 'x', { value: 1, enumerable: false });
for (let key in obj) {
  console.log(key);
}
console.log(Object.keys(obj));
```

Respuesta: imprimirá un arreglo vacío, porque aunque se agregó una nueva propiedad al objeto, esta fue marcada como no enumerable y Object.keys solo pinta enumerables.

7. ¿Cómo afecta la enumerabilidad de una propiedad a la herencia y a los mixins? Da un ejemplo práctico.

Respuesta (aportada por GitHub Copilot, ya que no la supe responder):
La enumerabilidad determina si una propiedad aparece en iteraciones como `for...in` o `Object.keys`. En herencia, las propiedades no enumerables no se listan al iterar sobre el objeto hijo, aunque estén presentes en la cadena de prototipos. En mixins, si solo se copian propiedades enumerables, las no enumerables no se transfieren.

Ejemplo:

```js
const base = {};
Object.defineProperty(base, 'secreto', { value: 42, enumerable: false });
const hijo = Object.create(base);
for (let key in hijo) {
  console.log(key); // 'secreto' no aparece
}
```

En un mixin:

```js
Object.assign(objDestino, objMixin); // Solo copia propiedades enumerables
```

8. ¿Qué diferencias existen entre el scope global de un script tradicional y un módulo ES6? ¿Cómo afecta esto a la contaminación del espacio global?

Respuesta: El scope global de un script tradicional es inseguro porque expone el globalThis. Los modulos ES6 no exponen el globalThis lo que significa que cada modulo es indepediente y no hay contaminación del espacio global.

9. Explica el proceso de creación y resolución de un closure profundo. ¿Cómo puede esto causar memory leaks?

Respuesta: un closure profundo puede darse por un método recursivo que devuelve una función hija ligada directamente a una variable de la función padre (una relación fuerte), esto forzaría al GC a evitar la eliminación de esta variable (si esta variable crece en el tiempo, será un problema de memoria y rendimiento). Se podría solucionar evitando la relación con la variable externa (evitando el closure)

10. ¿Por qué `typeof null` devuelve "object"? ¿Cómo puedes detectar de forma robusta si un valor es realmente un objeto?

Respueta: fue una decisión histórica que nunca se arregló. Podríamos hacer algo como typeOf object && object !== null

11. Analiza el siguiente código y explica el resultado:

```js
let a = 0;
if (a == null) {
  console.log('A');
} else {
  console.log('B');
}
```

Respuesta (aportada por GitHub Copilot, ya que no la supe responder):
El resultado es "B". La comparación `a == null` solo es verdadera si `a` es `null` o `undefined`. Como `a` es 0, la condición es falsa y se imprime "B".

12. ¿Qué diferencias hay entre `Object.create()` y el operador `new`? Da un ejemplo donde la diferencia sea relevante.

Respuesta (aportada por GitHub Copilot, ya que no la supe responder):
`Object.create(proto)` crea un objeto con el prototipo especificado, sin ejecutar ningún constructor. El operador `new` crea un objeto y ejecuta la función constructora, permitiendo inicialización.

Ejemplo:

```js
function Persona(nombre) {
  this.nombre = nombre;
}
const a = new Persona('Ana'); // a.nombre === 'Ana'
const b = Object.create(Persona.prototype); // b.nombre === undefined
```

Aquí, `b` no tiene la propiedad `nombre` porque el constructor no se ejecutó.

13. ¿Cómo puedes simular una clase abstracta en JavaScript? ¿Qué limitaciones tiene esta simulación?

Respuesta: JS no soporta clases abstractas nativamente, pero se podrían simular. Se podría crear una clase "base" con métodos en común y un constructor con una condición de que no permita crear instancias si el tipo es ella misma. Y los métodos abstractos tendría un new Error para evitar el uso de los método definidos e implemetados en la base, forzando a que se ejecuten los que fueron "sobre escritos". Esto solo se puede validar en tiempo de ejecución

14. Explica cómo funcionan los microtasks y macrotasks en el event loop. Da un ejemplo donde el orden de ejecución no sea obvio.

Respuesta: las microtasks son tareas con alta prioridad, ejemplo promise.then() y las macrotasks son resultados de WebApis (por ejemplo setTimeout) que se resulven una a una solo después de que todas las microtasks actuales se hayan resuelto.

15. ¿Qué problemas puede causar el uso incorrecto de `this` en métodos estáticos y de instancia? Da un ejemplo y solución.

Respuesta: Creo que el this en el método estático hace referencia a la clase en sí, y el this bajo la instancia hace referencia al a instancia creada de esa clase. Si se confunden los dos, se podría estar modificando la clase original en lugar de la instancia y viceversa.

16. ¿Cómo puedes evitar fugas de información usando símbolos y campos privados? Da un ejemplo de código.

Respuesta: los símbolos no garantizan privacidad al 100%, pero solo quién tenga el símbolo podría acceder a la propiedad. Los campos privados con # son más seguros porque el motor V8 ya es capaz de identificarlos como tal.

17. ¿Por qué la coerción de tipos puede ser peligrosa en comparaciones?

Respuesta: == hace converciones de tipo, lo que puede ser inseguro.

18. ¿Cómo puedes detectar si un objeto proviene de otro realm (por ejemplo, de un iframe)? ¿Por qué esto puede ser problemático?

Respuesta: Podría dectectar si viene de otro real al comparar sus prototypes para el mismo objecto por ejemplo Array. Si son diferentes, vienen de contextos diferentes. Esto podría ser problemático porque un desarrollador, sin ese contexto, puede esperar que sean iguales.

19. Implementa un patrón de diseño (a tu elección) en JavaScript y explica por qué lo elegiste para ese caso.

Respuesta (aportada por GitHub Copilot, ya que no la supe responder):

```js
// Ejemplo de patrón Builder
class PizzaBuilder {
  constructor() {
    this.toppings = [];
  }
  addCheese() {
    this.toppings.push('cheese');
    return this;
  }
  addPepperoni() {
    this.toppings.push('pepperoni');
    return this;
  }
  build() {
    return { pizza: true, toppings: this.toppings };
  }
}
const pizza = new PizzaBuilder().addCheese().addPepperoni().build();
```

Elegí el patrón Builder porque permite construir objetos complejos paso a paso, facilitando la legibilidad y la personalización.

20. ¿Qué ventajas y desventajas tiene la composición sobre la herencia en JavaScript? Da un ejemplo donde la composición sea claramente superior.

Respuesta: el problema de la herencia es que es algo rígido y cuando hay una cadena muy larga de herencia, es difícil de mantener. La composición permite tener multiples comportamientos aislados y fáciles de testear y mantener.

---

> Escribe tus respuestas debajo de cada pregunta. Cuando termines, indícalo para que pueda revisarlas y darte retroalimentación y calificación.
