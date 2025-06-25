import { useState, useEffect } from 'react';
import { backendService } from '../../services/backend';
import type { CourseMetadata } from '../../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useGetCourses = () => {
  const [state, setState] = useState<UseApiState<CourseMetadata[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchCourses = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const courses = await backendService.getCourses({
          signal: controller.signal,
        });
        setState({
          data: courses,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error ? error.message : 'Failed to fetch courses',
        });
      }
    };
    fetchCourses();
    return () => {
      controller.abort();
    };
  }, []);

  return state;
};
