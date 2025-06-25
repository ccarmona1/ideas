import type { Request, Response } from 'express';
import type { QuestionService } from '../services/domain/QuestionService.js';

export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  async generateQuestions(req: Request, res: Response): Promise<void> {
    try {
      const createCourseDTO = req.body;
      const questions = await this.questionService.generateQuestions(
        createCourseDTO
      );
      res.json({
        success: true,
        data: questions,
        metadata: {
          count: questions.length,
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Question generation error:', error);
      res.status(500).json({
        error: 'Failed to generate questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
