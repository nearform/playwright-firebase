/* eslint no-undef: 0 */
import { test } from '../../plugin/fixtures.js';
test('Login sets the session state', async ({ page, login }) => {
    await page.goto('http://localhost:5173/login', { waitUntil: 'load' });
    console.log('GONE TO PAGE');
    console.log(page.url());
    await login;
    const loginCredentials = await page.evaluate(() => {
        return window.sessionStorage;
    });
    console.log(loginCredentials);
});
