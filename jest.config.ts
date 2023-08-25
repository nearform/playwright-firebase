import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  testMatch: ['**/tests/**.(test).@(ts)'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}

export default config
