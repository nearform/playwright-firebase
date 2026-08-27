import { jest, describe, expect, test, afterEach } from '@jest/globals'
import type { ServiceAccount } from 'firebase-admin/app'
import { deleteApp, getApps, initializeApp } from 'firebase-admin/app'
import { getToken } from '../plugin/auth.setup'

const TEST_UID = 'uid'
const TEST_TOKEN = 'token'
const mockServiceAccount: ServiceAccount =
  jest.fn() as unknown as ServiceAccount

// firebase-admin 14 dropped the namespaced `admin` default export, so the app
// registry is mocked through the modular `firebase-admin/app` entry point. The
// registry array lives inside the factory: jest.mock is hoisted above the
// imports, so a module-scope `const` would still be in its TDZ when the factory
// runs.
jest.mock('firebase-admin/app', () => {
  const apps: unknown[] = []
  return {
    initializeApp: jest.fn(() => {
      const app = {}
      apps.push(app)
      return app
    }),
    getApps: jest.fn(() => apps),
    deleteApp: jest.fn(() => {
      apps.length = 0
    }),
    cert: jest.fn()
  }
})

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    createCustomToken: jest.fn(() => Promise.resolve(TEST_TOKEN))
  }))
}))

describe('auth.setup tests', () => {
  describe('getToken', () => {
    afterEach(() => {
      jest.clearAllMocks()
      deleteApp(getApps()[0])
    })

    test('Calls the initializeApp function', async () => {
      expect(getApps().length).toBe(0)
      const token = await getToken(mockServiceAccount, TEST_UID)
      expect(initializeApp).toHaveBeenCalled()
      expect(getApps().length).toBe(1)
      expect(token).toBe(TEST_TOKEN)
    })
    test('If app is already present', async () => {
      expect(getApps().length).toBe(0)
      initializeApp()
      jest.clearAllMocks()
      await getToken(mockServiceAccount, TEST_UID)
      expect(initializeApp).not.toHaveBeenCalled()
    })
  })
})
