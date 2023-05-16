const saveAuth = (user, apiKey) => {
    //nicer formatting for setting session storage with specific key & value
    const authSession = {
        key: `firebase:authUser:${apiKey}:[DEFAULT]`,
        value: user.toJSON()
    };
    return authSession;
};
export { saveAuth };
