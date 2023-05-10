/* eslint no-undef: 0 */
import * as base from '@playwright/test'
import { readAuth } from './utils.js'
// eslint 
/**
 * Login and Logout fixtures - assumes playwright is on the page where authentication occurs
 */
export const test = base.test.extend({
    login: async ({ page }, use) => {
        const session = readAuth()
        await page.evaluate(async session => {
            window.sessionStorage.setItem(session.key, session.value)
        }, session)

        // Use the fixture value in the test.
        await use(page)
    },
    logout: async ({ page }, use) => {
        const sessionKey: string = readAuth().key
        await page.evaluate((sessionKey) => {
            window.sessionStorage.removeItem(sessionKey)
        }, sessionKey)
        await use(page)
    }

})
