import type { CreateCourseDTO } from '@tester/types';

export const createCourse = async (createCourseDto: CreateCourseDTO) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}/api/course/create`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createCourseDto),
  });
  if (!response.ok) {
    throw new Error('Failed to create course');
  }
};
