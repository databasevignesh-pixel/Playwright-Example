const { test, expect } = require('../fixtures/fixtures');
const { loadCredentials } = require('../utils/credentials');
const { scenarios } = require('../test-data/users.json');

test.use({ storageState: { cookies: [], origins: [] } });

for (const scenario of scenarios) {
  test(`should ${scenario.expectedResult === 'success' ? 'sign in' : 'remain on the login page'} when ${scenario.name}`, async ({ page, loginPage }) => {
    const credentials = scenario.credentialSource === 'local'
      ? loadCredentials()
      : { username: scenario.username, password: scenario.password };

    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);

    if (scenario.expectedResult === 'success') {
      await loginPage.verifySuccessfulLogin();
    } else {
      await expect(page).toHaveURL('https://keralaproperty.in/member/login/');
      await expect(loginPage.usernameInput).toBeVisible();
    }
  });
}
