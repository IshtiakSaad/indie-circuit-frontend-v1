module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals'
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: { 'prettier/prettier': ['error'], 'react/react-in-jsx-scope': 'off' },
  settings: {
    'import/resolver': { typescript: { project: './tsconfig.json' } },
  },
};
