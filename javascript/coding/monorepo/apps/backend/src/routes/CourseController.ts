import type { Request, Response } from 'express';
import type { CourseService } from '../services/domain/CourseService.js';
import type { CreateCourseDTO } from '@tester/types';

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  async getContent(req: Request, res: Response): Promise<void> {
    try {
      const name = req.params.name;
      const data = await this.courseService.getContent(
        '/javascript/examenes/automaticos/' + name + '.json'
      );
      const decoded = Buffer.from(data.content, 'base64').toString('utf8');

      res.json(JSON.parse(decoded));
    } catch (error) {
      console.error('Error fetching course data:', error);
      res.status(500).json({
        error: 'Failed to fetch course data',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.courseService.getAll();

      const parsedData = data.map((course) => ({
        ...course,
        name: course.name.replace('.json', ''),
      }));

      res.json(parsedData);
    } catch (error) {
      console.error('CourseController error:', error);
      res.status(500).json({
        error: 'Failed to fetch courses from CourseController',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const createCourseDTO: CreateCourseDTO = req.body;
      const course = await this.courseService.createCourse(createCourseDTO);
      res.json({
        success: true,
        data: course,
        metadata: {
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Course creation error:', error);
      res.status(500).json({
        error: 'Failed to create course',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
