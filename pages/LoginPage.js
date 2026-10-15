const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#ulogin');
    this.passwordInput = page.locator('#upass');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.myHomeHeading = page.getByRole('heading', { name: /my home/i });
  }

  async navigate(path = '/member/login/') {
    await this.page.goto(path);
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL('https://keralaproperty.in/member/myhome/');
    await expect(this.myHomeHeading).toBeVisible();
  }
}

module.exports = { LoginPage };
