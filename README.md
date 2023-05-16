![CI](https://github.com/nearform/hub-template/actions/workflows/ci.yml/badge.svg?event=push)

# Playwright-Firebase plugin

Tidy way to authenticate Playwright E2E tests on Firebase. 

## Basics

A simple export of test that includes the operation to authenticate with Firebase, given the Service Account, UID, and Firebase options.  We use Playwright's fixtures to create a `login` function that will sign in with a custom token. For the session storage to be written in, `login` automatically goes to the base url, and fills the session storage with the credentials. 

## Example

```
//playwright.config.ts
...
projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        UID: your-uid, //string
        serviceAccount: your-service-account, //type: Service Account
        options: your-firebase-options //type: FirebaseOptions
      },
    },
 ...

```
Here we pass in the necessary constants into Playwright's fixtures. This can be detected by the `login` function. 
Then we use the new `test` from the `playwright-firebase` package.
```
//example.spec.ts

import { test } from 'playwright-firebase'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test('Login sets the session state', async ({ page, login }): Promise<void> => {
  await login
  ...
})

```
We're still working to resolve typescript errors. 
