import { useApiResource } from '../../hooks/useApiResource';
import { backendService } from '../../services/backend';
import type { CourseMetadata } from '../../types';

export function useGetCourses() {
  return useApiResource<CourseMetadata[]>(
    () => backendService.getCourses(),
    []
  );
}
