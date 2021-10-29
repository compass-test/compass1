/* eslint-disable import/dynamic-import-chunkname */

import { useEffect, useState } from 'react';

export const supportedLocales = [
  'cs-CZ',
  'da-DK',
  'de-DE',
  'es-ES',
  'et-EE',
  'fi-FI',
  'fr-FR',
  'hu-HU',
  'is-IS',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'nb-NB',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'sv-SE',
  'tr-TR',
  'th-TH',
  'uk-UK',
  'vi-VI',
  'zh-TW',
  'zh-HK',
  'zh-ZH',
  'zh-CN',
  // react-intl does not support these locales
  // 'zh-Hant',
  // 'zh-Hans',
];

export const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;

  return {
    language: language.toLowerCase(),
    // when country code is missed, let it empty and we will use language/locale to find language file
    country: country ? country.toUpperCase() : '',
  };
};

type MessageFile = {
  default: { [key: string]: string };
};

export function fetchLanguageFile(locale: string): Promise<MessageFile> {
  switch (locale) {
    case 'cs-CZ':
    case 'cs':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-cs" */ '../../i18n/cs'
      );
    case 'da-DK':
    case 'da':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-da" */ '../../i18n/da'
      );
    case 'de-DE':
    case 'de':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-de" */ '../../i18n/de'
      );
    case 'es-ES':
    case 'es':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-es" */ '../../i18n/es'
      );
    case 'et-EE':
    case 'et':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-et" */ '../../i18n/et'
      );
    case 'fi-FI':
    case 'fi':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-fi" */ '../../i18n/fi'
      );
    case 'fr-FR':
    case 'fr':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-fr" */ '../../i18n/fr'
      );
    case 'hu-HU':
    case 'hu':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-hu" */ '../../i18n/hu'
      );
    case 'is-IS':
    case 'is':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-is" */ '../../i18n/is'
      );
    case 'it-IT':
    case 'it':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-it" */ '../../i18n/it'
      );
    case 'ja-JP':
    case 'ja':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-ja" */ '../../i18n/ja'
      );
    case 'ko-KR':
    case 'ko':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-ko" */ '../../i18n/ko'
      );
    case 'nb-NB':
    case 'nb':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-nb" */ '../../i18n/nb'
      );
    case 'nl-NL':
    case 'nl':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-nl" */ '../../i18n/nl'
      );
    case 'pl-PL':
    case 'pl':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-pl" */ '../../i18n/pl'
      );
    case 'pt-BR':
    case 'pt':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-pt-BR" */ '../../i18n/pt_BR'
      );
    case 'pt-PT':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-pt-PT" */ '../../i18n/pt_PT'
      );
    case 'ro-RO':
    case 'ro':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-ro" */ '../../i18n/ro'
      );
    case 'ru-RU':
    case 'ru':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-ru" */ '../../i18n/ru'
      );
    case 'sk-SK':
    case 'sk':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-sk" */ '../../i18n/sk'
      );
    case 'sv-SE':
    case 'sv':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-sv" */ '../../i18n/sv'
      );
    case 'tr-TR':
    case 'tr':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-tr" */ '../../i18n/tr'
      );
    case 'th-TH':
    case 'th':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-th" */ '../../i18n/th'
      );
    case 'uk-UK':
    case 'uk':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-uk" */ '../../i18n/uk'
      );
    case 'vi-VI':
    case 'vi':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-vi" */ '../../i18n/vi'
      );
    case 'zh-TW':
    case 'zh-HK':
    case 'zh':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-zh-TW" */ '../../i18n/zh_TW'
      );
    case 'zh-ZH':
    case 'zh-CN':
      return import(
        /* webpackChunkName: "async-invite-people-i18n-zh-ZH" */ '../../i18n/zh'
      );
  }

  return Promise.resolve({ default: {} });
}

export function useFetchMessagesByLocale(locale: string) {
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function startToFetchMessagesByLocale() {
      const { language, country } = getCodesFromLocale(locale);

      // don't load English messages
      if (language === 'en') {
        return;
      }

      try {
        setIsLoading(true);
        const finalLocale = country ? `${language}-${country}` : language;
        const module = await fetchLanguageFile(finalLocale);
        const newMessages = module.default || module;
        setMessages(newMessages);
      } catch (e) {
        // fail to download message and do nothing because UI will use default language (English) to render
      } finally {
        setIsLoading(false);
      }
    }

    void startToFetchMessagesByLocale();
  }, [locale]);

  return { messages, isLoading };
}
