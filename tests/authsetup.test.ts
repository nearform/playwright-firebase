import { jest, describe, expect, test, afterEach } from '@jest/globals'
import { ServiceAccount } from 'firebase-admin'
import { getToken } from '../plugin/auth.setup'
import admin from 'firebase-admin'
import { app } from 'firebase-admin'
const TEST_UID = 'uid'
const TEST_TOKEN = 'token'
const mockServiceAccount: ServiceAccount =
  jest.fn() as unknown as ServiceAccount
const mockApp = {} as unknown as app.App

jest.mock('firebase-admin', () => {
  return {
    auth: jest.fn(() => {
      return { createCustomToken: jest.fn(() => Promise.resolve(TEST_TOKEN)) }
    }),
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn()
    },

    apps: [],
    app: jest.fn(() => {
      return { delete: jest.fn() }
    })
  }
})
describe('auth.setup tests', () => {
  describe('getToken', () => {
    jest.spyOn(admin, 'initializeApp').mockImplementation(() => {
      admin.apps.push(mockApp)
      return mockApp
    })
    jest.spyOn(admin, 'app').mockImplementation(() => {
      return {
        delete: jest.fn(() => admin.apps.pop())
      } as unknown as app.App
    })
    afterEach(() => {
      jest.clearAllMocks()
      admin.app().delete()
    })

    test('Calls the initializeApp function', async () => {
      expect(admin.apps.length).toBe(0)
      const token = await getToken(mockServiceAccount, TEST_UID)
      expect(admin.initializeApp).toHaveBeenCalled()
      expect(admin.apps.length).toBe(1)
      expect(token).toBe(TEST_TOKEN)
    })
    test('If app is already present', async () => {
      expect(admin.apps.length).toBe(0)
      admin.apps.push(mockApp)
      await getToken(mockServiceAccount, TEST_UID)
      expect(admin.initializeApp).not.toHaveBeenCalled()
    })
  })
})
