import { readFileSync, writeFileSync } from 'fs'




const formatPersistence = (credentials) => {
    //nicer formatting for setting session storage
    const authSession: Object = {
        persistKey: Object.keys(credentials.auth.persistenceManager.persistence.storage)[0],
        persistValue: Object.values(credentials.auth.persistenceManager.storage)[0]
    }
    return authSession
}

const writeToSessionStorage = (authSession) => {
    writeFileSync('./.auth/session.json', JSON.stringify(authSession), 'utf-8')
}

const readAuthentication = () => {
    return JSON.parse(readFileSync('./.auth/session.json',).toString())
}