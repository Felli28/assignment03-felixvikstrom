import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  
  async goToClients() {
    await this.page.locator('a[href="/clients"]').click(); 
  }
}
