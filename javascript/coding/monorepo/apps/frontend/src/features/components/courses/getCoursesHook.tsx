import { useEffect } from 'react';

export const useGetCourses = (setCourses: Function) => {
  useEffect(() => {
    async function getCourses() {
      const apiUrl = `${window.location.protocol}//${window.location.hostname}:3001/api/github/courses`;
      const response = await fetch(apiUrl, {
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
