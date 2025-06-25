import type { CourseMetadata } from '../../../types';
import type { CreateCourseDTO } from '../../../types/createCourseDTO';

export async function fetchCourses(apiUrl: string): Promise<CourseMetadata[]> {
  const response = await fetch(`${apiUrl}/api/course/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}

export async function createCourse(
  apiUrl: string,
  createCourseDto: CreateCourseDTO
): Promise<void> {
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
}
