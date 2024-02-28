module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-floating-promises': 0,
    // 'max-len': [
    //   'warn',
    //   {
    //     'code': 80,
    //   },
    // ],
    'max-len': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'no-console': 1,
    'no-extra-boolean-cast': 0,
    'semi': 1,
    'indent': ['warn', 2],
    'quotes': ['warn', 'single'],
    'node/no-missing-import': 0,
    'node/no-unpublished-import': 0,
    '@typescript-eslint/explicit-function-return-type': ['error'],
  },
}
