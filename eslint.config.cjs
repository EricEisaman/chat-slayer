'use strict';

const gts = require('gts/build/src/index.js');
const {defineConfig} = require('eslint/config');
const globals = require('globals');

module.exports = defineConfig([
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.cjs',
      'vite.config.ts',
      'demo/vite.config.ts',
      'scripts/codemods/**',
      'src/fi/cs/**/*.test.ts',
      'src/fi/cs/**/jest.config.js',
      'src/fi/cs/**/*.tsx',
    ],
  },
  ...gts,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
      'no-useless-escape': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
        },
      ],
    },
  },
  {
    files: ['src/fi/cs/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      'prefer-const': 'warn',
      'eqeqeq': 'warn',
      'no-empty': 'warn',
      'no-useless-catch': 'warn',
    },
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: [
      'src/config/**/*.test.ts',
      'src/security/**/*.test.ts',
      'src/fi/cs/matrix/server/matrixRegistration.test.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
]);
