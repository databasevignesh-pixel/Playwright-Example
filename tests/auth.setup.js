const fs = require('node:fs/promises');
const path = require('node:path');
const { test } = require('../fixtures/fixtures');
const { loadCredentials } = require('../utils/credentials');

const authDirectory = path.resolve(__dirname, '../playwright/.auth');
const authFile = path.join(authDirectory, 'user.json');

test('should save browser state after successful authentication', async ({ page, loginPage }) => {
  await fs.mkdir(authDirectory, { recursive: true });

  const { username, password } = loadCredentials();
  await loginPage.navigate();
  await loginPage.login(username, password);
  await loginPage.verifySuccessfulLogin();

  await page.context().storageState({ path: authFile });
});
