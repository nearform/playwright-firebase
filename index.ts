import { ServiceAccount } from "firebase-admin"
import { User } from "firebase/auth"
import getCredentials from "./plugin/auth.setup"
import { writeAuthentication } from "./plugin/utils"
import { test } from './plugin/fixtures'
const playwrightFirebaseSetup = async (uid: string, serviceAccount: ServiceAccount, options: string): Promise<void> => {
    const credentials: User = await getCredentials(serviceAccount, options, uid)
    writeAuthentication(credentials)
}

export { playwrightFirebaseSetup, test }