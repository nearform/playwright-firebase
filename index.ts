import { ServiceAccount } from "firebase-admin"
import { User } from "firebase/auth"
import { FirebaseOptions } from "firebase/app"
import getCredentials from "./plugin/auth.setup.js"
import { saveAuth } from "./plugin/utils.js"
import { test } from './plugin/fixtures.js'
const playwrightFirebasePlugin = async (UID: string, serviceAccount: ServiceAccount, options: FirebaseOptions): Promise<void> => {
    const credentials: User = await getCredentials(serviceAccount, options, UID)
    //make sure apiKey is set here
    if (options.apiKey) {
        saveAuth(credentials, options.apiKey)
    }
}

export { playwrightFirebasePlugin, test }