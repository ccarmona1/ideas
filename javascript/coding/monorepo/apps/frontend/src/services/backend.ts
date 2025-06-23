/**
 * Backend Service
 * Centralized service for all API communications with health check functionality
 */

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
    } catch (error) {
      console.error('Health check failed:', error);
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

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get all courses
   */
  async getCourses(): Promise<any[]> {
    return this.apiRequest<any[]>('/api/github/courses');
  }

  /**
   * Get questions for a specific course
   */
  async getQuestions(courseName: string): Promise<any[]> {
    return this.apiRequest<any[]>(`/api/github/course/${courseName}`);
  }

  /**
   * Submit quiz answers (if needed for future functionality)
   */
  async submitAnswers(courseName: string, answers: any): Promise<any> {
    return this.apiRequest<any>(`/api/quiz/${courseName}/submit`, {
      method: 'POST',
      body: JSON.stringify(answers),
    });
  }
}

export const backendService = BackendService.getInstance();
