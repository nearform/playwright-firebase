![CI](https://github.com/nearform/hub-template/actions/workflows/ci.yml/badge.svg?event=push)

# Playwright-Firebase plugin

Tidy way to authenticate Playwright E2E tests on Firebase. 

## Installation

In order to install this package into your playwright project use `npm install @nearform/playwright-firebase` or `yarn add @nearform-firebase`

## Commands
- `auth.login(page)` : logs in
- `auth.logout(page)`: logs out

## Setup

### TypeScript

If you're using Typescript, one small addition you'll need to make is to add the type `Credentials` to your `playwright.config.ts` such that
```
import {Credentials} from '@nearform/playwright-firebase'
export default defineConfig<Credentials>({
  ...
  })
```

Create a setup file that is ran before all tests, where we'll redefine test, so you can import it from your setup file with the `auth` fixture added.
```
// auth.setup.ts
import playwrightFirebasePlugin from '@nearform/playwright-firebase'
import { test as base } from '@playwright/test'

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!)
const uid = process.env.REACT_APP_UID!
const options = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)
export const test = playwrightFirebasePlugin(serviceAccount, options, uid, base)
```

The default Firebase version used is `9.6.10`. In order to change this you can pass the version into the `playwrightFirebasePlugin` function as an optional fifth argument:
```
playwrightFirebasePlugin(serviceAccount, options, uid, base, version)
```

Where your secrets are stored in a `.env` file. Make sure to **NOT COMMIT THIS FILE**. 
Now, by using the new `test` we can incorporate the `auth` generated from the package.
```
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
```

