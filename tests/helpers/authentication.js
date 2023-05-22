"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyFirebaseConfig = exports.UID = exports.dummyServiceAccount = exports.DummyAuthenticatedUser = exports.sts_token_manager = exports.provider_data = void 0;
const UID = 'test-uid';
exports.UID = UID;
const email = 'test-email@gmail.com';
const emailVerified = false;
const isAnonymous = true;
exports.provider_data = {
    providerId: 'test-provider-id',
    uid: UID,
    email: email,
};
exports.sts_token_manager = {
    refreshToken: 'test-refresh',
    accessToken: 'test-access',
    expirationTime: 1
};
const createdAt = "test-createdAt";
const lastLoginAt = '01-01-1998';
const appName = '[TEST_NAME]';
const API_KEY = 'test-api-key';
exports.DummyAuthenticatedUser = {
    uid: UID,
    email: email,
    emailVerified: emailVerified,
    isAnonymous: isAnonymous,
    providerData: [exports.provider_data],
    stsTokenManager: exports.sts_token_manager,
    createdAt: createdAt,
    lastLoginAt: lastLoginAt,
    apiKey: API_KEY,
    appName: appName,
    toJSON: () => exports.DummyAuthenticatedUser
};
exports.dummyServiceAccount = {
    clientEmail: 'me@test',
    privateKey: 'test-key',
    projectId: 'test-project-id'
};
exports.dummyFirebaseConfig = {
    apiKey: API_KEY,
    authDomain: "dummy-domain",
    projectId: "test-project-id",
};
