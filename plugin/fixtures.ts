import * as base from '@playwright/test'
import { readAuthentication } from './utils'

/**
 * Login and Logout fixtures - assumes playwright is on the page where authentication occurs
 */
export const test = base.test.extend({
    login: async ({ page }, use) => {
        const session = readAuthentication()
        await page.evaluate(async session => {
            sessionStorage.setItem(session.key, session.value)
        }, session)

        // Use the fixture value in the test.
        await use(page)
    },
    logout: async ({ page }, use) => {
        const sessionKey: string = readAuthentication().key
        await page.evaluate((sessionKey) => {
            sessionStorage.removeItem(sessionKey)
        }, sessionKey)
        await use(page)
    }

})
