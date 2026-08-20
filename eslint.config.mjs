import js from '@eslint/js'
import globals from 'globals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

// Flat-config port of the previous .eslintrc.
export default [
  {
    // `example/` is a self-contained CRA app with its own `eslintConfig`
    // (`react-app`, `react-app/jest`) in example/package.json, so the root
    // ruleset was never meant to apply to it. Ignoring it here also makes this
    // config's scope match `npm run lint` (`eslint "*.{ts,tsx}"`) and CI.
    ignores: ['dist/**', 'cjs/**', 'example/**']
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
  },
  {
    // The old .eslintrc had no `overrides`, so eslint:recommended applied to
    // every linted file regardless of extension. The block above is scoped to
    // ts/tsx, so this keeps the plain-JS files the repo tracks
    // (babel.config.cjs, this file) covered by the same core rule set.
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  }
]
