import type { CreateCourseDTO } from '@tester/types';
import type {
  CourseDTO,
  CourseDTOWithContent,
} from '../../../../../packages/types/src/dto/CourseDTO.js';
import type { Repository } from '../repository/Repository.js';
import type { QuestionService } from './QuestionService.js';

export class CourseService {
  constructor(
    private readonly repository: Repository<
      CourseDTO,
      CreateCourseDTO,
      CourseDTOWithContent
    >,
    private readonly questionService: QuestionService
  ) {}

  getContent(name: string): Promise<CourseDTOWithContent> {
    return this.repository.getContent(name);
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
