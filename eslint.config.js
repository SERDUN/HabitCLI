import {defineConfig} from 'eslint/config';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import globals from 'globals';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        plugins: {js},
        extends: ['js/recommended'],
        rules: {
            'no-unused-vars': ['error', {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            }],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
        },
    },
    {
        files: ['**/*.json'],
        plugins: {json},
        language: 'json/json',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.md'],
        plugins: {markdown},
        language: 'markdown/gfm',
        extends: ['markdown/recommended'],
    },
]);
