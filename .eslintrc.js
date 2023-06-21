module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: [0, 2, { SwitchCase: 1 }],
    semi: [2, 'never'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ],
    'multiline-ternary': ['off'],
    'spaced-comment': 'off',
    'react/jsx-no-comment-textnodes': 'off',
    'no-trailing-spaces': ['error', { skipBlankLines: true }]
  },
  ignorePatterns: ['node_modules/*']
}
