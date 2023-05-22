import { ServiceAccount } from "firebase-admin"
import { FirebaseOptions } from "firebase/app"

const UID = 'test-uid'
const email = 'test-email@gmail.com'
const emailVerified = false
const isAnonymous = true
export const provider_data = {
    providerId: 'test-provider-id',
    uid: UID,
    email: email,
}
export const sts_token_manager = {
    refreshToken: 'test-refresh',
    accessToken: 'test-access',
    expirationTime: 1
}
const createdAt = "test-createdAt"
const lastLoginAt = '01-01-1998'
const appName = '[TEST_NAME]'
const API_KEY = 'test-api-key'
export interface ProviderData {
    providerId: string
    uid: string
    displayName?: string
    email: string
    phoneNumber?: string
    photoURL?: string
}

export interface TokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}


export interface UserCredentials {
    uid: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    providerData: Array<ProviderData>
    stsTokenManager: TokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
    toJSON: () => UserCredentials
}

export const DummyAuthenticatedUser: UserCredentials = {
    uid: UID,
    email: email,
    emailVerified: emailVerified,
    isAnonymous: isAnonymous,
    providerData: [provider_data],
    stsTokenManager: sts_token_manager,
    createdAt: createdAt,
    lastLoginAt: lastLoginAt,
    apiKey: API_KEY,
    appName: appName,
    toJSON: () => DummyAuthenticatedUser
}

export const dummyServiceAccount: ServiceAccount = {
    clientEmail: 'me@test',
    privateKey: 'test-key',
    projectId: 'test-project-id'
}

export { UID }

export const dummyFirebaseConfig: FirebaseOptions = {
    apiKey: API_KEY,
    authDomain: "dummy-domain",
    projectId: "test-project-id",


}