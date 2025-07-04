# Repaso Rápido: TypeScript para Aplicaciones Robustas y Escalables (Módulo 2)

## Palabras Clave y Descripciones

- **TypeScript:** Superset de JavaScript que añade tipado estático y herramientas de desarrollo robustas.
- **tsconfig.json:** Archivo de configuración central para el compilador TypeScript.
- **Tipos Primitivos y Avanzados:** Incluye tipos básicos, literales, unión, intersección, condicionales, mapeados y utilidades.
- **Type Aliases, Interfaces, Enums:** Herramientas para modelar estructuras de datos y contratos de código.
- **Type Guards:** Técnicas para refinar tipos en tiempo de ejecución (typeof, instanceof, predicados).
- **unknown vs any:** unknown es seguro y requiere refinamiento; any desactiva el chequeo de tipos.
- **Clases y POO:** Soporte completo para clases, herencia, interfaces, clases abstractas, mixins y modificadores de acceso.
- **Decoradores:** Funciones para metaprogramación sobre clases, métodos y propiedades.
- **Módulos y Namespaces:** Organización de código y control de ámbito, junto con declaraciones globales y augmentations.
- **Validación de Tipos:** Diferencia entre validación en tiempo de compilación (TypeScript) y en tiempo de ejecución (librerías externas).
- **Inferencia y Strictness:** TypeScript infiere tipos, pero se recomienda activar strict mode para máxima seguridad.
- **Testing de Tipos:** Pruebas de tipos y de código con herramientas como Jest o Vitest.
- **Performance del Compilador:** Tipos complejos pueden afectar el rendimiento; optimiza usando utilidades y simplificando tipos.
- **Patrones de Diseño:** TypeScript permite implementar patrones clásicos y funcionales, reforzando contratos con tipos.
- **Integración y Ecosistema:** Compatible con herramientas modernas, CI/CD, monorepos y generación automática de documentación.

---

## Tips, Tricks y Trucos para Aprender Mejor

- **Activa strict mode:** Maximiza la seguridad y la ayuda del compilador.
- **Prefiere tipos explícitos en APIs públicas:** Facilita el mantenimiento y la colaboración.
- **Usa type guards personalizados:** Mejora la seguridad y legibilidad del código.
- **Aprovecha utility types:** Partial, Pick, Omit, Record, etc., para manipular tipos de forma avanzada.
- **Valida en tiempo de ejecución:** Usa librerías como zod o io-ts para validar datos externos.
- **Refactoriza usando interfaces y tipos:** Facilita la migración progresiva de JS a TS.
- **Documenta con JSDoc y comentarios de tipos:** Mejora la experiencia en editores y la autocompletación.
- **Evita el abuso de any:** Solo úsalo como último recurso y documenta su uso.
- **Experimenta en playgrounds:** Usa el TS Playground para probar tipos complejos y edge cases.
- **Revisa los logs del compilador:** Los errores y advertencias suelen ser muy descriptivos.

---

## Resumen de Buenas Prácticas

- Usa interfaces para contratos públicos y types para composición avanzada.
- Prefiere readonly y const para datos inmutables.
- Separa tipos de valores en imports/exports.
- Usa assertion functions y exhaustividad en type guards.
- Mantén el tsconfig.json limpio y documentado.
- Integra linters y formateadores compatibles con TypeScript.
- Automatiza pruebas de tipos y de código.
- Mantente actualizado con las nuevas versiones y propuestas de TypeScript.

---

¡Repasa estos conceptos y experimenta con ejemplos prácticos para consolidar tu dominio avanzado de TypeScript!
