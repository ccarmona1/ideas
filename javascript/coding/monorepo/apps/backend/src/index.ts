import express from 'express';
import cors from 'cors';
import { githubRoutes } from './routes/github.js';
import { questionsRoutes } from './routes/questions.js';

const app = express();
const PORT = process.env.PORT_NODE || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/github', githubRoutes);
app.use('/api/questions', questionsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📂 GitHub API: http://localhost:${PORT}/api/github`);
  console.log(`❓ Questions API: http://localhost:${PORT}/api/questions`);
});

export default app;
