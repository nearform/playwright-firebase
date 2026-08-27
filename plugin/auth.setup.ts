// firebase-admin 14 removed the legacy namespaced API (the `admin` default
// export carrying `.credential`, `.apps`, `.auth()`), so this uses the modular
// entry points instead. They are also present in firebase-admin 13, which is
// why the peer range can stay `^13.0.0 || ^14.0.0`.
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import type { Page } from '@playwright/test'

/**
 * Sets up Admin app. Creates a custom token with the admin app, and
 * use that in the browser to authenticate
 */
const setupAdmin = (serviceAccount: ServiceAccount): void => {
  try {
    initializeApp({ credential: cert(serviceAccount) })
  } catch (err) {
    throw new Error(`Cannot initialise Firebase Admin: ${err}`, { cause: err })
  }
}

const getToken = async (serviceAccount: ServiceAccount, uid: string) => {
  if (getApps().length === 0) {
    setupAdmin(serviceAccount)
  }

  const token: string = await getAuth().createCustomToken(uid)
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

  // Note: Will resolve as soon as the content is injected into the frame
  // and will not wait for the scripts to be loaded in this case.
  // The above caching may or maynot work based on network conditions
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
