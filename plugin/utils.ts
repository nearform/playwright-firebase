import { readFileSync, writeFileSync } from 'fs'
import { User } from 'firebase/auth'

interface AuthSave {
    key: string
    value: {}
}


const formatPersistence = (user: User, apiKey: string) => {
    //nicer formatting for setting session storage with specific key & value
    const authSession = {
        key: `firebase:authUser:${apiKey}:[DEFAULT]`,
        value: user.toJSON()
    }
    return authSession
}

const saveAuth = (credentials: User, apiKey: string) => {
    const authSession: AuthSave = formatPersistence(credentials, apiKey)
    writeFileSync('./plugin/.auth/session.json', JSON.stringify(authSession), 'utf-8')
}

const readAuth = () => {
    try {
        return JSON.parse(readFileSync('./plugin/.auth/session.json').toString())
    } catch (err) {
        throw SyntaxError('Unexpected end of JSON input. Did you save the credentials?')
    }
}

export { readAuth, saveAuth, formatPersistence }