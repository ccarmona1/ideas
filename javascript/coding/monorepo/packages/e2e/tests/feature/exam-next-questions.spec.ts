import test, { expect } from '@playwright/test';
import { openAnExam, selectTheCorrectAnswer } from './exam-page';

test('Select the correct answer and continue to the next question automatically', async ({
  page,
}) => {
  await selectTheCorrectAnswer(page);
});

test('should skip a question (drag)', async ({ page }) => {
  await openAnExam(page);
  const firstQuestionItem = page.getByRole('heading');
  const firstQuestion = await firstQuestionItem.innerText();
  await openAnExam(page);

  const nextQuestionButton = page.getByRole('button', {
    name: 'Arrastra o haz click aquí',
  });
  await expect(nextQuestionButton).toBeVisible();

  await nextQuestionButton.dragTo(firstQuestionItem);

  await page.waitForTimeout(1000);

  const secondQuestion = await page.getByRole('heading').innerText();
  expect(secondQuestion).not.toEqual(firstQuestion);

  await expect(page.getByText('⏭ 1', { exact: false })).toBeVisible();
});

test('should skip a question (click)', async ({ page }) => {
  await openAnExam(page);
  const firstQuestionItem = page.getByRole('heading');
  const firstQuestion = await firstQuestionItem.innerText();
  await openAnExam(page);

  const nextQuestionButton = page.getByRole('button', {
    name: 'Arrastra o haz click aquí',
  });
  await expect(nextQuestionButton).toBeVisible();

  await nextQuestionButton.click();

  await page.waitForTimeout(1000);

  const secondQuestion = await page.getByRole('heading').innerText();
  expect(secondQuestion).not.toEqual(firstQuestion);

  await expect(page.getByText('⏭ 1', { exact: false })).toBeVisible();
});
