export interface CreateCourseDTO {
  courseName: string;
  courseKeywords: string;
  courseDifficulty: string;
  courseNumOfQuestions: number;
  description?: string;
  content?: string;
}
