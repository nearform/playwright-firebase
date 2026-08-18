import js from '@eslint/js'
import globals from 'globals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

// Flat-config port of the previous .eslintrc.
export default [
  {
    ignores: ['dist/**', 'cjs/**']
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.commonjs
      }
    },
    rules: {
      // All three rule sets must be spread into this single `rules` object, in
      // this order. Spreading `js.configs.recommended` at the config-object
      // level instead is silently useless: it only carries `{ name, rules }`,
      // so this `rules` key replaces it wholesale and eslint:recommended never
      // applies.
      ...js.configs.recommended.rules,
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs.recommended.rules
    }
  }
]
