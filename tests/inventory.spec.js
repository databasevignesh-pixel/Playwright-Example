const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');
const { createPageObjects } = require('../utils/pageObjects');

test.describe('Inventory', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = createPageObjects(page);
    await pages.loginPage.open();
    await pages.loginPage.login(users.valid.username, users.valid.password);
  });

  test('should show products when a valid user logs in', async () => {
    await expect(pages.inventoryPage.title).toHaveText('Products');
  });

  test('should add the backpack when its add button is clicked', async () => {
    await pages.inventoryPage.addBackpackToCart();

    await expect(pages.inventoryPage.cartBadge).toHaveText('1');
  });
});
