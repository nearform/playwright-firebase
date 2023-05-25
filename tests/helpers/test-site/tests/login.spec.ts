import { expect } from '@playwright/test';
import { test } from '../auth.setup'
import { Page } from '@playwright/test';
test('has title', async ({ page, auth }: { page: Page, auth: any }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await auth.login(page)

  const txt = page.getByText('Welcome! You are now logged in')
  await expect(txt).toBeVisible()
  await auth.logout(page)
  await expect(txt).not.toBeVisible()
});