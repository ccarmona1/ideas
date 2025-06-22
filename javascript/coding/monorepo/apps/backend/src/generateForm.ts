import { GoogleGenAI } from '@google/genai';
import { createWriteStream, writeFile } from 'fs';

export const generateForm = async () => {
  const prompt = `Generate a JSON file with 15-20 multiple choice questions following this exact structure:
    
    [
      {
        "question": "Question text here",
        "options": [
          "a) First option",
          "b) Second option", 
          "c) Third option",
          "d) Fourth option"
        ],
        "answer": "b", // correct answer letter (a, b, c, or d)
        "explanation": "Detailed explanation of why this answer is correct",
        "invalidOptions": {
          "a": "Explanation of why option a is incorrect",
          "c": "Explanation of why option c is incorrect", 
          "d": "Explanation of why option d is incorrect"
          // Note: don't include the correct answer in invalidOptions
        }
      }
    ]
    
    Requirements:
    - Topic: ["JavaScript ES6+ features", "React Hooks", "Node.js fundamentals", "Python data structures", etc.]
    - Each question should be challenging but fair
    - Options should be plausible to avoid obvious answers
    - Explanations should be educational and detailed
    - InvalidOptions should explain the specific reason why each wrong answer is incorrect
    - Use proper JSON syntax with double quotes
    - Make sure the "answer" field matches one of the option letters (a, b, c, d)
    - Questions should test practical understanding, not just memorization
    - IMPORTANT: Return ONLY the JSON array, no code blocks, no markdown formatting, no explanatory text
    - Do NOT wrap the response in code blocks (no triple backticks)
    - Start directly with [ and end with ]
    
    Generate exactly 15-20 questions about Javascript following this structure.`;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });

  writeFile('questions.json', response.text ?? '', (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return;
    }
    console.log('File created successfully');
  });
};
