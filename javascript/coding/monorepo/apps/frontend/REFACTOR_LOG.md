# REFACTOR LOG

- Eliminados archivos vacíos y duplicados: getCourseHook.tsx, getCoursesHook.tsx. Toda la lógica de hooks de cursos está centralizada en src/features/hooks/useGetCourses.ts.
- Primer mapeo de estructura y dependencias realizado. Próximos pasos: limpieza de hooks, separación de lógica de negocio y estilos, y propuesta de estructura escalable.
- Marcado useCoursesList.ts como innecesario, toda la lógica de obtención de cursos está centralizada en src/features/hooks/useGetCourses.ts. Siguiente paso: eliminarlo y actualizar imports si es necesario.
- Eliminado useCoursesList.ts y useCourses.ts (duplicados). Todos los hooks de cursos deben estar en src/features/hooks/useGetCourses.ts. Actualizados imports en componentes afectados.
- Siguiente iteración: separar lógica de negocio y estilos, asegurar single responsibility, y profesionalizar ubicación de hooks.
