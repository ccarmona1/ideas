import type { Express } from 'express';
import { Router } from 'express';
import configureDI from './DependencyInjection.js';

export const configureRoutes = (app: Express): void => {
  const { courseController } = configureDI();

  const courseRouter = Router();
  courseRouter.get('/all', courseController.getAll.bind(courseController));
  courseRouter.get(
    '/content/:name',
    courseController.getContent.bind(courseController),
  );
  courseRouter.post(
    '/create',
    courseController.createCourse.bind(courseController),
  );

  app.use('/api/course', courseRouter);
};
