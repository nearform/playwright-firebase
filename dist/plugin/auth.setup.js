import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
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
const getToken = async (serviceAccount, options, uid) => {
    if (admin.apps?.length === 0) {
        setupAdmin(serviceAccount);
    }
    const app = setupWorker(options);
    const token = await admin.auth().createCustomToken(uid);
    return token;
};
export { getToken };
