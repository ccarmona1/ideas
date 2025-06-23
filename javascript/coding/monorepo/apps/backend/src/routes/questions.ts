import { GoogleGenAI } from '@google/genai';
import { Request, Response, Router, RequestHandler } from 'express';

const router = Router();

// Type definitions for question generation
interface GenerateQuestionsRequest {
  prompt: string;
  numQuestions?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple-choice' | 'true-false' | 'mixed';
}

interface QuestionAnswer {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: string;
  category: string;
}

// Generate questions using Gemini API
const generateQuestionsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      prompt,
      numQuestions = 5,
      difficulty = 'medium',
      type = 'multiple-choice',
    }: GenerateQuestionsRequest = req.body;

    if (!prompt) {
      res.status(400).json({
        error: 'Prompt is required',
      });
      return;
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      res.status(500).json({
        error: 'GEMINI_API_KEY must be set in environment variables',
      });
      return;
    }

    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Construct the generation prompt
    const generationPrompt = `
Generate exactly ${numQuestions} ${type} questions about: ${prompt}

Requirements:
- Difficulty level: ${difficulty}
- Each question must have exactly 4 options (A, B, C, D)
- Include correct answer index (0-3)
- Provide detailed explanation for each answer
- Questions should be educational and test understanding

Return ONLY a valid JSON array in this exact format, with no markdown formatting, no code blocks, and no additional text:

[
  {
    "id": "q1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": 0,
    "explanation": "Detailed explanation of why this answer is correct",
    "difficulty": "${difficulty}",
    "category": "Generated"
  }
]

IMPORTANT: Return ONLY the JSON array. Do not include \`\`\`json or any other formatting.
`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: generationPrompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });

    let text = (response.text ?? '').trim();

    // Clean up any markdown formatting that might have been added
    text = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Parse and validate the JSON
    let questions: QuestionAnswer[];
    try {
      questions = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', text);
      res.status(500).json({
        error: 'Failed to parse AI response as valid JSON',
        details:
          parseError instanceof Error
            ? parseError.message
            : 'Unknown parsing error',
        rawResponse: text,
      });
      return;
    }

    // Validate the structure
    if (!Array.isArray(questions)) {
      res.status(500).json({
        error: 'AI response is not an array',
        rawResponse: text,
      });
      return;
    }

    // Validate each question
    for (const question of questions) {
      if (
        !question.id ||
        !question.question ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        typeof question.correct_answer !== 'number' ||
        question.correct_answer < 0 ||
        question.correct_answer > 3
      ) {
        res.status(500).json({
          error: 'Invalid question format in AI response',
          invalidQuestion: question,
        });
        return;
      }
    }

    res.json({
      success: true,
      data: questions,
      metadata: {
        count: questions.length,
        difficulty,
        type,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({
      error: 'Failed to generate questions',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

router.post('/generate', generateQuestionsHandler);

export { router as questionsRoutes };
