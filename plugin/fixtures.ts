/* eslint no-undef: 0 */
import * as base from '@playwright/test'
import { readAuth } from './utils.js'
import getCredentials from './auth.setup.js'
// eslint 
/**
 * Login and Logout fixtures - assumes playwright is on the page where authentication occurs
 */
export const test = base.test.extend({
    login: async ({ page }, use, testInfo) => {

        const session = readAuth()
        try {

            await page.goto(testInfo.project.use.baseURL!, { waitUntil: 'load' })
            await page.evaluate(async session => {
                sessionStorage.setItem(session.key, session.value)
            }, session)
        } catch (err) {
            throw Error(`${err}\n Are you awaiting the page to load before authenticating?`)
        }


        // Use the fixture value in the test.
        await use(page)
    },

    // logout: async ({ page }, use) => {
    //     const sessionKey: string = readAuth().key
    //     await page.evaluate((sessionKey) => {
    //         sessionStorage.removeItem(sessionKey)
    //     }, sessionKey)
    //     await use(page)
    // }

})
