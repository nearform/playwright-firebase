/* eslint no-undef: 0 */
import { getCredentials } from "./plugin/auth.setup.js";
import { saveAuth } from "./plugin/utils.js";
import { test as base } from '@playwright/test';
export const test = base.extend({
    UID: [null, { option: true }],
    serviceAccount: [null, { option: true }],
    options: [null, { option: true }],
    login: async ({ page, serviceAccount, options, UID, baseURL }, use) => {
        if (serviceAccount && options?.apiKey && UID && baseURL) {
            await page.goto(baseURL);
            const credentials = await getCredentials(serviceAccount, options, UID);
            const authSession = saveAuth(credentials, options.apiKey);
            await page.evaluate(async (auth) => {
                sessionStorage.setItem(auth.key, JSON.stringify(auth.value));
            }, authSession);
        }
        else {
            throw new Error('Missing one of the following: Service Account, options, UID or baseURL in config file');
        }
        use(page);
    },
});
