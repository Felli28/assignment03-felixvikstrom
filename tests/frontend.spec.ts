import { test, expect } from '@playwright/test';

test('Login test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');
});


test('Navigate to Clients Page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).locator('div').click();
  await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link').click()

  await expect(page).toHaveURL('http://localhost:3000/rooms');


});














  






