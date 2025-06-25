import { useEffect, useState } from 'react';
import { fetchCourseQuestions } from '../services/backend';
import type { QuestionMetadata } from '../types';

interface UseGetQuestionsResult {
  data: QuestionMetadata[] | null;
  loading: boolean;
  error: string | null;
}

export function useGetQuestions(courseName: string): UseGetQuestionsResult {
  const [data, setData] = useState<QuestionMetadata[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseName) return;
    setLoading(true);
    setError(null);
    fetchCourseQuestions(courseName)
      .then((questions) => setData(questions))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseName]);

  return { data, loading, error };
}
