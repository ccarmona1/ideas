import type { CourseMetadata } from '../../../types';

export interface UseCoursesListResult {
  courses: CourseMetadata[];
  loading: boolean;
  error: string | null;
}

export function useCoursesList(
  rawCourses: any[] | null,
  loading: boolean,
  error: string | null
): UseCoursesListResult {
  // Aquí podrías mapear, filtrar o transformar los cursos si fuera necesario
  // Por ahora solo tipamos y devolvemos los datos
  return {
    courses: (rawCourses || []) as CourseMetadata[],
    loading,
    error,
  };
}
