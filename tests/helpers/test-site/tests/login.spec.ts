import { expect, Page } from '@playwright/test';
import { test } from '../auth.setup'

test('has title', async ({ page, login }: { page: Page, login: Page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const txt = page.getByText('Welcome! You are now logged in')
  await expect(txt).toBeVisible()
});