# Repaso: JavaScript Profundo y Mecanismos de Ejecución (Módulo 1)

Este documento resume los conceptos clave y subtemas del Módulo 1, con una breve descripción de cada uno para facilitar el repaso y recordar palabras clave.

---

## 1. Motor JavaScript (V8)

- **Parsing y Abstract Syntax Tree (AST)**
  - Proceso de análisis del código fuente y generación de un árbol sintáctico. Palabras clave: parsing, AST, análisis sintáctico.
- **Ignition (Interpreter) y TurboFan (Optimizing Compiler)**
  - Fases de ejecución: interpretación y compilación optimizada en V8. Palabras clave: intérprete, compilador, optimización.
- **JIT Compilation**
  - Compilación Just-In-Time para mejorar el rendimiento en tiempo de ejecución. Palabras clave: JIT, rendimiento, optimización dinámica.
- **Garbage Collection (Generational GC, Mark-Sweep, Mark-Compact)**
  - Técnicas de gestión automática de memoria en V8. Palabras clave: GC, memoria, mark-sweep, generational.
- **Hidden Classes y Inline Caching**
  - Estrategias de optimización de objetos y acceso rápido a propiedades. Palabras clave: hidden classes, inline cache, optimización.
- **Snapshot Serialization y Deserialización**
  - Serialización del estado inicial del motor para acelerar el arranque. Palabras clave: snapshot, serialización, arranque rápido.
- **Optimización de Arrays**
  - Diferencias de rendimiento entre arrays homogéneos y heterogéneos. Palabras clave: arrays, optimización, tipos homogéneos.
- **Deopt Reasons y Pipeline de Optimización/Desoptimización**
  - Motivos y proceso de desoptimización de código en V8. Palabras clave: deopt, pipeline, rendimiento.
- **Comparación de Motores JavaScript (V8, SpiderMonkey, JavaScriptCore)**
  - Diferencias de diseño y optimización entre motores populares. Palabras clave: V8, SpiderMonkey, JavaScriptCore.
- **Impacto de Nuevas Propuestas ECMAScript en V8**
  - Cómo afectan las nuevas características del lenguaje a la arquitectura del motor. Palabras clave: ECMAScript, propuestas, compatibilidad.

---

## 2. Contextos de Ejecución y Scopes Avanzados

- **Execution Context Stack (Global, Function, Eval)**
  - Pila de contextos de ejecución y su gestión en JavaScript. Palabras clave: execution context, stack, global, function, eval.
- **Lexical Environment y Variable Environment**
  - Estructuras internas para el manejo de variables y alcance léxico. Palabras clave: lexical environment, variable environment, scope.
- **'this' Binding en Profundidad**
  - Reglas de enlace de this en distintos contextos. Palabras clave: this, binding, contexto.
- **Closures y su relación con This**
  - Funciones que recuerdan su entorno léxico y su interacción con this. Palabras clave: closure, entorno léxico, this.
- **Temporal Dead Zone (TDZ) y Hoisting avanzado**
  - Comportamiento de variables let/const antes de su declaración y el hoisting. Palabras clave: TDZ, hoisting, let, const.
- **Strict Mode: diferencias y advertencias**
  - Cambios en el comportamiento del lenguaje bajo modo estricto. Palabras clave: strict mode, errores, restricciones.
- **Visualización Avanzada de Scope Chain**
  - Cadena de scopes y resolución de variables en tiempo de ejecución. Palabras clave: scope chain, resolución, debugging.
- **Edge Cases con eval y with**
  - Riesgos y particularidades de usar eval y with. Palabras clave: eval, with, seguridad, performance.
- **Impacto de Módulos ES6 en el Scope Global**
  - Cómo los módulos afectan el alcance global y el aislamiento. Palabras clave: módulos ES6, scope global, aislamiento.
- **Debugging de Scopes y Contextos**
  - Herramientas modernas para inspeccionar scopes y contextos. Palabras clave: debugging, DevTools, VSCode.

---

## 3. Prototipos, Clases y Encapsulamiento en JavaScript

