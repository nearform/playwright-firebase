import { ServiceAccount } from "firebase-admin"
import { FirebaseApp, FirebaseOptions } from "firebase/app"
import { getToken } from "./plugin/auth.setup.js"
import { Auth, User } from "firebase/auth"
import { Page } from '@playwright/test'

// Since these are declared in browser modules, it's hard to understand what the types should be.
// As such we're defining what shape we're expecting.
declare global {
  type Firebase = {
    getApps: () => FirebaseApp[];
    initializeApp: (config: FirebaseOptions) => FirebaseApp;
  }

  type FirebaseAuth = {
    getAuth: (app?: FirebaseApp) => Auth
    signInWithCustomToken: (auth: Auth, token: String) => Promise<User>
  }

  interface Window {
    firebase: Firebase;
    Auth: FirebaseAuth;
  }
}

export class Authentication {
    private token: string = '';
    private user: User | null = null;

    constructor(public readonly page: Page, private readonly UID: string, private readonly options: FirebaseOptions, private readonly serviceAccount: ServiceAccount) {
    }

    async addFirebaseScript(page: Page) {
        await page.addScriptTag({ url: 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js', type: 'module' })
        await page.addScriptTag({ url: 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js', type: 'module' })
        await page.addScriptTag({ path: require.resolve('./plugin/utils.js'), type: "module" })
    }
    
    async login(page: Page) {
        if (this.user) {
            console.info('User already authenticated')
            return
        }
        this.token = await getToken(this.serviceAccount, this.UID)
        await this.addFirebaseScript(page)
        await page.evaluate(async ({ token, config }) => {
            const apps = window.firebase.getApps()
            let app;
            if (apps.length >= 1) {
                app = apps[0];
            } else {
                app = window.firebase.initializeApp(config);
            }
            const auth = window.Auth.getAuth(app);
            await window.Auth.signInWithCustomToken(auth, token);
        }, { token: this.token, config: this.options })
    }
    
    async logout(page: Page) {
        this.addFirebaseScript(page)
        await page.evaluate(async () => {
            const auth = window.Auth.getAuth()
            await auth.signOut()
        })

    }
}

export type Credentials = {
    auth: Authentication
    UID: string,
    serviceAccount: ServiceAccount,
    options: FirebaseOptions
}

export default function playwrightFirebasePlugin(serviceAccount: ServiceAccount, options: FirebaseOptions, UID: string, base: any) {

    const test = base.extend({
        UID: [UID, { option: true }],
        serviceAccount: [serviceAccount, { option: true }],
        options: [options, { option: true }],
        auth: async ({ page, serviceAccount, options, UID }: { page: Page, serviceAccount: ServiceAccount, options: FirebaseOptions, UID: string }, use: any) => {
            const auth = new Authentication(page, UID, options, serviceAccount)
            await use(auth)
        },
    })
    return test
}
