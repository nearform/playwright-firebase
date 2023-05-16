import admin, { ServiceAccount } from 'firebase-admin'
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, signInWithCustomToken, Auth, User } from 'firebase/auth'
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

const loginWithCustomToken = async (app: FirebaseApp, uid: string): Promise<User> => {
    const token: string = await admin.auth().createCustomToken(uid)
    const auth: Auth = getAuth(app)
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                resolve(user)
            }
        })
        signInWithCustomToken(auth, token).catch(reject)
    })
}
const logOut = async (app: FirebaseApp): Promise<void> => {
    const auth: Auth = getAuth(app)
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((auth) => {
            if (!auth) {
                console.log(typeof (auth))
                resolve()
            }

        })
        auth.signOut().catch(reject)
    })
}

const getCredentials = async (serviceAccount: ServiceAccount, options: FirebaseOptions, uid: string) => {
    setupAdmin(serviceAccount)
    const app: FirebaseApp = setupWorker(options)
    const credentials: User = await loginWithCustomToken(app, uid)
    return credentials
}

export { logOut, getCredentials }
