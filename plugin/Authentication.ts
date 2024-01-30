import type { ServiceAccount } from 'firebase-admin'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import type { Auth, User } from 'firebase/auth'
import type { Page } from '@playwright/test'

import { addFirebaseScript, getToken } from './auth.setup.js'

// Since these are declared in browser modules, it's hard to understand what the types should be.
// As such we're defining what shape we're expecting.
declare global {
  type Firebase = {
    getApps: () => FirebaseApp[]
    initializeApp: (config: FirebaseOptions) => FirebaseApp
  }

  type FirebaseAuth = {
    getAuth: (app?: FirebaseApp) => Auth
    signInWithCustomToken: (auth: Auth, token: string) => Promise<User>
  }

  interface Window {
    firebase: Firebase
    Auth: FirebaseAuth
  }
}

export class Authentication {
  userSet = false

  constructor(
    private readonly UID: string,
    private readonly options: FirebaseOptions,
    private readonly serviceAccount: ServiceAccount,
    private version: string
  ) {}

  async login(page: Page) {
    if (this.userSet) {
      console.info('User already authenticated')
      return
    }

    const response = await fetch(
      `https://www.gstatic.com/firebasejs/${this.version}/firebase-auth.js`
    )
    if (response.status.toString().startsWith('4')) {
      throw new Error(
        'Bad Request: Please ensure your version number is correct.'
      )
    }
    const token: string = await getToken(this.serviceAccount, this.UID)
    await addFirebaseScript(page, this.version)
    try {
      await page.evaluate(
        async ({ token, config }) => {
          const apps = window.firebase.getApps()
          const app = apps.length
            ? apps[0]
            : window.firebase.initializeApp(config)
          const auth = window.Auth.getAuth(app)
          await window.Auth.signInWithCustomToken(auth, token)
        },
        { token, config: this.options }
      )
      this.userSet = true
    } catch {
      console.log('Error initialising and signing in')
    }
  }

  async logout(page: Page) {
    await addFirebaseScript(page, this.version)
    try {
      await page.evaluate(async () => {
        const auth = window.Auth.getAuth()
        await auth.signOut()
      })
      this.userSet = false
    } catch {
      console.log('Error signing out')
    }
  }
}
