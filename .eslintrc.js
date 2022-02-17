module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
  ],
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:@typescript-eslint/recommended',
  ],
  'rules': {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-style': [2, 'last'],
    'consistent-return': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': [2, 'unix'],
    'no-else-return': 2,
    'object-curly-spacing': 'off', // disable in favor of typescript-eslint/object-curly-spacing
    'prefer-const': 1,
    'quotes': ['error', 'single'],
    'semi': 'off', // disable in favor of typescript-eslint/semi
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }],
  },
};
