const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');
const { createPageObjects } = require('../utils/pageObjects');

test.describe('Login', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = createPageObjects(page);
    await pages.loginPage.open();
  });

  test('should open inventory when valid credentials are submitted', async ({ page }) => {
    await pages.loginPage.login(users.valid.username, users.valid.password);

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(pages.inventoryPage.title).toHaveText('Products');
  });

  test('should show a lockout error when a locked user logs in', async () => {
    await pages.loginPage.login(users.locked.username, users.locked.password);

    await expect(pages.loginPage.errorMessage).toContainText('locked out');
  });
});
