import admin, { ServiceAccount } from 'firebase-admin'
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
/**
 * Sets up Admin app and Worker app. Creates a custom token with the admin app, and
 * use that in the worker app to authenticate
 */
const setupAdmin = (serviceAccount: ServiceAccount): void => {
    try {
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    } catch (err) {
        throw Error(`Cannot initialise Firebase Admin: ${err}`)
    }
}

const setupWorker = (config: FirebaseOptions): FirebaseApp => {
    try {
        const app = initializeApp(config)
        return app
    } catch (err) {
        throw Error(`Cannot initialise Firebase worker app: ${err}`)
    }

}

const getToken = async (serviceAccount: ServiceAccount, options: FirebaseOptions, uid: string) => {
    if (admin.apps?.length === 0) {
        setupAdmin(serviceAccount)
    }
    const app: FirebaseApp = setupWorker(options)
    const token: string = await admin.auth().createCustomToken(uid)
    return token
}

export { getToken }
