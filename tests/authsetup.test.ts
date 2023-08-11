import { jest, describe, expect, test } from '@jest/globals'
import { ServiceAccount } from 'firebase-admin'
import { getToken } from '../plugin/auth.setup'
import * as admin from 'firebase-admin'
import { app } from 'firebase-admin'
import { Auth } from 'firebase-admin/lib/auth/auth'
const TEST_UID = 'uid'
const mockServiceAccount: ServiceAccount =
  jest.fn() as unknown as ServiceAccount
const mockApp = jest.fn() as unknown as app.App
const mockedAuth = jest.fn() as unknown as Auth
const mockedCreateCustomToken = jest.fn()
const secondMockAuth = jest.fn(() => {
  return {
    createCustomToken: mockedCreateCustomToken()
  } as unknown as Auth
})
const secondMockApp = jest.fn(() => {
  return {} as unknown as app.App
})
jest.spyOn(admin, 'initializeApp').mockReturnValueOnce(secondMockApp())
jest.spyOn(admin, 'auth').mockReturnValue(secondMockAuth())
describe('auth.setup tests', () => {
  describe('getToken', () => {
    test('Calls the initializeApp function', async () => {
      await getToken(mockServiceAccount, TEST_UID)
      expect(admin.initializeApp).toHaveBeenCalled()
      expect(admin.auth().createCustomToken).toHaveBeenCalledWith(TEST_UID)
    })
    test('If app is already present', async () => {
      await getToken(mockServiceAccount, TEST_UID)
      expect(admin.initializeApp).not.toHaveBeenCalled()
      expect(admin.auth().createCustomToken).toHaveBeenCalled()
    })
  })
})
