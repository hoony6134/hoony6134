import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../components/button';
import { DateLocaleDemo } from '../components/date-locale-demo';

export function LandingPage() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const toggleLocale = () => {
    i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko');
  };

  const STACK_CARDS = [
    {
      title: t('landing.stack.tanstack.title'),
      description: t('landing.stack.tanstack.description'),
      accent: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    },
    {
      title: t('landing.stack.tailwind.title'),
      description: t('landing.stack.tailwind.description'),
      accent: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    },
    {
      title: t('landing.stack.i18n.title'),
      description: t('landing.stack.i18n.description'),
      accent: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    },
    {
      title: t('landing.stack.mvvm.title'),
      description: t('landing.stack.mvvm.description'),
      accent: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          GSA Infoteam Template
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t('landing.hero.title')}
        </h1>
        <p className="max-w-md text-base text-gray-500 dark:text-gray-400">
          {t('landing.hero.description')}
        </p>
        <div className="flex gap-3">
          <Button label={t('landing.hero.start')} variant="primary" />
          <a
            href="https://github.com/gsainfoteam/template-csr-fe"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-800"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Stack overview */}
      <section className="border-t border-gray-100 px-6 py-16 dark:border-gray-800">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-xl font-semibold text-gray-900 dark:text-white">
            {t('landing.stack.title')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STACK_CARDS.map(({ title, description, accent }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <span
                  className={`mb-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${accent}`}
                >
                  {title}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="border-t border-gray-100 px-6 py-16 dark:border-gray-800">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
            {t('landing.demo.title')}
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t('landing.demo.button')}
            </p>
            <div className="flex gap-3">
              <Button
                label={theme === 'light' ? t('landing.demo.darkMode') : t('landing.demo.lightMode')}
                variant="primary"
                onClick={toggleTheme}
              />
              <Button
                label={i18n.language === 'ko' ? 'English' : '한국어'}
                variant="secondary"
                onClick={toggleLocale}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t('landing.demo.i18n')}
            </p>
            <DateLocaleDemo />
          </div>
        </div>
      </section>
    </div>
  );
}
