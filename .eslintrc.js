module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
    rules: {
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                variables: false,
                functions: false,
            },
        ],
        'class-methods-use-this':'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/*.test.js', '**/*.test.ts', 'tests/**'],
                peerDependencies: false,
            },
        ],
        'import/no-unresolved': 'off',
        'import/extensions': [
            'error',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        'indent': ['error', 4],
        'new-cap':'off',
        'no-console': 'off',
        'no-param-reassign':'off',
        'no-redeclare':'off',
        'no-undef':'off',
        'no-underscore-dangle':'off',
        'no-use-before-define': 'off',
        'prettier/prettier': 'error',
        'prefer-destructuring':'off',
        'spaced-comment': ['error', 'always', { markers: ['/ <reference'] }],
    },
};
