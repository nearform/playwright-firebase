import getCredentials from "../../plugin/auth.setup.js"
import dotenv from 'dotenv'
dotenv.config({ path: '.env', override: true })
import { readFileSync } from "fs"
import { User } from "firebase/auth"
import { ServiceAccount } from "firebase-admin"
const UID = process.env.UID
const SERVICE_ACCOUNT: ServiceAccount = JSON.parse(readFileSync('./serviceAccount.json').toString())
const OPTIONS = process.env.FIREBASE_CONFIG



export async function getUser(): Promise<User | undefined> {
    if (OPTIONS && UID) {
        return await getCredentials(SERVICE_ACCOUNT, JSON.parse(OPTIONS), UID)

    }
    throw Error('Unable to access .env')

}

