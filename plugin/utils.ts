import { User } from 'firebase/auth'

interface AuthSave {
    key: string
    value: object
}

const saveAuth = (user: User, apiKey: string): AuthSave => {
    //nicer formatting for setting session storage with specific key & value
    const authSession = {
        key: `firebase:authUser:${apiKey}:[DEFAULT]`,
        value: user.toJSON()
    }
    return authSession
}
export { saveAuth }