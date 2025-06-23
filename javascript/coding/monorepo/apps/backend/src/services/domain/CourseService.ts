import { CreateCourseDTO } from '@tester/types';
import { CourseDTO } from '../../../../../packages/types/src/dto/CourseDTO.js';
import { Repository } from '../repository/Repository.js';
import { QuestionService } from './QuestionService.js';

export class CourseService {
  constructor(
    private readonly repository: Repository<CourseDTO, CreateCourseDTO>,
    private readonly questionService: QuestionService
  ) {}

  getContent(name: string): Promise<CourseDTO> {
    return this.repository.get(name);
  }

  getAll(): Promise<CourseDTO[]> {
    return this.repository.getAll();
  }

  async createCourse(createCourseDTO: CreateCourseDTO): Promise<CourseDTO> {
    const questions = await this.questionService.generateQuestions(
      createCourseDTO
    );

    const newCourse = await this.repository.save({
      ...createCourseDTO,
      content: JSON.stringify(questions),
    });

    return newCourse;
  }
}
