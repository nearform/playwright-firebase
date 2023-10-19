import playwrightFirebasePlugin from '../../index'
import { test as base } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!)
const uid = process.env.REACT_APP_UID!
const options = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)
export const test = playwrightFirebasePlugin(serviceAccount, options, uid, base)
