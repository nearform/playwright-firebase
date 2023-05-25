import admin, { ServiceAccount } from 'firebase-admin'
import { FirebaseOptions } from 'firebase/app';
/**
 * Sets up Admin appp. Creates a custom token with the admin app, and
 * use that in the browser to authenticate
 */
const setupAdmin = (serviceAccount: ServiceAccount): void => {
    try {
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    } catch (err) {
        throw Error(`Cannot initialise Firebase Admin: ${err}`)
    }
}

const getToken = async (serviceAccount: ServiceAccount, options: FirebaseOptions, uid: string) => {
    if (admin.apps?.length === 0) {
        setupAdmin(serviceAccount)
    }
    const token: string = await admin.auth().createCustomToken(uid)
    return token
}

export { getToken }
