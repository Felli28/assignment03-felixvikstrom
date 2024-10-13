import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';
import { ClientsPage } from './pages/clients.page';

test.describe.serial('Add and delete client tests', () => {
  test('1.Login and add a new client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    const username = process.env.TEST_USERNAME || 'defaultUsername';
    const password = process.env.TEST_PASSWORD || 'defaultPassword';

    await loginPage.navigate();
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.goToClients();
    await clientsPage.goToCreateClient();

    await page.fill('label:has-text("Name") + input', 'Adam Strong');
    await page.fill('label:has-text("Email") + input', 'adam@example.com');
    await page.fill('label:has-text("Telephone") + input', '123456789');

    await page.locator('a.btn.blue').click();

    const newClient = page.locator('text=Adam Strong');
    await expect(newClient).toBeVisible();
  });

  test('2.Login and delete Adam Strong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    const username = process.env.TEST_USERNAME || 'defaultUsername';
    const password = process.env.TEST_PASSWORD || 'defaultPassword';

    await loginPage.navigate();
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');
    await dashboardPage.goToClients();

    const client = page.getByText(/Adam Strong/);
    await client.waitFor({ state: 'visible', timeout: 10000 });
    await client.click();

    const menuButton = page.getByRole('img').nth(2);
    await menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await menuButton.click();

    const deleteButton = page.getByText('Delete');
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();

    await expect(page.locator('text=Adam Strong')).not.toBeVisible({ timeout: 10000 });
  });
});





