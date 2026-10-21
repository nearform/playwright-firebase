// Mints a real custom token through the built plugin, with whichever
// firebase-admin is installed. The jest suites mock firebase-admin, so this is
// what catches an incompatible major. It needs no network and no Firebase
// project: a custom token is signed locally with the key below.
import { generateKeyPairSync } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { getToken } from '../../dist/plugin/auth.setup.js'

// firebase-admin's `exports` does not expose its package.json.
const { version } = JSON.parse(
  readFileSync(
    new URL('../../node_modules/firebase-admin/package.json', import.meta.url),
    'utf8'
  )
)

const { privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' }
})

const token = await getToken(
  {
    projectId: 'smoke-test',
    clientEmail: 'smoke@smoke-test.iam.gserviceaccount.com',
    privateKey
  },
  'smoke-uid'
)

const claims = JSON.parse(
  Buffer.from(token.split('.')[1], 'base64url').toString()
)
if (claims.uid !== 'smoke-uid') {
  throw new Error(`unexpected token claims: ${JSON.stringify(claims)}`)
}
console.log(
  `firebase-admin ${version}: minted a custom token for ${claims.uid}`
)
