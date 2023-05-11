import { ServiceAccount } from "firebase-admin";
import { readFileSync } from "fs";
import { playwrightFirebasePlugin } from "../../index.js";
import dotenv from 'dotenv'
import { FullConfig, chromium } from "@playwright/test";
dotenv.config({ path: '.env', override: true })
const UID = process.env.UID!
const serviceAccount: ServiceAccount = JSON.parse(readFileSync('./serviceAccount.json').toString())
const OPTIONS = process.env.FIREBASE_CONFIG!

export default async function globalSetup(config: FullConfig) {
    const { baseURL } = config.projects[0].use
    const browser = await chromium.launch()
    const page = await browser.newPage()
    if (baseURL) {
        await page.goto(baseURL)
        console.log('GONE TO PAGE')
        await playwrightFirebasePlugin(UID, serviceAccount, JSON.parse(OPTIONS))
    }
}