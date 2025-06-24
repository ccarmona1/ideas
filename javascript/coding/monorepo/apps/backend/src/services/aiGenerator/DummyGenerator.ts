import { CreateCourseDTO } from '@tester/types';
import { AIGenerator } from './AIGenerator.js';
import ingles from './ingles.json';

export class DummyGenerator extends AIGenerator {
  constructor() {
    super();
    console.log('Using DummyGenerator');
  }

  async generateContent(prompt: string): Promise<string> {
    const jsonString = JSON.stringify(ingles, null, 2); // 2 es para identación bonita
    return jsonString;
  }
}
