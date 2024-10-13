import { Page } from '@playwright/test';

export class ClientsPage {
  constructor(private page: Page) {}

  async goToCreateClient() {
    await this.page.waitForSelector('a:has-text("Create Client")', { state: 'visible' });
    await this.page.getByRole('link', { name: 'Create Client' }).click();
  }

  async addClient(name: string, email: string, telephone: string) {
    await this.page.fill('input[type="text"]', name);
    await this.page.fill('input[type="email"]', email);
    await this.page.fill('input[type="text"]:nth-of-type(2)', telephone);
    await this.page.locator('a.btn.blue').click();
  }

  async deleteClient(name: string) {
    const clientRow = this.page.locator(`tr:has-text("${name}")`);
    
    // Klicka på knappen med tre prickar (menyknapp)
    await clientRow.locator('button:has-text("...")').click();

    // Välj "Delete" från menyn
    await clientRow.locator('button:has-text("Delete")').click();

    // Bekräfta borttagningen om det finns en bekräftelsemodal
    await this.page.locator('button:has-text("Confirm")').click();
  }
}

