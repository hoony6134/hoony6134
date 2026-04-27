import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';

import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

import { isLanguage, type Language } from './languages';

export function useLanguage(): Language {
  const { i18n: i18nInstance } = useTranslation();
  return i18nInstance.language as Language;
}

export const detectLanguage = createIsomorphicFn()
  .server(() => {
    const raw = getRequestHeader('accept-language')?.split(',')[0]?.split('-')[0] ?? 'ko';
    return isLanguage(raw) ? raw : 'ko';
  })
  .client(() => {
    const lng = navigator.language.split('-')[0];
    return isLanguage(lng) ? lng : 'ko';
  });

await i18n
  .use(resourcesToBackend((lng: string, ns: string) => import(`../../locales/${lng}/${ns}.json`)))
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko',
    defaultNS: '_',
    nsSeparator: ':',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
