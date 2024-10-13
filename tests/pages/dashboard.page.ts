import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  // Navigera till klientsidan
  async goToClients() {
    await this.page.locator('a[href="/clients"]').click(); // Vi använder denna locator för att klicka på Clients
  }
}
