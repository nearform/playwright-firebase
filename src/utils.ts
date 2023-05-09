import admin, { ServiceAccount } from 'firebase-admin'
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth'

const setupAdmin = (serviceAccount: ServiceAccount): void => {
    try {
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    } catch (err) {
        throw Error(`Cannot initialise Firebase Admin: ${err}`)
    }
}

const setupWorker = (config: string): FirebaseApp => {
    try {
        const app = initializeApp(JSON.parse(config))
        return app
    } catch (err) {
        throw Error(`Cannot initialise Firebase worker app: ${err}`)
    }

}

const loginWithCustomToken = async (app: FirebaseApp, uid: string): Promise<any> => {
    const token = await admin.auth().createCustomToken(uid)
    const auth = getAuth(app)
    const cred = await new Promise((resolve, reject) => {
        auth.onAuthStateChanged(auth => {
            if (auth) {
                resolve(auth)
            }
        })
        signInWithCustomToken(auth, token).catch(reject)
    })
    return cred
}

const getCredentials = async (serviceAccount: ServiceAccount, config: string, uid: string) => {
    setupAdmin(serviceAccount)
    const app: FirebaseApp = setupWorker(config)
    const credentials = await loginWithCustomToken(app, uid)
    return credentials
}

export default getCredentials