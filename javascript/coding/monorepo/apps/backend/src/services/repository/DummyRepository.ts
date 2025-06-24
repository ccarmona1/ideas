import { CreateCourseDTO } from '@tester/types';
import {
  CourseDTO,
  CourseDTOWithContent,
} from '../../../../../packages/types/src/dto/CourseDTO.js';
import { Repository } from './Repository.js';
import ingles from '../aiGenerator/ingles.json' with { type: "json" };;

export class DummyRepository
  implements Repository<CourseDTO, CreateCourseDTO, CourseDTOWithContent>
{

  constructor() {
    console.log('Usind DummyRepository')
  }

  async getContent(name: string): Promise<CourseDTOWithContent> {
    const content = JSON.stringify(ingles, null, 2); // 2 es para identación bonita
    const content64 = Buffer.from(content, 'utf-8').toString('base64');
    return { name: 'test', sha: 'test', content: content64 };
  }
  async getAll(): Promise<CourseDTO[]> {
    return [{ name: 'test', sha: 'test' }];
  }
  async save(data: CreateCourseDTO): Promise<CourseDTO> {
    return this.getContent('something');
  }
}
