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
    ...js.configs.recommended,
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.commonjs
      }
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs.recommended.rules
    }
  }
]
