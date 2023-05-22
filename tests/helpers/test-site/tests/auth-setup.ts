import { FullConfig } from "@playwright/test";
import playwrightFirebasePlugin from "../../../../index";
import { test as base } from '@playwright/test'
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(readFileSync('./serviceAccount.json').toString())
const uid = process.env.REACT_APP_UID!
const options = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)
export const test = playwrightFirebasePlugin(serviceAccount, options, uid, base)

