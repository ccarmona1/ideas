import { expect } from '@playwright/test';
import { FRONTEND_URL } from 'common/env';

export async function selectTheCorrectAnswer(page) {
  await openAnExam(page);
  const firstQuestion = await page.getByRole('heading').innerText();
  const goodAnswerInnerText = await selectTheFirstAnswer(page);
  await openAnExam(page);

  const goodAnswer = page.getByRole('button', { name: goodAnswerInnerText });
  expect(goodAnswer).toBeVisible();
  await goodAnswer.click();

  await page.waitForTimeout(1000);

  await expect(page.getByText('✔ 1✖ 0Restantes:')).toBeVisible();
  const secondQuestion = await page.getByRole('heading').innerText();
  expect(secondQuestion).not.toEqual(firstQuestion);
}

export async function selectAnIncorrectAnswer(page) {
  await openAnExam(page);
  const goodAnswerInnerText = await selectTheFirstAnswer(page);
  await openAnExam(page);

  const incorrectAnswer = page
    .getByRole('button', { name: /^Opción [A-Z]: ([abcd]\) .*)$/ })
    .filter({ hasNotText: goodAnswerInnerText })
    .nth(0);
  expect(incorrectAnswer).toBeVisible();
  await incorrectAnswer.click();

  await expect(page.getByText('✔ 0✖ 1Restantes:')).toBeVisible();

  const correctAnswer = page.locator('.option-btn.answer-correct');

  expect(correctAnswer).toBeVisible();

  const incorrectAnswerStyle = page.locator(
    '.option-btn.selected.answer-incorrect'
  );

  expect(incorrectAnswerStyle).toBeVisible();

  const firstQuestion = await page.getByRole('heading').innerText();
  return { firstQuestion };
}

export async function selectTheFirstAnswer(page) {
  const firstAnswer = page
    .getByRole('button', { name: /^Opción [A-Z]: ([abcd]\) .*)$/ })
    .nth(0);

  await firstAnswer.click();

  const correctAnswer = page.locator('.option-btn.answer-correct');

  expect(correctAnswer).toBeVisible();

  return await correctAnswer.innerText();
}

export async function openAnExam(page) {
  await page.goto(FRONTEND_URL);
  await page
    .getByRole('button')
    .filter({ hasNotText: 'Crear nuevo examen' })
    .nth(0)
    .click();
  await expect(page.getByRole('heading')).toBeVisible();
  await expect(
    page.getByRole('button', { name: /^Opción [A-Z]: ([abcd]\) .*)$/ })
  ).toHaveCount(4);
  await expect(
    page.getByRole('link', { name: '← Volver a cursos' })
  ).toBeVisible();
  await expect(page.getByText('✔ 0✖ 0Restantes:')).toBeVisible();
  await expect(page.getByText('✔')).toBeVisible();
  await expect(page.getByText('✖')).toBeVisible();
  await expect(page.getByText('Restantes:')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Arrastra o haz click aquí' })
  ).toBeVisible();
}
