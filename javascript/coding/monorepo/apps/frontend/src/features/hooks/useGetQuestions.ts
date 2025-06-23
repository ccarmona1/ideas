import { useState, useEffect } from 'react';
import { backendService } from '../../services/backend';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching questions for a specific course with loading state
 */
export const useGetQuestions = (courseName: string) => {
  const [state, setState] = useState<UseApiState<any[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!courseName) {
      setState({
        data: null,
        loading: false,
        error: 'Course name is required',
      });
      return;
    }

    const fetchQuestions = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const questions = await backendService.getQuestions(courseName);
        setState({
          data: questions,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching questions:', error);
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to fetch questions',
        });
      }
    };

    fetchQuestions();
  }, [courseName]);

  return state;
};
