// Lints against the Vue style guide (https://vuejs.org/style-guide/): the
// "recommended" set includes the essential, strongly recommended and
// recommended rules.
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // __OPERATOR__ is filled in by vite.config.js at build time.
      globals: { ...globals.browser, ...globals.node, __OPERATOR__: 'readonly' },
    },
    rules: {
      // Formatting is kept compact; the style guide's structural rules still apply.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      // French texts use no-break spaces before « : ; ? » on purpose, also in template strings.
      'no-irregular-whitespace': ['error', { skipStrings: true, skipTemplates: true }],
    },
  },
]
