import { Authentication } from './plugin/Authentication';
export default function playwrightFirebasePlugin(serviceAccount, options, UID, base, version = '9.6.10') {
    return base.extend({
        UID: [UID, { option: true }],
        serviceAccount: [serviceAccount, { option: true }],
        options: [options, { option: true }],
        version: [version, { option: true }],
        auth: ({ UID, options, serviceAccount, version }, use) => use(new Authentication(UID, options, serviceAccount, version))
    });
}
