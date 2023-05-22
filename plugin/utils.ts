import { User } from 'firebase/auth'
import { UserCredentials } from '../tests/helpers/authentication.js'

interface AuthSave {
    key: string
    value: object
}

const formatAuth = (user: User | UserCredentials, apiKey: string): AuthSave => {
    //nicer formatting for setting session storage with specific key & value
    const authSession = {
        key: `firebase:authUser:${apiKey}:[DEFAULT]`,
        value: user.toJSON()
    }
    return authSession
}
export { formatAuth }