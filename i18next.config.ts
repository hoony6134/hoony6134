import { defineConfig } from 'i18next-cli';

import { LANGUAGES } from '@/common/lib';

export default defineConfig({
  locales: [...LANGUAGES],

  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'src/locales/{{language}}/{{namespace}}.json',

    defaultNS: '_',
    nsSeparator: ':',
    keySeparator: '.',

    removeUnusedKeys: true,
    sort: true,
    indentation: 2,

    functions: ['t', '*.t'],
    transComponents: ['Trans'],
    useTranslationNames: ['useTranslation'],

    primaryLanguage: 'ko',
    secondaryLanguages: ['en'],

    defaultValue: '',

    extractFromComments: true,
  },

  lint: {
    ignoredAttributes: ['data-testid', 'aria-label'],
    ignoredTags: ['pre', 'code'],
    ignore: ['**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  },

  types: {
    input: ['src/locales/ko/*.json'],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: false,
  },
});
