import test from '@playwright/test';
import {
  openAnExam,
  selectTheFirstAnswer
} from './exam-page';

test('Open an exam', async ({ page }) => {
  await openAnExam(page);
});

test('Select an answer', async ({ page }) => {
  await openAnExam(page);
  await selectTheFirstAnswer(page);
});

