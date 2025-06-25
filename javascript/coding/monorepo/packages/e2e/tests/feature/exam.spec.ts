import test, { expect } from '@playwright/test';
import {
  openAnExam,
  selectAnIncorrectAnswer,
  selectTheCorrectAnswer,
  selectTheFirstAnswer,
} from './exam-page';

test('Open an exam', async ({ page }) => {
  await openAnExam(page);
});

test('Select an answer', async ({ page }) => {
  await openAnExam(page);
  await selectTheFirstAnswer(page);
});

