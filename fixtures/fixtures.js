const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

module.exports = { test, expect };
