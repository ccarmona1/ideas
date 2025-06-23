import cors from 'cors';
import express, { Router } from 'express';
import { CourseController } from './routes/CourseController.js';
import { QuestionController } from './routes/QuestionController.js';
import { GeminiGenerator } from './services/aiGenerator/GeminiGenerator.js';
import { CourseService } from './services/domain/CourseService.js';
import { QuestionService } from './services/domain/QuestionService.js';
import { GitHubRepository } from './services/repository/GitHubRepository.js';
import configureDI from './core/DependencyInjection.js';
import { configureRoutes } from './core/ConfigureRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

configureRoutes(app);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