- **Herencia Prototípica y Cadena de Prototipos**
  - Modelo de herencia basado en prototipos y resolución de propiedades. Palabras clave: prototipo, herencia, cadena.
- **Funciones Constructoras, 'new' y Object.create()**
  - Creación de objetos y manipulación de prototipos. Palabras clave: constructor, new, Object.create.
- **Clases ES6+: Azúcar Sintáctico, Herencia y Representación Interna**
  - Sintaxis moderna para clases y herencia. Palabras clave: clases ES6, herencia, sintaxis.
- **Mixins, Composición y Encapsulamiento**
  - Reutilización de código y encapsulamiento con símbolos/campos privados. Palabras clave: mixin, composición, encapsulamiento.
- **Características Estáticas de las Clases**
  - Métodos y propiedades estáticas, diferencias con miembros de instancia. Palabras clave: static, clase, instancia.
- **Clases Abstractas: Simulación y Limitaciones**
  - Simulación de abstracción y limitaciones en JavaScript. Palabras clave: abstract, simulación, limitaciones.
- **Interfaces y Duck Typing**
  - Validación de forma de objetos y comparación con interfaces de TypeScript. Palabras clave: duck typing, interfaces, validación.
- **Polimorfismo: Clásico y por Composición**
  - Diferentes formas de polimorfismo en JavaScript. Palabras clave: polimorfismo, herencia, composición.
- **Decoradores de Clase: Estado Actual y Polyfills**
  - Decoradores como funciones de orden superior y su estado en ECMAScript. Palabras clave: decorador, polyfill, propuesta.
- **Comparación de Clases y Objetos con Otros Lenguajes**
  - Diferencias clave con Java, C#, Python. Palabras clave: comparación, OO, lenguajes.
- **Limitaciones y Advertencias de las Clases ES6+**
  - Comportamientos inesperados y advertencias de rendimiento. Palabras clave: limitaciones, advertencias, clases.
- **Debugging Avanzado de la Cadena de Prototipos**
  - Técnicas para depurar la cadena de prototipos. Palabras clave: debugging, prototipos.
- **Performance de Herencia y Composición en V8**
  - Impacto de patrones de herencia y composición en el rendimiento. Palabras clave: performance, herencia, composición.
- **Proxies y Metaprogramación Avanzada**
  - Uso de proxies para controlar el acceso y comportamiento de objetos. Palabras clave: proxy, metaprogramación.
- **Interoperabilidad ES5/ES6+ y Migración de Sistemas Legacy**
  - Compatibilidad y migración entre versiones de JavaScript. Palabras clave: interoperabilidad, legacy, migración.
- **Análisis de Seguridad: Encapsulamiento con Símbolos y Campos Privados**
  - Técnicas para proteger información interna de los objetos. Palabras clave: seguridad, símbolos, privados.
- **Integración de Patrones de Diseño Clásicos con Clases Modernas**
  - Aplicación de patrones clásicos con clases ES6+. Palabras clave: patrones de diseño, integración, clases.

---

## 4. Novedades y Mejoras en ES6+ (ECMAScript 2015+)

- **Declaración de Variables: var, let, const, TDZ y Block Scope**
  - Nuevas formas de declarar variables y su alcance. Palabras clave: var, let, const, TDZ, block scope.
- **Arrow Functions, Closures y Lexical Environment**
  - Sintaxis de funciones flecha y su entorno léxico. Palabras clave: arrow function, closure, lexical.
- **Destructuración y Parámetros por Defecto**
  - Asignación de variables a partir de objetos/arrays y valores por defecto. Palabras clave: destructuración, parámetros por defecto.
- **Promesas, async/await y Combinadores de Promesas**
  - Manejo moderno de asincronía y combinadores de promesas. Palabras clave: promesas, async, await, combinadores.
- **Iteradores, Generadores y for-of**
  - Iteración personalizada y generación de secuencias. Palabras clave: iterador, generador, for-of.
- **Otras Mejoras: template literals, Map/Set, rest/spread**
  - Nuevas estructuras y sintaxis para manipulación de datos. Palabras clave: template literals, Map, Set, rest, spread.
