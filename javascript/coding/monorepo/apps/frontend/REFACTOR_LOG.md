# REFACTOR LOG

- Eliminados archivos vacíos y duplicados: getCourseHook.tsx, getCoursesHook.tsx. Toda la lógica de hooks de cursos está centralizada en src/features/hooks/useGetCourses.ts.
- Primer mapeo de estructura y dependencias realizado. Próximos pasos: limpieza de hooks, separación de lógica de negocio y estilos, y propuesta de estructura escalable.
- Marcado useCoursesList.ts como innecesario, toda la lógica de obtención de cursos está centralizada en src/features/hooks/useGetCourses.ts. Siguiente paso: eliminarlo y actualizar imports si es necesario.
- Eliminado useCoursesList.ts y useCourses.ts (duplicados). Todos los hooks de cursos deben estar en src/features/hooks/useGetCourses.ts. Actualizados imports en componentes afectados.
- Siguiente iteración: separación estricta de lógica de negocio y estilos, asegurar single responsibility, y profesionalizar estructura de carpetas para escalabilidad. useCoursesList.ts eliminado definitivamente.
- Migrados componentes comunes (BlockingSpinner, SimpleDragHint, DragHint.css) a src/components/common/. Eliminada la carpeta antigua. Estructura lista para escalar y mantener.
- Actualizados todos los imports de BlockingSpinner y SimpleDragHint a la nueva ubicación centralizada. Build debe pasar correctamente.
- Refactor profesional en useGetCourses: manejo seguro de ciclo de vida con isMounted, tipado estricto, sin comentarios, lógica centralizada y lista para escalar.
- Refactor en Course.tsx: extracción de estados (not found, loading, empty) a CourseState.tsx, limpieza de imports y simplificación del renderizado condicional. Componente más mantenible y escalable.
