import { AIGenerator } from './AIGenerator.js';
import ingles from './ingles.json' with { type: 'json' };

export class DummyGenerator extends AIGenerator {
  constructor() {
    super();
    console.log('Using DummyGenerator');
  }

  async generateContent(): Promise<string> {
    const jsonString = JSON.stringify(ingles, null, 2); // 2 es para identación bonita
    return jsonString;
  }
}
