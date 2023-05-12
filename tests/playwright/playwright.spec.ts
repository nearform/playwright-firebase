/* eslint no-undef: 0 */

import { test } from '../../plugin/fixtures.js'
import { expect } from '@playwright/test'
test('Login sets the session state', async ({ page, login }): Promise<void> => {
    await page.goto('http://localhost:5173/login', { waitUntil: 'load' })
    await login
    const loginCredentials = await page.evaluate(() => {
        return window.sessionStorage
    })
    expect(Object.keys(loginCredentials)[0]).toContain('firebase:authUser')
    expect(Object.values(loginCredentials)[0]).not.toMatch('[object, Object]')
    await page.goto('http://localhost:5173/projects', { waitUntil: 'networkidle' })
    await page.getByTitle('dark mode').click()
})


