/* eslint no-undef: 0 */

import { ServiceAccount } from "firebase-admin"
import { FirebaseOptions } from "firebase/app"
import { getCredentials } from "./plugin/auth.setup.js"
import { formatAuth } from "./plugin/utils.js"
import { User } from "firebase/auth"
import { test as base, Page } from '@playwright/test'

interface AuthSave {
    key: string
    value: object
}


export type Credentials = {
    login: Page
    UID: string | null,
    serviceAccount: ServiceAccount | null,
    options: FirebaseOptions | null
}


export default function playwrightFirebasePlugin(serviceAccount: ServiceAccount, options: FirebaseOptions, UID: string, base: any) {
    const test = base.extend({
        UID: [UID, { option: true }],
        serviceAccount: [serviceAccount, { option: true }],
        options: [options, { option: true }],
        login: async ({ page, serviceAccount, options, UID, baseURL }: { page: Page, serviceAccount: ServiceAccount, options: FirebaseOptions, UID: string, baseURL: string }, use: any) => {
            if (serviceAccount && options?.apiKey && UID && baseURL) {
                await page.goto(baseURL)
                const credentials: User = await getCredentials(serviceAccount, options, UID)
                const authSession: AuthSave = formatAuth(credentials, options.apiKey)
                await page.evaluate(async auth => {
                    sessionStorage.setItem(auth.key, JSON.stringify(auth.value))
                }, authSession)
            } else {
                throw new Error('Missing one of the following: Service Account, options, UID or baseURL in config file')
            }
            use(page)
        },
    })
    return test
}
// export const test = base.extend<Credentials>({

//     UID: [null, { option: true }],
//     serviceAccount: [null, { option: true }],
//     options: [null, { option: true }],
//     login: async ({ page, serviceAccount, options, UID, baseURL }, use) => {
//         if (serviceAccount && options?.apiKey && UID && baseURL) {
//             await page.goto(baseURL)
//             const credentials: User = await getCredentials(serviceAccount, options, UID)
//             const authSession: AuthSave = formatAuth(credentials, options.apiKey)
//             await page.evaluate(async auth => {
//                 sessionStorage.setItem(auth.key, JSON.stringify(auth.value))
//             }, authSession)
//         } else {
//             throw new Error('Missing one of the following: Service Account, options, UID or baseURL in config file')
//         }
//         use(page)
//     },
// })
