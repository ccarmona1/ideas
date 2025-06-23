import { DIContainer } from 'rsdi';
import { CourseController } from '../routes/CourseController.js';
import { QuestionController } from '../routes/QuestionController.js';
import { GeminiGenerator } from '../services/aiGenerator/GeminiGenerator.js';
import { CourseService } from '../services/domain/CourseService.js';
import { QuestionService } from '../services/domain/QuestionService.js';
import { GitHubRepository } from '../services/repository/GitHubRepository.js';

export type AppDIContainer = ReturnType<typeof configureDI>;

export default function configureDI() {
  return new DIContainer()
    .add('repository', () => new GitHubRepository())
    .add('aiGenerator', () => new GeminiGenerator())
    .add(
      'questionService',
      ({ aiGenerator }) => new QuestionService(aiGenerator)
    )
    .add(
      'courseService',
      ({ repository, questionService }) =>
        new CourseService(repository, questionService)
    )
    .add(
      'courseController',
      ({ courseService }) => new CourseController(courseService)
    )
    .add(
      'questionController',
      ({ questionService }) => new QuestionController(questionService)
    );
}
