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
        await page.goto('/', { waitUntil: 'load' })
        await page.evaluate(async session => {
            sessionStorage.setItem(session.key, JSON.stringify(session.value))
        }, session)
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
