/* eslint no-undef: 0 */
/* eslint @typescript-eslint/ban-ts-comment: 0 */
/* eslint  @typescript-eslint/no-explicit-any: 0 */

import { ServiceAccount } from "firebase-admin"
import { FirebaseOptions } from "firebase/app"
import { getToken } from "./plugin/auth.setup.js"
import { User } from "firebase/auth"
import { Page, } from '@playwright/test'

export class Authentication {
    private readonly UID: string;
    private readonly options: FirebaseOptions;
    private readonly serviceAccount: ServiceAccount;
    private token: string
    private user: User | null
    constructor(public readonly page: Page, UID: string, options: FirebaseOptions, serviceAccount: ServiceAccount) {
        this.UID = UID
        this.options = options
        this.serviceAccount = serviceAccount
        this.user = null
        this.token = ''
        // this.page = page
    }
    async addFirebaseScript(page: Page) {
        await page.addScriptTag({ url: 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js', type: 'module' })
        await page.addScriptTag({ url: 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js', type: 'module' })
        await page.addScriptTag({ path: require.resolve('./plugin/utils.js'), type: "module" })
        //until import(..) works with page.evaluate, this will have to be the work around.
    }
    async login(page: Page) {
        if (this.user) {
            console.log('User already authenticated')
            return
        }
        this.token = await getToken(this.serviceAccount, this.options, this.UID)
        await this.addFirebaseScript(page)
        await page.evaluate(async ({ token, config }) => {
            // @ts-ignore
            const apps = firebase.getApps()
            let app;
            if (apps.length >= 1) {
                app = apps[0];
            } else {
                // @ts-ignore
                app = firebase.initializeApp(config);
            }
            // @ts-ignore
            const auth = Auth.getAuth(app);
            // @ts-ignore
            await Auth.signInWithCustomToken(auth, token);
        }, { token: this.token, config: this.options })
    }
    async logout(page: Page) {
        this.addFirebaseScript(page)
        await page.evaluate(async () => {
            // @ts-ignore
            const auth = Auth.getAuth()
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