# Examen Módulos 1 y 2: JavaScript Profundo y TypeScript

**Instrucciones:**  
Responde cada pregunta en el espacio indicado. Puedes escribir tu respuesta directamente debajo de cada pregunta.

---

### 1. ¿Cuál es la diferencia fundamental entre el motor V8 y SpiderMonkey?

Respuesta: V8 es de Google es el más usado actualmente, se encuentra en Chrome, Electron y NodeJS.  
Respuesta generada por IA: V8 (Google) y SpiderMonkey (Mozilla) son motores JavaScript; V8 destaca por su rendimiento y uso en Chrome/Node.js, mientras que SpiderMonkey es el motor de Firefox y pionero en muchas características del lenguaje.

---

### 2. Explica el propósito del Abstract Syntax Tree (AST) en el proceso de ejecución de JavaScript.

Respuesta: Permite generar una estructura de datos entedible para el proceso de Parsing en V8.  
Respuesta generada por IA: El AST representa la estructura sintáctica del código fuente, permitiendo al motor analizar, optimizar y ejecutar el código JavaScript.

---

### 3. ¿Qué es el "Temporal Dead Zone" (TDZ) y cómo afecta la declaración de variables?

Respuesta: Es la zona donde se definen los const y let, si se intenta acceder a una variable que no esté presente en esta zona, se arrojará un error.  
Respuesta generada por IA: La TDZ es el periodo entre la declaración y la inicialización de variables let/const, donde acceder a ellas causa un error de referencia.

---

### 4. Verdadero/Falso: El modo estricto ("strict mode") en JavaScript permite el uso de variables no declaradas.

Respuesta: No, el modo estricto es un modo seguro para evitar este tipo de problemas.

---

### 5. ¿Cómo funciona la herencia prototípica en JavaScript? Da un ejemplo de código.

Respuesta: JS "permite" la herencia a partir de la creación de cadenas de prototipos, así un Objeto puede tener un prototypo donde su prototipo es otro, y así sucesivamente.  
Respuesta generada por IA:

```js
function Animal() {}
Animal.prototype.hablar = function () {
  console.log('Hola');
};
const perro = new Animal();
perro.hablar();
```

---

### 6. ¿Qué diferencias existen entre "let", "const" y "var" en cuanto a scope y hoisting?

Respuesta: let y const son variables con scope de bloque, hay una especie de hoisting a la TDZ, pero no se inicializan en undefined; var es más
para variables globales y no se recomienda su uso, tiene hoisting (se mueve su definición hacia arriba y se inicializan como undefined)

---

### 7. ¿Qué es un "closure" y cómo puede afectar el uso de la variable "this"?

Respuesta: Un closure ocurre cuando una función padre devuelve una función hija que está fuertemente relacionada con alguna variable de la función padre. Se podría usar el this para evitar closures innecesarios.  
Respuesta generada por IA: Un closure es una función que recuerda el entorno en el que fue creada. El uso de this dentro de closures puede ser problemático porque this depende del contexto de ejecución, no del contexto léxico.

---

### 8. ¿Para qué sirve el operador "instanceof" y cuáles son sus limitaciones?

Respuesta: Nos permite saber cuál es el tipo de la instancia actual. Sus limitaciones radican en que solo sirve para instancias.  
Respuesta generada por IA: instanceof verifica si un objeto pertenece a la cadena de prototipos de un constructor. Limita su uso a objetos creados con funciones constructoras y puede fallar con objetos de diferentes contextos (iframes).

---

### 9. ¿Qué es el Event Loop y cómo se relaciona con las Web APIs en el navegador?

Respuesta: El event loop es el proceso que permite la ejecución de código asíncrono, por ejemplo, las wep apis (timeouts)

---

### 10. Explica la diferencia entre microtasks y macrotasks en el contexto del Event Loop.

Respuesta: Las microtasks son siempre de alta prioridad, normalmente son el .then de las promises. Las macrotasks son el callback del resultado de las webApis

---

### 11. ¿Qué es un "decorador" en TypeScript y para qué se utiliza?

Respuesta: Un decorador es un mecanismo de extensión de comportamiento para métodos, de interceptor de clases o de modificar de metadatos de propiedades o parámetros.

---

### 12. ¿Cuál es la diferencia entre "interface" y "type alias" en TypeScript?

Respuesta: La interfaz es contrato de la forma que tendrá un objeto. El type es una conveción para definir el comportamiento de un objeto o variable. La interfaz no puede ser primitivos, mientras que el tipo sí. Además el tipo permite operaciones de conjuntos, como unión e intersección para varios tipos.

---

### 13. ¿Qué ventajas aporta el uso de "unknown" sobre "any" en TypeScript?

Respuesta: unknonw es más seguro porque obliga a la verificación del tipo en el paso posterior

---

### 14. ¿Cómo se implementa un type guard personalizado en TypeScript? Da un ejemplo.

Respuesta: Podríamos hacer un typeGuard para un number, sería algo como (pseudocode)

const isNumber(myNumber: any): myNumber is number => {
return typeOf myNumber === "number"
}

esto le permitirá saber a TS si la variable myNumber es un número o no  
Respuesta generada por IA:

```ts
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
```

---

### 15. ¿Qué es el archivo tsconfig.json y qué rol cumple en un proyecto TypeScript?

Respuesta: Define el comportamiento que tendrá el transpilador. Permite definir las tecnologías que se usarán para generar el código JS.

---

### 16. ¿Qué significa que TypeScript es un superset de JavaScript?

Respuesta: Significa que TypeScript provee características superiores que normalmente no están disponibles en javascript.

---

### 17. ¿Cómo se realiza la migración progresiva de un proyecto JavaScript a TypeScript?

Respuesta: Podría empezarse lentamente con la verificación de tipos sencillos en funciones sencillas, después se podrían ir migrando los objetos puros a interfaces typescript e ir corrigiendo los contratos de objetos.

---

### 18. ¿Qué es un "namespace" en TypeScript y cuándo es recomendable su uso?

Respuesta: Los namespaces ya no son recomendables, permitían el uso de global compartido entre varios modulos.

---

### 19. ¿Cuál es la diferencia entre clases abstractas e interfaces en TypeScript?

Respuesta: Las clases abstractas son clases que no pueden ser instanciadas y deben de ser heredadas con "extends". Pueden tener implementaciones que serán compartidas con las clases que extiendan de ella y tendrá métodos abstractos que deben de ser implementados por las clases hijas. Las interfaces simplemente son contratos de comportamiento que pueden ser implementados por clases, una clase puede implementar multiples interfaces.

---

### 20. ¿Qué es un "utility type" en TypeScript? Menciona dos ejemplos y su utilidad.

Respuesta: Los utility type son tipos genéricos que permiten la modificación de tipos existentes. Por ejemplo Required<MiTipo>, hará que todos sus atributos serían obligatorios, mientras que Partial<MiTipo> hará que todos sus atributos sean parciales.

---
