import { useState, useEffect } from 'react';
import { backendService } from '../../services/backend';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching courses with loading state
 */
export const useGetCourses = () => {
  const [state, setState] = useState<UseApiState<any[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const courses = await backendService.getCourses();
        setState({
          data: courses,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error ? error.message : 'Failed to fetch courses',
        });
      }
    };

    fetchCourses();
  }, []);

  return state;
};
