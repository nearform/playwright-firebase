import {
  jest,
  describe,
  expect,
  test,
  beforeEach,
  afterEach
} from '@jest/globals'
import { Page } from '@playwright/test'
import * as authSetup from '../plugin/auth.setup'

import { Authentication } from '../plugin/Authentication'

const TEST_UID = 'test-uid'
const TEST_OPTIONS = {}
const TEST_SERVICE_ACCOUNT = {}
const TEST_VERSION = 'ver'
const mockedStatusCode = jest.fn()

const mockedEvalute = jest.fn()
const mockedAddScriptTag = jest.fn()
const pageMock: Page = {
  evaluate: mockedEvalute,
  addScriptTag: mockedAddScriptTag
} as unknown as Page

const generateAuth = () => {
  return new Authentication(
    TEST_UID,
    TEST_OPTIONS,
    TEST_SERVICE_ACCOUNT,
    TEST_VERSION
  )
}
const mockedResponse = () =>
  Promise.resolve({
    status: mockedStatusCode()
  } as Response)

describe('Authentication Class tests', () => {
  beforeEach(() => {
    // mockedEvalute.mockReset()
    jest.spyOn(authSetup, 'getToken').mockReturnValue(Promise.resolve('hello'))
    jest.spyOn(global, 'fetch').mockImplementation(mockedResponse)
    mockedStatusCode.mockReturnValue(200)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  test('Authentication class initialised w/ log in/out functions', () => {
    const Auth = generateAuth()
    expect(Auth).toBeDefined()
    expect(Auth.login).toBeDefined()
    expect(Auth.logout).toBeDefined()
  })
  test('Logging in calls the evaluate function of the page + addScriptTag', async () => {
    const Auth = generateAuth()
    await Auth.login(pageMock)
    expect(mockedEvalute).toHaveBeenCalled()
    expect(mockedAddScriptTag).toHaveBeenCalledTimes(3)
  })
  test('Bad version number throws', async () => {
    mockedStatusCode.mockReturnValue(400)
    const Auth = generateAuth()
    expect(async () => {
      await Auth.login(pageMock)
    }).rejects.toThrowError()
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
