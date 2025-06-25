import { useState, useEffect } from 'react';
import type { CourseMetadata } from '../../../types';
import { fetchCourses } from '../../services/courses/courseService';

export function useCourses(apiUrl: string) {
  const [courses, setCourses] = useState<CourseMetadata[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchCourses(apiUrl)
      .then((data) => {
        if (isMounted) {
          setCourses(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setCourses(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return { courses, loading, error };
}
