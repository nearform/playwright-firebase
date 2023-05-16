import { test, expect, jest } from '@jest/globals';
import { saveAuth } from '../plugin/utils.js';
import getUser from './helpers/mock_firebase_impl.js';
const UID = 'test-uid';
const email = 'test-email@gmail.com';
const emailVerified = false;
const isAnonymous = true;
const provider_data = {
    providerId: 'test-provider-id',
    uid: UID,
    email: email,
};
const sts_token_manager = {
    refreshToken: 'test-refresh',
    accessToken: 'test-access',
    expirationTime: 1
};
const createdAt = "test-createdAt";
const lastLoginAt = '01-01-1998';
const appName = '[TEST_NAME]';
const API_KEY = 'test-api-key';
jest.mock('./helpers/mock_firebase_impl.js', () => {
    return {
        __esModule: true,
        default: jest.fn(() => {
            const userCred = {
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
                    return userCred;
                }
            };
            return userCred;
        })
    };
});
test('Session storage can be written into', async () => {
    const user = await getUser();
    console.log(user);
    if (user) {
        const authState = saveAuth(user, API_KEY);
        expect(authState.key).toBe(`firebase:authUser:${API_KEY}:[DEFAULT]`);
    }
});
