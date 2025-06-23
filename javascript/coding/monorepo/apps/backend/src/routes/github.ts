import { Request, Response, Router } from 'express';
import { getContent } from './utils/githubClient.js';

const router = Router();

router.get('/courses', async (req: Request, res: Response) => {
  try {
    const data = await getContent('/javascript/examenes/automaticos');
    const courseNames = (data as { name: string; sha: string }[]).map(
      (item) => ({ name: item.name.replaceAll('.json', ''), sha: item.sha })
    );

    res.json(courseNames);
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({
      error: 'Failed to fetch courses from GitHub',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.get('/course/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const data = await getContent(
      '/javascript/examenes/automaticos/' + name + '.json'
    );

    const decoded = Buffer.from((data as any).content, 'base64').toString(
      'utf8'
    );

    res.json(JSON.parse(decoded));
  } catch (error) {
    console.error('Error fetching question by name:', error);
    res.status(500).json({
      error: 'Failed to fetch question by name',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export { router as githubRoutes };
