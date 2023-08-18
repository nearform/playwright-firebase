import admin, { ServiceAccount } from 'firebase-admin'
import type { Page } from '@playwright/test'

/**
 * Sets up Admin app. Creates a custom token with the admin app, and
 * use that in the browser to authenticate
 */
const setupAdmin = (serviceAccount: ServiceAccount): void => {
  try {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  } catch (err) {
    throw Error(`Cannot initialise Firebase Admin: ${err}`)
  }
}

const getToken = async (serviceAccount: ServiceAccount, uid: string) => {
  if (admin.apps?.length === 0) {
    setupAdmin(serviceAccount)
  }

  const token: string = await admin.auth().createCustomToken(uid)
  return token
}

async function addFirebaseScript(page: Page, version: string) {
  await page.addScriptTag({
    url: `https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`,
    type: 'module'
  })
  await page.addScriptTag({
    url: `https://www.gstatic.com/firebasejs/${version}/firebase-app.js`,
    type: 'module'
  })
  await page.addScriptTag({
    content: `
        import * as Auth from 'https://www.gstatic.com/firebasejs/${version}/firebase-auth.js';
        import * as firebase from 'https://www.gstatic.com/firebasejs/${version}/firebase-app.js';
        window.Auth = Auth;
        window.firebase = firebase;
      `,
    type: 'module'
  })
}

export { getToken, addFirebaseScript }
