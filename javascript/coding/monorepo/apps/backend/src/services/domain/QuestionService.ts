import { CreateCourseDTO } from '@tester/types';
import { QuestionDTO } from '../../../../../packages/types/src/dto/QuestionDTO.js';
import { AIGenerator } from '../aiGenerator/AIGenerator.js';

export class QuestionService {
  constructor(private readonly aiGenerator: AIGenerator) {}

  async generateQuestions(
    createCourseDTO: CreateCourseDTO
  ): Promise<QuestionDTO[]> {
    const prompt = this.aiGenerator.generateQuestionsPrompt(createCourseDTO);

    const textContent = await this.aiGenerator.generateContent(prompt);

    return JSON.parse(textContent);
  }
}
