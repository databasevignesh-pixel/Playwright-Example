const { test, expect } = require('../fixtures/fixtures');

test('should show My home when an authenticated user opens the home page', async ({ page, loginPage }) => {
  await loginPage.navigate('/member/myhome/');

  await expect(page).toHaveURL('https://keralaproperty.in/member/myhome/');
  await expect(loginPage.myHomeHeading).toBeVisible();
});
