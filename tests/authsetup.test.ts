import { jest, describe, expect, test, beforeEach } from '@jest/globals'
import { ServiceAccount } from 'firebase-admin'
import { getToken, addFirebaseScript } from '../plugin/auth.setup'
const TEST_UID = 'uid'
const mockServiceAccount: ServiceAccount =
  jest.fn() as unknown as ServiceAccount
const mockInitializeApp = jest.fn()
const mockCreateCustomToken = jest.fn()
const mockAdmin = {
  initializeApp: mockInitializeApp,
  apps: [],
  auth: jest.fn(() => {
    return {
      createCustomToken: mockCreateCustomToken
    }
  })
}
jest.mock('firebase-admin', () => ({
  __esModule: true,
  default: mockAdmin,
  ServiceAccount: mockServiceAccount
}))
describe('auth.setup tests', () => {
  describe('getToken', () => {
    test('Calls the initializeApp function', async () => {
      await getToken(mockServiceAccount, TEST_UID)
      expect(mockInitializeApp).toHaveBeenCalled()
    })
  })
})
