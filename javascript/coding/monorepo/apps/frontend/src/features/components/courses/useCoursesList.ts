import type { CourseMetadata } from '../../../types';

export interface UseCoursesListResult {
  courses: CourseMetadata[];
  loading: boolean;
  error: string | null;
}

export function useCoursesList(
  rawCourses: CourseMetadata[] | null,
  loading: boolean,
  error: string | null
): UseCoursesListResult {
  return {
    courses: rawCourses || [],
    loading,
    error,
  };
}
