import { ServiceAccount } from "firebase-admin";
import { FirebaseOptions } from "firebase/app";
import { Page } from '@playwright/test';
export type Credentials = {
    login: Page;
    UID: string | null;
    serviceAccount: ServiceAccount | null;
    options: FirebaseOptions | null;
};
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & Credentials, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
//# sourceMappingURL=index.d.ts.map