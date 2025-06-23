import { useEffect } from 'react';

export const useCreateCourse = () => {
  useEffect(() => {
    async function createCourse() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/questions/generate`;
      console.log(url);
    }
    createCourse();
  }, []);
};
