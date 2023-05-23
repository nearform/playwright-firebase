/* eslint no-undef: 0 */

import { ServiceAccount } from "firebase-admin"
import { FirebaseApp, FirebaseOptions } from "firebase/app"
import { getCredentials, logOut } from "./plugin/auth.setup.js"
import { formatAuth } from "./plugin/utils.js"
import { User } from "firebase/auth"
import { TestType, Page, PlaywrightTestArgs, PlaywrightWorkerArgs, PlaywrightTestOptions, PlaywrightWorkerOptions } from '@playwright/test'
import { createConfigItem } from "@babel/core"
import { sign } from "crypto"

interface AuthSave {
    key: string
    value: object
}
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
    async login(page: Page) {
        if (this.user) {
            return
        }
        await page.goto('/')
        this.token = await getCredentials(this.serviceAccount, this.options, this.UID)
        await page.evaluate(async () => {
            const { getAuth, signInWithCustomToken } = await import("https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js");
            const { getApps, initializeApp } = await import("https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js");
        })
        await page.evaluate(async ({ token, config }) => {
            const apps = getApps();
            let app;
            if (apps.length >= 1) {
                app = apps[0];
            } else {
                app = initializeApp(config);
            }
            const auth = getAuth(app);
            await signInWithCustomToken(auth, token);
        }, { token: this.token, config: this.options })
    }
    async logout(page: Page) {

    }
}

export type Credentials = {
    auth: Authentication
    UID: string,
    serviceAccount: ServiceAccount,
    options: FirebaseOptions
}

export default function playwrightFirebasePlugin(serviceAccount: ServiceAccount, options: FirebaseOptions, UID: string, base: TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>) {

    const test = base.extend<Credentials>({
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