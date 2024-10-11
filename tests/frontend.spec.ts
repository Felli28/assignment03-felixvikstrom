import { test, expect } from '@playwright/test';

test('Add client on the clients page', async ({ page }) => {
  // Gå till inloggningssidan
  await page.goto('http://localhost:3000/login');

  // Vänta på att inloggningsfälten är tillgängliga och fyll i dem
  await page.fill('input[type="text"]', process.env.TEST_USERNAME || 'tester01');
  await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

  // Klicka på login-knappen
  await page.getByRole('button', { name: 'Login' }).click();

  // Verifiera att inloggningen lyckades genom att kontrollera URL
  await expect(page).toHaveURL('http://localhost:3000/');

  // Använd korrekt locator för att navigera till klientsidan
  await page.locator('div').filter({ hasText: /^Clients/ }).getByRole('link').click();

  // Verifiera att vi navigerat till klientsidan
  await expect(page).toHaveURL('http://localhost:3000/clients');

  // Klicka på "Create Client"
  await page.getByRole('link', { name: 'Create Client' }).click();

  // Vänta tills vi är på sidan för att skapa en ny klient
  await page.waitForURL('http://localhost:3000/client/new');

  // Fyll i namn, e-post och telefonnummer
  await page.locator('input[type="text"]').nth(0).fill('Adam Jalla');
  await page.locator('input[type="email"]').fill('adam.jalla@example.com');
  await page.locator('input[type="text"]').nth(1).fill('070 123 4567');

  // Vänta tills "Save"-knappen är synlig och klickbar
  const saveButton = page.locator('a.btn.blue:has-text("Save")');
  await expect(saveButton).toBeVisible({ timeout: 10000 });
  await expect(saveButton).toBeEnabled({ timeout: 10000 });

  // Klicka på "Save"
  await saveButton.click();

  // Verifiera att klienten har lagts till och är synlig på klientsidan
  await page.waitForURL('http://localhost:3000/clients');
  await expect(page.locator('text=Adam Jalla')).toBeVisible();
});






