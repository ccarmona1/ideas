import { DIContainer } from 'rsdi';
import { CourseController } from '../routes/CourseController.js';
import { QuestionController } from '../routes/QuestionController.js';
import { GeminiGenerator } from '../services/aiGenerator/GeminiGenerator.js';
import { CourseService } from '../services/domain/CourseService.js';
import { QuestionService } from '../services/domain/QuestionService.js';
import { GitHubRepository } from '../services/repository/GitHubRepository.js';
import { DummyRepository } from '../services/repository/DummyRepository.js';
import { DummyGenerator } from '../services/aiGenerator/DummyGenerator.js';

export type AppDIContainer = ReturnType<typeof configureDI>;

export default function configureDI() {
  const env = process.env.DEPLOY_ENV;

  console.log('Current env: ' + env);

  return new DIContainer()
    .add('repository', () =>
      env === 'dev' ? new DummyRepository() : new GitHubRepository()
    )
    .add('aiGenerator', () =>
      env === 'dev' ? new DummyGenerator() : new GeminiGenerator()
    )
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
