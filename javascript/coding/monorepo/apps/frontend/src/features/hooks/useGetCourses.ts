import type { CourseDTO } from '@tester/types';
import { useApiResource } from '../../hooks/useApiResource';
import { backendService } from '../../services/backend';

export function useGetCourses() {
  return useApiResource<CourseDTO[]>(() => backendService.getCourses(), []);
}
