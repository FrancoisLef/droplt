module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  plugins: ['simple-import-sort', 'import', 'sort-destructure-keys'],
  root: true,
  rules: {
    curly: 'warn',
    'import/default': 'error',
    'import/first': 'warn',
    'import/named': 'error',
    'import/newline-after-import': 'warn',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowObject: true,
      },
    ],
    'import/no-duplicates': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            message: 'Please import from styled-components/macro.',
            name: 'styled-components',
          },
        ],
        patterns: ['!styled-components/macro'],
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        noSortAlphabetically: false,
      },
    ],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 'warn',
  },
  settings: {
    'import/ignore': ['node_modules'],
  },
};