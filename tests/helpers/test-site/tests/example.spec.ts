import { expect } from '@playwright/test';
import { test } from './auth-setup'
import { Page } from '@playwright/test';

test('has title', async ({ page }: { page: Page, login: Page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const txt = page.getByText('Welcome! You are now logged in')
  await expect(txt).toBeVisible()
});