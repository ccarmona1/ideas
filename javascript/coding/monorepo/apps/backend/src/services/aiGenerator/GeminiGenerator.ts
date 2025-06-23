import { GoogleGenAI } from '@google/genai';
import { AIGenerator } from './AIGenerator.js';

export class GeminiGenerator extends AIGenerator {
  private genAI: GoogleGenAI;

  constructor() {
    super();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY must be set in environment variables');
    }

    this.genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });

    return response.text?.trim() || '';
  }
}
