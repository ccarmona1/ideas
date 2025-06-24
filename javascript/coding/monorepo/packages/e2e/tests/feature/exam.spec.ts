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

test('Select the correct answer and continue to the next question automatically', async ({
  page,
}) => {
  await selectTheCorrectAnswer(page);
});

test('Select the incorrect answer', async ({ page }) => {
  await selectAnIncorrectAnswer(page);
});

test('Select the incorrect answer and continue to the explanation (click)', async ({
  page,
}) => {
  const { firstQuestion } = await selectAnIncorrectAnswer(page);

  const continueToExplanation = page.getByRole('button', {
    name: 'Arrastra o haz click aquí para ver la explicación',
  });
  await expect(continueToExplanation).toBeVisible();

  await continueToExplanation.click();

  await page.waitForTimeout(1000);

  await expect(page.getByText('Tu respuesta:')).toBeVisible();
  await expect(page.getByText('Respuesta correcta:')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Explicación' })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '¿Por qué es incorrecta tu' })
  ).toBeVisible();
  const nextQuestionButton = page.getByRole('button', {
    name: 'Arrastra o haz click aquí',
  });
  await expect(nextQuestionButton).toBeVisible();

  await nextQuestionButton.click();

  await page.waitForTimeout(1000);

  const secondQuestion = await page.getByRole('heading').innerText();
  expect(secondQuestion).not.toEqual(firstQuestion);
});

test('Select the incorrect answer and continue to the explanation (drag)', async ({
  page,
}) => {
  const { firstQuestion } = await selectAnIncorrectAnswer(page);

  const continueToExplanation = page.getByRole('button', {
    name: 'Arrastra o haz click aquí para ver la explicación',
  });
  await expect(continueToExplanation).toBeVisible();

  await continueToExplanation.click();

  await page.waitForTimeout(1000);

  await expect(page.getByText('Tu respuesta:')).toBeVisible();
  await expect(page.getByText('Respuesta correcta:')).toBeVisible();
  const heading = page.getByRole('heading', { name: 'Explicación' });
  await expect(heading).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '¿Por qué es incorrecta tu' })
  ).toBeVisible();
  const nextQuestionButton = page.getByRole('button', {
    name: 'Arrastra o haz click aquí',
  });
  await expect(nextQuestionButton).toBeVisible();

  await nextQuestionButton.dragTo(heading);

  await page.waitForTimeout(1000);

  const secondQuestion = await page.getByRole('heading').innerText();
  expect(secondQuestion).not.toEqual(firstQuestion);
});
