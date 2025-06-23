import { useEffect } from 'react';

export const useGetQuestions = (setQuestions: Function, name: string) => {
  useEffect(() => {
    async function getQuestions() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/github/course/${name}`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      try {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const questions = await response.json();
        setQuestions(questions);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    getQuestions();
  }, [setQuestions, name]);
};
