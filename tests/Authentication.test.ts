import { jest, describe, expect, test, beforeEach } from '@jest/globals'
import { Page } from '@playwright/test'
import { Authentication } from '../plugin/Authentication'
jest.mock('../plugin/auth.setup', () => {
  return {
    addFirebaseScript: jest.fn(),
    getToken: jest.fn()
  }
})

const TEST_UID = 'test-uid'
const TEST_OPTIONS = {}
const TEST_SERVICE_ACCOUNT = {}
const TEST_VERSION = 'ver'
const mockedEvalute = jest.fn()
const pageMock: Page = {
  evaluate: mockedEvalute
} as unknown as Page

const generateAuth = () => {
  return new Authentication(
    TEST_UID,
    TEST_OPTIONS,
    TEST_SERVICE_ACCOUNT,
    TEST_VERSION
  )
}
describe('Authentication Class tests', () => {
  beforeEach(() => {
    mockedEvalute.mockReset()
  })
  test('Authentication class initialised w/ log in/out functions', () => {
    const Auth = generateAuth()
    expect(Auth).toBeDefined()
    expect(Auth.login).toBeDefined()
    expect(Auth.logout).toBeDefined()
  })
  test('Logging in calls the evaluate function of the page', async () => {
    const Auth = generateAuth()
    await Auth.login(pageMock)
    expect(mockedEvalute).toHaveBeenCalled()
  })
  test('If user already exists, dont log in', async () => {
    const Auth = generateAuth()
    Auth.userSet = true
    await Auth.login(pageMock)
    expect(mockedEvalute).not.toHaveBeenCalled()
  })
  test('Logging out resets user', async () => {
    const Auth = generateAuth()
    Auth.userSet = true
    await Auth.logout(pageMock)
    expect(pageMock.evaluate).toHaveBeenCalled()
    expect(Auth.userSet).toBe(false)
  })
})
