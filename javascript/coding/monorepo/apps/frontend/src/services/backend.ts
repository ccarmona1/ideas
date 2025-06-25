import type { CourseDTO, CreateCourseDTO, QuestionDTO } from '@tester/types';

const API_URL = import.meta.env.VITE_API_URL;

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export class BackendService {
  private static instance: BackendService;
  private healthCheckPassed = false;

  private constructor() {}

  static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  /**
   * Health check endpoint - verifies backend is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      this.healthCheckPassed = response.status === 200;
      return this.healthCheckPassed;
    } catch {
      this.healthCheckPassed = false;
      return false;
    }
  }

  /**
   * Check if health check has passed
   */
  isHealthy(): boolean {
    return this.healthCheckPassed;
  }

  /**
   * Generic API request method with error handling
   */
  private async apiRequest<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    if (!this.healthCheckPassed) {
      throw new Error('Backend health check not passed');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getCourses(options?: RequestInit): Promise<CourseDTO[]> {
    return this.apiRequest<CourseDTO[]>('/api/course/all', options);
  }

  async getQuestions(courseName: string): Promise<QuestionDTO[]> {
    return this.apiRequest<QuestionDTO[]>(`/api/course/content/${courseName}`);
  }

  async createCourse(data: CreateCourseDTO): Promise<void> {
    await this.apiRequest('/api/course/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}

export const backendService = BackendService.getInstance();
