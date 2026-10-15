const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');
const { createPageObjects } = require('../utils/pageObjects');

test.describe('Cart', () => {
  let pages;

  test.beforeEach(async ({ page }) => {
    pages = createPageObjects(page);
    await pages.loginPage.open();
    await pages.loginPage.login(users.valid.username, users.valid.password);
    await pages.inventoryPage.addBackpackToCart();
    await pages.inventoryPage.openCart();
  });

  test('should show the backpack when it has been added to the cart', async () => {
    await expect(pages.cartPage.title).toHaveText('Your Cart');
    await expect(pages.cartPage.itemNames).toHaveText(['Sauce Labs Backpack']);
  });
});
