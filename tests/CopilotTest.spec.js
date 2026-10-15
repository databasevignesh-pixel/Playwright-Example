import {test,expect} from '@playwright/test';

const { username, password } = require('../.credentials.json');

test('logs in and displays My home', async ({ page }) => {
	await page.goto('https://keralaproperty.in/member/login/');

	await page.locator('#ulogin').fill(username);
	await page.locator('#upass').fill(password);
	await page.getByRole('button', { name: 'Login', exact: true }).click();

	await expect(page).toHaveURL('https://keralaproperty.in/member/myhome/');
	await expect(page.getByRole('heading', { name: /my home/i })).toBeVisible();
});