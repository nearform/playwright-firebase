import admin, { ServiceAccount } from 'firebase-admin'
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

export { getToken }
