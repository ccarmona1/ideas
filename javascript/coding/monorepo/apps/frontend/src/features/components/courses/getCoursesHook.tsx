import { useEffect } from 'react';

export const useGetCourses = (setCourses: Function) => {
  useEffect(() => {
    async function getCourses() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/github/courses`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      try {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const finalCourses = await response.json();
        setCourses(finalCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    getCourses();
  }, [setCourses]);
};
