import { expect } from '@playwright/test'
import { test } from './auth.setup'
import { Page } from '@playwright/test'
test('has title', async ({ page, auth }: { page: Page; auth: any }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(page.getByText('Welcome!')).toBeVisible()
  await expect(page.getByText('You are logged out')).toBeVisible()

  await auth.login(page)

  await expect(page.getByText('Log out')).toBeVisible() //this must be awaited as it takes some time to authorise and re-render.

  //Add down below your google accounts display name to test this even further.
  //await expect(page.getByText('<YOUR_DISPLAY_NAME>')).toBeVisible()

  await auth.logout(page)
  await expect(page.getByText('You are logged out')).toBeVisible()
})
