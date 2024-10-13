import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Navigera till inloggningssidan
  async navigate() {
    await this.page.goto('http://localhost:3000/login');
  }

  // Fyll i användarnamn och lösenord och logga in
  async login(username: string, password: string) {
    await this.page.fill('input[type="text"]', username); // Fyll i användarnamn
    await this.page.fill('input[type="password"]', password); // Fyll i lösenord
    await this.page.getByRole('button', { name: 'Login' }).click(); // Klicka på login-knappen
  }
}

