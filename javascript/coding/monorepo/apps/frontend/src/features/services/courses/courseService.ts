import type { CourseMetadata } from '../../../types';

export async function fetchCourses(apiUrl: string): Promise<CourseMetadata[]> {
  const response = await fetch(`${apiUrl}/api/course/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}
