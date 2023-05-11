![CI](https://github.com/nearform/hub-template/actions/workflows/ci.yml/badge.svg?event=push)

# Playwright-Firebase plugin

Tidy way to authenticate Playwright E2E tests on Firebase. 

## Basics

The main function is `playwrightFirebasePlugin` that takes in 3 parameters: Service Account (admin side), User ID, and Firebase configurations (for default app). The admin information is used to generate an admin firebase instance, and that instance is used to create a custom token. Another firebase instance is used, given the UID and Firebase configurations to sign in using that custom token, the response being an object that we can use in the session storage of the website for authentication. 

We use Playwright's fixtures to create a login function capable of handling the read/write of the session storage . This read/write feature is only for early-stage development, and will be deprecated in preference for storing the session storage in the Playwright environment. 

The login fixture interacts with the Browser environment, reading the credentials, and pushing them into the session storage.
