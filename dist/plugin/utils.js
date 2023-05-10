import { readFileSync, writeFileSync } from 'fs';
const formatPersistence = (user, apiKey) => {
    //nicer formatting for setting session storage with specific key & value
    //Using UserImpl type instead of passing API key ascertains whether authentication has
    //console.log(user.toJSON().apiKey)
    const authSession = {
        key: `firebase:authUser:${apiKey}:[DEFAULT]`,
        value: user.toJSON()
    };
    return authSession;
};
const saveAuth = (credentials, apiKey) => {
    const authSession = formatPersistence(credentials, apiKey);
    writeFileSync('./plugin/.auth/session.json', JSON.stringify(authSession), 'utf-8');
};
const readAuth = () => {
    return JSON.parse(readFileSync('./.auth/session.json').toString());
};
export { readAuth, saveAuth, formatPersistence };
