import { test, expect, jest } from '@jest/globals'
import { saveAuth } from '../plugin/utils.js'
import { readFileSync, writeFileSync } from 'fs'
import { User } from 'firebase/auth'
import getUser from './helpers/mock_firebase_impl.js'

const UID = 'test-uid'
const email = 'test-email@gmail.com'
const emailVerified = false
const isAnonymous = true
const provider_data = {
    providerId: 'test-provider-id',
    uid: UID,
    email: email,
}
const sts_token_manager = {
    refreshToken: 'test-refresh',
    accessToken: 'test-access',
    expirationTime: 1
}
const createdAt = "test-createdAt"
const lastLoginAt = '01-01-1998'
const appName = '[TEST_NAME]'
const API_KEY = 'test-api-key'
interface ProviderData {
    providerId: string
    uid: string
    displayName?: string
    email: string
    phoneNumber?: string
    photoURL?: string
}

interface TokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}


interface UserCredentials {
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

jest.mock('./helpers/mock_firebase_impl.js', () => {
    return {
        __esModule: true,
        default: jest.fn(() => {
            const userCred: UserCredentials = {
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
                toJSON: () => {
                    return userCred
                }
            }
            return userCred
        })
    }
})

test('Session storage can be written into', async () => {
    const user: User | undefined = await getUser()
    console.log(user)
    if (user) {
        console.log(user)
        saveAuth(user, API_KEY)
    }
    const authState = JSON.parse(readFileSync('./plugin/.auth/session.json').toString())
    expect(authState.key).toBe(`firebase:authUser:${API_KEY}:[DEFAULT]`)
    expect(authState.value.uid).toBe(UID)
    expect(authState.value.providerData[0].email).toBe(email)
    expect(authState.value.stsTokenManager.accessToken).toBe(sts_token_manager.accessToken)
    writeFileSync('./plugin/.auth/session.json', '')
})


