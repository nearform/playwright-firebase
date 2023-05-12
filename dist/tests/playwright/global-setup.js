import { readFileSync } from "fs";
import { playwrightFirebasePlugin } from "../../index.js";
import dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });
const UID = process.env.UID;
const serviceAccount = JSON.parse(readFileSync('./serviceAccount.json').toString());
const OPTIONS = process.env.FIREBASE_CONFIG;
export default async function globalSetup(config) {
    const { baseURL } = config.projects[0].use;
    if (baseURL) {
        await playwrightFirebasePlugin(UID, serviceAccount, JSON.parse(OPTIONS));
    }
}
