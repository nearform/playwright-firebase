import { readFileSync, writeFileSync } from 'fs'



const formatPersistence = (credentials) => {
    //nicer formatting for setting session storage with specific key & value
    const authSession = {
        key: Object.keys(credentials.auth.persistenceManager.persistence.storage)[0],
        value: Object.values(credentials.auth.persistenceManager.storage)[0]
    }
    return authSession
}

const writeAuthentication = (credentials) => {
    const authSession = formatPersistence(credentials)
    writeFileSync('./.auth/session.json', JSON.stringify(authSession), 'utf-8')
}

const readAuthentication = () => {
    return JSON.parse(readFileSync('./.auth/session.json',).toString())
}

export { readAuthentication, writeAuthentication, formatPersistence }