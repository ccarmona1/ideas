import { Octokit } from '@octokit/rest';
import { Repository } from './Repository.js';
import {
  CourseDTO,
  CourseDTOWithContent,
} from '../../../../../packages/types/src/dto/CourseDTO.js';
import { CreateCourseDTO } from '@tester/types';

export class GitHubRepository
  implements Repository<CourseDTO, CreateCourseDTO, CourseDTOWithContent>
{
  private internalOctokit: Octokit;
  private GITHUB_OWNER: string;
  private GITHUB_REPO: string;

  constructor() {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN must be set in environment variables');
    }

    this.internalOctokit = new Octokit({ auth: GITHUB_TOKEN });

    if (!process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
      throw new Error(
        'GITHUB_OWNER and GITHUB_REPO must be set in environment variables'
      );
    }

    this.GITHUB_OWNER = process.env.GITHUB_OWNER;
    this.GITHUB_REPO = process.env.GITHUB_REPO;
  }

  async save(data: CreateCourseDTO): Promise<CourseDTO> {
    let sha: string | undefined;
    try {
      const existingCourse = await this.getContent(data.courseName + '.json'); // validate performance

      sha = existingCourse?.sha;
    } catch (error) {
      console.log('creating new course');
    }

    const content = Buffer.from(data.content ?? '', 'utf-8').toString('base64');

    const response =
      await this.internalOctokit.repos.createOrUpdateFileContents({
        owner: this.GITHUB_OWNER,
        repo: this.GITHUB_REPO,
        path: 'javascript/examenes/automaticos/' + data.courseName + '.json',
        message: 'Creating course: ' + data.courseName,
        content,
        sha,
        mediaType: {
          format: 'raw',
        },
      });

    return response.data.content as CourseDTO;
  }

  async getAll(): Promise<CourseDTO[]> {
    const response = await this.internalOctokit.repos.getContent({
      owner: this.GITHUB_OWNER,
      repo: this.GITHUB_REPO,
      path: '/javascript/examenes/automaticos',
    });

    return response.data as CourseDTO[];
  }

  async getContent(name: string): Promise<CourseDTOWithContent> {
    const response = await this.internalOctokit.repos.getContent({
      owner: this.GITHUB_OWNER,
      repo: this.GITHUB_REPO,
      path: name,
    });

    return response.data as CourseDTOWithContent;
  }
}
