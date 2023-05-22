import { ServiceAccount } from "firebase-admin";
import { FirebaseOptions } from "firebase/app";
declare const UID = "test-uid";
export declare const provider_data: {
    providerId: string;
    uid: string;
    email: string;
};
export declare const sts_token_manager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
};
export interface ProviderData {
    providerId: string;
    uid: string;
    displayName?: string;
    email: string;
    phoneNumber?: string;
    photoURL?: string;
}
export interface TokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}
export interface UserCredentials {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: Array<ProviderData>;
    stsTokenManager: TokenManager;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
    toJSON: () => UserCredentials;
}
export declare const DummyAuthenticatedUser: UserCredentials;
export declare const dummyServiceAccount: ServiceAccount;
export { UID };
export declare const dummyFirebaseConfig: FirebaseOptions;
//# sourceMappingURL=authentication.d.ts.map