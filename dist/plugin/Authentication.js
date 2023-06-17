import { addFirebaseScript, getToken } from './auth.setup.js';
export class Authentication {
    UID;
    options;
    serviceAccount;
    version;
    user = null;
    constructor(UID, options, serviceAccount, version) {
        this.UID = UID;
        this.options = options;
        this.serviceAccount = serviceAccount;
        this.version = version;
    }
    async login(page) {
        if (this.user) {
            console.info('User already authenticated');
            return;
        }
        const token = await getToken(this.serviceAccount, this.UID);
        await addFirebaseScript(page, this.version);
        await page.evaluate(async ({ token, config }) => {
            const apps = window.firebase.getApps();
            const app = apps.length
                ? apps[0]
                : window.firebase.initializeApp(config);
            const auth = window.Auth.getAuth(app);
            await window.Auth.signInWithCustomToken(auth, token);
        }, { token, config: this.options });
    }
    async logout(page) {
        await addFirebaseScript(page, this.version);
        await page.evaluate(async () => {
            const auth = window.Auth.getAuth();
            await auth.signOut();
        });
    }
}
