[![Continuous Integration](https://github.com/nearform/playwright-firebase/actions/workflows/ci.yml/badge.svg)](https://github.com/nearform/playwright-firebase/actions/workflows/ci.yml)

# @nearform/playwright-firebase

Tidy way to authenticate Playwright E2E tests on Firebase.

Install using npm:

```bash
npm install @nearform/playwright-firebase
```

or yarn:

```bash
yarn add @nearform/playwright-firebase
```

Want to see it in action? Go to [Example](#example) to try it out!

## Contents

1. [Setup](#setup)
2. [Motivation](#motivation)
3. [Example](#example)

<a name="setup"></a>

## Setup

### Firebase environment variables

To set up this plugin you will need three sensitive environment variables in order to authenticate with Firebase. These are:

1. [Firebase Service Account](https://firebase.google.com/docs/app-distribution/authenticate-service-account)
2. [Firebase User ID](https://firebase.google.com/docs/auth/web/manage-users)
3. [Firebase Configurations](https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article)

For more information about Firebase you can read the documentation [here](https://firebase.google.com/docs/auth/web/start)

It's recommended to place these values in a `.env` file. For clarity, the Firebase User ID is often abbreviated to UID, as you will find below.

### Attaching playright-firebase as a fixture to Playwright

Playwright is based on fixtures. You have likely already used them within Playwright, they are the `{ page }` object that is passed in to `test`. More information on them [here](https://playwright.dev/docs/test-fixtures). In the very same way, we are able to add our own fixture, which we call `auth` to the tests. To do so, we need to create a setup file that will automatically run before all other tests. We will call this `auth.setup.ts`

```ts
// auth.setup.ts
import playwrightFirebasePlugin from '@nearform/playwright-firebase'
import { test as base } from '@playwright/test'

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!)
const uid = process.env.REACT_APP_UID!
const options = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)
export const test = playwrightFirebasePlugin(serviceAccount, options, uid, base)
```

Above we import the test directly from `@playwright/test` as `base` and then export a new `test` object which is identical to `base` with the addition of a fixture called `auth`. An important note is that we should now import `test` from this file instead of `@playwright/test`.

```ts
//example.spec.ts
import { expect } from '@playwright/test'
import { test } from '../auth.setup' // <----- here we import test from our auth.setup.ts.
import { Page } from '@playwright/test'

// We now access auth in exactly the same method as we do page.
test('has title', async ({ page, auth }: { page: Page; auth: any }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await auth.login(page) // <-- we need to pass in the page object here.

  const txt = await page.getByText('Welcome! You are now logged in')
  await expect(txt).toBeVisible()

  await auth.logout(page)

  await expect(txt).not.toBeVisible()
})
```

It's recommended to use `await` for your `expect` assertions after logging in/out, as the Firebase authentication is likely tied to states that require re-rendering of your application.

### TypeScript

If you're using Typescript, one small addition you'll need to make is to add the type `Credentials` to your `playwright.config.ts` such that

```ts
import { Credentials } from '@nearform/playwright-firebase'

export default defineConfig<Credentials>({
  ...
})
```

<a name="motivation"></a>

## Motivation

This package is built as a plugin for Playwright testing for the use-case of Firebase authentication. There are two methods of automating a login procedure in Playwright tests:

1. As a normal user would: inserting a real username and password into the intended fields.
2. Authenticating via the Firebase SDK directly

This plugin was developed with the 2nd method in mind as it is

- Provider agnostic: Does not need to know the specifics of the authentication provider
- A faster way of logging in, so you can focus on testing
- Better security than using a username and password.

<a name="example"></a>

## Example

Within this repo we have an `example/` folder that contains a sample React application for authenticating with the Google Provider. You'll need to setup the Firebase environment variables as described above in the setup section, but the rest is taken care of.

1. Clone this repository
2. `cd ./example`
3. `npm i`
4. `npm run start`

At this point, you should see a web server running on `localhost:3000`. If not, or any of the above steps did not execute, please raise an issue!

6. Make a `.env` file within `./example`, copy and paste over the variable names from `.env.sample` and populate them with your real Firebase environment variables
7. Run `npx playwright test`
