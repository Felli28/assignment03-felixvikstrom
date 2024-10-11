import { test, expect } from '@playwright/test';

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

test('Add client on the clients page', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('div').filter({ hasText: /^ClientsNumber: \d+View$/ }).getByRole('link').click();
  await expect(page).toHaveURL('http://localhost:3000/clients');
  
  await page.getByRole('link', { name: 'Create Client' }).click();
  await page.waitForURL('http://localhost:3000/client/new');

  await page.locator('input[type="text"]').nth(0).fill('Adam Jalla');
  await page.locator('input[type="email"]').fill('adam.jalla@example.com');
  await page.locator('input[type="text"]').nth(1).fill('070 123 4567');

  const saveButton = page.locator('a.btn.blue:has-text("Save")');
  await saveButton.click();
  
  await expect(page).toHaveURL('http://localhost:3000/clients');
  await expect(page.locator('text=Adam Jalla')).toBeVisible();
});

