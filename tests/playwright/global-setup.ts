/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import { ServiceAccount } from "firebase-admin";
import { readFileSync } from "fs";
import { playwrightFirebasePlugin } from "../../index.js";
import dotenv from 'dotenv'
import { FullConfig } from "@playwright/test";
dotenv.config({ path: '.env', override: true })
const UID = process.env.UID!
const serviceAccount: ServiceAccount = JSON.parse(readFileSync('./serviceAccount.json').toString())
const OPTIONS = process.env.FIREBASE_CONFIG!

export default async function globalSetup(config: FullConfig) {
    const { baseURL } = config.projects[0].use
    if (baseURL) {
        await playwrightFirebasePlugin(UID, serviceAccount, JSON.parse(OPTIONS))
    }
}