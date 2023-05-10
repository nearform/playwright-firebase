import getCredentials from "./plugin/auth.setup.js";
import { saveAuth } from "./plugin/utils.js";
import { test } from './plugin/fixtures.js';
const playwrightFirebasePlugin = async (UID, serviceAccount, options) => {
    const credentials = await getCredentials(serviceAccount, options, UID);
    //make sure apiKey is set here
    if (options.apiKey) {
        saveAuth(credentials, options.apiKey);
    }
};
export { playwrightFirebasePlugin, test };
