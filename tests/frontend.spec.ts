import { test, expect } from '@playwright/test';

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

test('1.Login test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');
});

test('2.Navigate to Clients Page', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).locator('div').click();
  await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link').click();

  await expect(page).toHaveURL('http://localhost:3000/rooms');
});

