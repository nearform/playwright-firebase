import { expect } from '@playwright/test';
import { test } from '../auth.setup'
import { Authentication } from '../../../..';
test('has title', async ({ page, auth }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await auth.login(page)
  await page.reload()
  const txt = page.getByText('Welcome! You are now logged in')
  await expect(txt).toBeVisible()
  await auth.logout(page)
  await page.reload()
  await expect(txt).not.toBeVisible()
});