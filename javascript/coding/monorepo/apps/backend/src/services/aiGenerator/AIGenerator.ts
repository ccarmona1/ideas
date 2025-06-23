import { CreateCourseDTO } from '@tester/types';

export abstract class AIGenerator {
  abstract generateContent(prompt: string): Promise<string>;

  protected cleanResponse(response: string): string {
    return response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
  }

  generateQuestionsPrompt(createCourseDTO: CreateCourseDTO): string {
    const generationPrompt = `
    Generate exactly ${createCourseDTO.courseNumOfQuestions} multiple choice questions about: ${createCourseDTO.courseName}
    
    Requirements:
    - Keywords: ${createCourseDTO.courseKeywords}
    - Difficulty level: ${createCourseDTO.courseDifficulty}
    - Each question must have exactly 4 options (A, B, C, D)
    - Include correct answer index (0-3)
    - Provide detailed explanation for each answer
    - Questions should be educational and test understanding
    
    Return ONLY a valid JSON array in this exact format, with no markdown formatting, no code blocks, and no additional text:
    
    [
      {
        "id": "q1",
        "question": "Question text here?",
        "options": ["a) Option A", "b) Option B", "c) Option C", "d) Option D"],
        "answer": "a",
        "explanation": "Detailed explanation of why this answer is correct",
        "difficulty": "${createCourseDTO.courseDifficulty}",
        "category": "Generated",
        "invalidOptions: {
          "b": "Explanation for why option B is incorrect",
          "c": "Explanation for why option C is incorrect",
          "d": "Explanation for why option D is incorrect"
        }
      }
    ]
    
    IMPORTANT: Return ONLY the JSON array. Do not include \`\`\`json or any other formatting.
    `;

    return generationPrompt;
  }
}
