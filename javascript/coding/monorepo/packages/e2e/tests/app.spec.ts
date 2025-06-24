import { expect, test } from '@playwright/test';
import { FRONTEND_URL } from 'common/env';

test('The app starts', async ({ page }) => {
  await page.goto(FRONTEND_URL);
  await expect(
    page.getByLabel('Crear nuevo curso').getByRole('heading')
  ).toContainText('Crear nuevo examen');
  await expect(
    page.getByLabel('Crear nuevo curso').getByRole('paragraph')
  ).toContainText('Usando Gemini AI');
});
