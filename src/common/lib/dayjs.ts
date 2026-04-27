import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { i18n } from './i18n';

import type { Language } from './languages';

dayjs.extend(localizedFormat);

const loaderMap: Record<Language, () => Promise<ILocale>> = {
  ko: () => import('dayjs/locale/ko'),
  en: () => import('dayjs/locale/en'),
};

const handleChangeLanguage = async (lng: Language) => {
  try {
    const prevLng = dayjs.locale();
    dayjs.locale(lng);

    const loader = loaderMap[lng];
    if (!loader) throw new Error(`Unsupported language: ${lng}`);

    if (lng !== 'en') {
      const locale = await loader();
      dayjs.locale(locale);
    }

    if (prevLng !== lng) {
      i18n.changeLanguage(lng);
    }
  } catch {
    dayjs.locale(await import('dayjs/locale/ko'));
  }
};

i18n.on('languageChanged', handleChangeLanguage);
handleChangeLanguage(i18n.language as Language);
