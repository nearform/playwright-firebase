import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
/**
 * Sets up Admin app and Worker app. Creates a custom token with the admin app, and
 * use that in the worker app to authenticate
 */
const setupAdmin = (serviceAccount) => {
    try {
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }
    catch (err) {
        throw Error(`Cannot initialise Firebase Admin: ${err}`);
    }
};
const setupWorker = (config) => {
    try {
        const app = initializeApp(config);
        return app;
    }
    catch (err) {
        throw Error(`Cannot initialise Firebase worker app: ${err}`);
    }
};
const loginWithCustomToken = async (app, uid) => {
    const token = await admin.auth().createCustomToken(uid);
    const auth = getAuth(app);
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            }
        });
        signInWithCustomToken(auth, token).catch(reject);
    });
};
const getCredentials = async (serviceAccount, options, uid) => {
    setupAdmin(serviceAccount);
    const app = setupWorker(options);
    const credentials = await loginWithCustomToken(app, uid);
    return credentials;
};
export default getCredentials;
