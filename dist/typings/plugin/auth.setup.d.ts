import { ServiceAccount } from 'firebase-admin';
import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
declare const logOut: (app: FirebaseApp) => Promise<Auth | null>;
declare const getCredentials: (serviceAccount: ServiceAccount, options: FirebaseOptions, uid: string) => Promise<User>;
export { logOut, getCredentials };
//# sourceMappingURL=auth.setup.d.ts.map