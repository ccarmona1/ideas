# Repaso Rápido: JavaScript Profundo y Mecanismos de Ejecución (Módulo 1)

## Palabras Clave y Descripciones

- **V8, SpiderMonkey, JavaScriptCore:** Motores JavaScript, cada uno con optimizaciones y arquitecturas distintas.
- **AST (Abstract Syntax Tree):** Representación estructurada del código fuente.
- **Ignition/TurboFan:** Intérprete y compilador optimizador de V8.
- **JIT Compilation:** Compilación Just-In-Time para mejorar el rendimiento.
- **Garbage Collection:** Recolección de basura automática (Mark-Sweep, Mark-Compact, Generational GC).
- **Hidden Classes/Inline Caching:** Optimizaciones internas para acceso rápido a propiedades.
- **Snapshot Serialization:** Serialización del estado inicial para arranque rápido.
- **Prototipos:** Sistema de herencia basado en objetos y cadenas de prototipos.
- **Clases ES6+:** Azúcar sintáctico sobre prototipos, con herencia y métodos estáticos.
- **Mixins/Composición:** Compartir funcionalidad sin herencia directa.
- **Encapsulamiento:** Uso de símbolos, campos privados y proxies para proteger datos.
- **Event Loop:** Ciclo que gestiona la ejecución de tareas, microtasks y macrotasks.
- **Web APIs:** Funcionalidades del navegador accesibles desde JS (timers, DOM, etc.).
- **TDZ (Temporal Dead Zone):** Zona donde las variables let/const existen pero no están inicializadas.
- **Closures:** Funciones que recuerdan el contexto donde fueron creadas.
- **Scope Chain:** Cadena de entornos léxicos para resolución de variables.
- **Duck Typing:** Validar la forma de un objeto en tiempo de ejecución.
- **Polimorfismo:** Capacidad de objetos de responder a la misma interfaz de diferentes formas.
- **Decoradores:** Funciones que modifican clases o métodos (propuesta avanzada).
- **DOM (Document Object Model):** Representación en árbol de la estructura HTML.
- **DocumentFragment:** Contenedor ligero para inserciones eficientes en el DOM.
- **Event Delegation:** Manejar eventos de muchos elementos desde un ancestro común.
- **Reflow/Repaint:** Procesos de recalculación y repintado del layout en el navegador.
- **typeof, instanceof, Array.isArray, Object.prototype.toString:** Herramientas para detección de tipos.
- **Realms/iframes:** Contextos globales aislados con sus propios prototipos.
- **Coerción de Tipos:** Conversión automática o explícita entre tipos de datos.

---

## Tips, Tricks y Trucos para Aprender Mejor

- **Visualiza el flujo:** Usa diagramas para entender el event loop, el scope chain y la cadena de prototipos.
- **Experimenta en consola:** Prueba cada concepto en la DevTools del navegador o Node.js.
- **Cuidado con typeof y instanceof:** No siempre son fiables para arrays, null o objetos de otros realms. Prefiere `Array.isArray` y `Object.prototype.toString`.
- **Agrupa cambios al DOM:** Usa `DocumentFragment` para evitar múltiples reflows/repaints.
- **Prefiere === sobre ==:** Evita bugs por coerción implícita de tipos.
- **Elimina listeners:** Siempre elimina listeners de eventos que ya no uses para evitar fugas de memoria.
- **Aprovecha las herramientas modernas:** Usa DevTools, AST Explorer y linters para analizar y depurar tu código.
- **Refactoriza a clases ES6+:** Moderniza código antiguo para aprovechar herencia, métodos estáticos y encapsulamiento.
- **No temas a los closures:** Son clave para entender el alcance y la memoria en JS.
- **Lee el estándar:** Consulta la documentación oficial de ECMAScript y MDN para detalles y edge cases.

---

## Resumen de Buenas Prácticas

- Usa `let` y `const` en vez de `var`.
- Prefiere composición sobre herencia cuando sea posible.
- Usa proxies y símbolos para encapsular y proteger datos.
- Minimiza manipulaciones directas al DOM y agrupa cambios.
- Usa promesas y async/await para asincronía moderna.
- Valida tipos de forma robusta, especialmente en librerías y APIs públicas.
- Considera el impacto de los realms y contextos globales en aplicaciones complejas.

---

¡Repasa estos conceptos y experimenta con ejemplos prácticos para consolidar tu dominio avanzado de JavaScript!