- **Optional Chaining (?.) y Nullish Coalescing (??)**
  - Operadores para acceso seguro y valores por defecto. Palabras clave: optional chaining, nullish coalescing.

---

## 5. Manejo de la Asincronía en JavaScript (Event Loop - Navegador)

- **Call Stack y Web APIs**
  - Flujo de ejecución y APIs externas en el navegador. Palabras clave: call stack, Web APIs.
- **Callback Queue (Task Queue) y Microtask Queue**
  - Colas de tareas y microtareas en el event loop. Palabras clave: callback queue, microtask queue.
- **Macrotasks vs. Microtasks**
  - Diferencias y orden de ejecución de tareas. Palabras clave: macrotask, microtask, event loop.
- **El 'Tick' del Event Loop**
  - Ciclo de ejecución del event loop. Palabras clave: tick, event loop.
- **Timers Internals**
  - Funcionamiento interno de los temporizadores. Palabras clave: timers, setTimeout, setInterval.
- **Web Workers y Service Workers**
  - Ejecución en hilos separados y servicios en segundo plano. Palabras clave: web worker, service worker, concurrencia.

---

## 6. Patrones Avanzados de Asincronía con ES6+

- **Promesas (Promise combinators: allSettled, any)**
  - Nuevos combinadores para manejo de múltiples promesas. Palabras clave: allSettled, any, promesas.
- **async/await avanzado**
  - Manejo de flujos asíncronos complejos con sintaxis moderna. Palabras clave: async, await, asincronía.
- **Generadores y yield**
  - Generación de secuencias y control de flujo asíncrono. Palabras clave: generador, yield.
- **Stream API (Fetch, Node.js Streams, Backpressure)**
  - Procesamiento de datos en flujo y control de presión. Palabras clave: stream, backpressure, fetch.
- **Cancelable Promises y AbortController**
  - Cancelación de operaciones asíncronas. Palabras clave: cancelable, AbortController.
- **Async Iterators y for-await-of**
  - Iteración sobre datos asíncronos. Palabras clave: async iterator, for-await-of.

---

## 7. Diseño de Patrones en JavaScript con ES6+

- **Patrones Creacionales (Singleton, Factory)**
  - Creación controlada de instancias y objetos. Palabras clave: singleton, factory, creación.
- **Patrones Estructurales (Adapter, Decorator, Proxy)**
  - Modificación y adaptación de interfaces y comportamientos. Palabras clave: adapter, decorator, proxy.
- **Patrones de Comportamiento (Observer, Strategy, Command)**
  - Organización de la comunicación y lógica entre objetos. Palabras clave: observer, strategy, command.
- **Patrones Avanzados (Module, Revealing Module, IIFE)**
  - Encapsulamiento y organización de código. Palabras clave: módulo, IIFE, encapsulamiento.
- **Comparación y Elección de Patrones de Diseño**
  - Ventajas y desventajas de cada patrón según el contexto. Palabras clave: comparación, elección, patrones.

---

## 8. Entendimiento y Manipulación del DOM

- **¿Qué es el DOM? Estructura y Árbol de Nodos**
  - Representación estructurada de documentos HTML/XML. Palabras clave: DOM, árbol, nodos.
- **Selección y Búsqueda de Elementos**
  - Métodos para acceder a elementos del DOM. Palabras clave: getElementById, querySelector.
- **Manipulación de Elementos: Propiedades y Atributos**
  - Lectura y modificación de contenido y atributos. Palabras clave: innerHTML, atributos, propiedades.
- **Creación, Inserción y Eliminación de Nodos**
  - Operaciones dinámicas sobre el árbol DOM. Palabras clave: createElement, appendChild, remove.
- **Eventos y Delegación de Eventos**
  - Manejo de eventos y técnicas de delegación. Palabras clave: addEventListener, delegación.
- **Buenas Prácticas y Performance en Manipulación del DOM**
  - Optimización y recomendaciones para manipular el DOM eficientemente. Palabras clave: performance, reflow, repaint.

---

> Usa este documento como guía rápida para repasar los conceptos y palabras clave del Módulo 1. Profundiza en los temas que consideres más relevantes para tu aprendizaje o repaso.
