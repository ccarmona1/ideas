# 2025-06-24

- INICIO refactor profesional en frontend/src/features/components/course/Course.tsx
- El componente Course.tsx supera las 400 líneas y mezcla lógica de negocio, UI y drag.
- Plan:
  - Extraer hooks personalizados: useCourseNavigation, useCourseDrag, useCourseStats.
  - Separar lógica de negocio de presentación.
  - Tipar todos los hooks y props.
  - Mantener la lógica de drag y navegación desacoplada.
  - No modificar la funcionalidad (los e2e son la fuente de la verdad).
- Próximo paso: extraer hook useCourseNavigation para manejar estados y navegación de preguntas.
- [HECHO] Se creó useCourseNavigation.ts con la lógica de navegación y estado de preguntas extraída de Course.tsx.
- [PENDIENTE] Ajustar imports relativos y tipados para evitar errores de módulo en el nuevo hook.
- [PENDIENTE] Refactorizar Course.tsx para usar el nuevo hook y limpiar el componente.
- [HECHO] Refactorizado Course.tsx para usar useCourseNavigation. Lint y build fallan por imports y variables no usadas.
- [HECHO] Limpiados imports y destructuraciones no usadas en Course.tsx y useCourseNavigation.ts. Build y e2e tests pasan OK.
- [LISTO PARA COMMIT] Siguiente: extraer lógica de drag a useCourseDrag y continuar con la separación de negocio/estilos.
- [HECHO] Lógica de drag extraída a useCourseDrag.ts y Course.tsx actualizado para usar el nuevo hook. Build y tests pendientes de correr.
