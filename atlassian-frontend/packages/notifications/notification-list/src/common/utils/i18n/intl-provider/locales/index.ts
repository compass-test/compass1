/* eslint-disable import/dynamic-import-chunkname */
import { useEffect, useRef, useState } from 'react';

import {
  triggerI18nFailedToLoad,
  useCreateFireAnalyticsFromTrigger,
} from '../../../analytics';

export const supportedLocales = [
  'cs-CZ',
  'da-DK',
  'de-DE',
  'es-ES',
  'et-EE',
  'fi-FI',
  'fr-FR',
  'hu-HU',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'nb-NB',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
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
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale);
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
      return import('../../../../../i18n/cs');
    case 'da-DK':
    case 'da':
      return import('../../../../../i18n/da');
    case 'de-DE':
    case 'de':
      return import('../../../../../i18n/de');
    case 'es-ES':
    case 'es':
      return import('../../../../../i18n/es');
    case 'et-EE':
    case 'et':
      return import('../../../../../i18n/et');
    case 'fi-FI':
    case 'fi':
      return import('../../../../../i18n/fi');
    case 'fr-FR':
    case 'fr':
      return import('../../../../../i18n/fr');
    case 'hu-HU':
    case 'hu':
      return import('../../../../../i18n/hu');
    case 'it-IT':
    case 'it':
      return import('../../../../../i18n/it');
    case 'ja-JP':
    case 'ja':
      return import('../../../../../i18n/ja');
    case 'ko-KR':
    case 'ko':
      return import('../../../../../i18n/ko');
    case 'nb-NB':
    case 'nb':
      return import('../../../../../i18n/nb');
    case 'nl-NL':
    case 'nl':
      return import('../../../../../i18n/nl');
    case 'pl-PL':
    case 'pl':
      return import('../../../../../i18n/pl');
    case 'pt-BR':
    case 'pt':
      return import('../../../../../i18n/pt_BR');
    case 'pt-PT':
      return import('../../../../../i18n/pt_PT');
    case 'ru-RU':
    case 'ru':
      return import('../../../../../i18n/ru');
    case 'sk-SK':
    case 'sk':
      return import('../../../../../i18n/sk');
    case 'sv-SE':
    case 'sv':
      return import('../../../../../i18n/sv');
    case 'tr-TR':
    case 'tr':
      return import('../../../../../i18n/tr');
    case 'th-TH':
    case 'th':
      return import('../../../../../i18n/th');
    case 'uk-UK':
    case 'uk':
      return import('../../../../../i18n/uk');
    case 'vi-VI':
    case 'vi':
      return import('../../../../../i18n/vi');
    case 'zh-TW':
    case 'zh-HK':
    case 'zh':
      return import('../../../../../i18n/zh_TW');
    case 'zh-ZH':
    case 'zh-CN':
      return import('../../../../../i18n/zh');
  }

  return Promise.resolve({ default: {} });
}

const shouldLoadRemoteLocale = (locale: string) => locale !== 'en';

export function useFetchMessagesByLocale(locale: string) {
  const { language, country } = getCodesFromLocale(locale);
  const lastLocaleLoaded = useRef<string>();
  const [messages, setMessages] = useState({});
  const [isReady, setIsReady] = useState(!shouldLoadRemoteLocale(language));
  const fireI18nFailedToLoad = useCreateFireAnalyticsFromTrigger(
    triggerI18nFailedToLoad,
  );
  useEffect(() => {
    async function startToFetchMessagesByLocale() {
      // don't load English messages
      if (
        !shouldLoadRemoteLocale(language) ||
        locale === lastLocaleLoaded.current
      ) {
        return;
      }

      try {
        const finalLocale = country ? `${language}-${country}` : language;
        const module = await fetchLanguageFile(finalLocale);
        const newMessages = module.default || module;
        lastLocaleLoaded.current = locale;
        setMessages(newMessages);
      } catch (e) {
        fireI18nFailedToLoad(locale);
      } finally {
        setIsReady(true);
      }
    }

    void startToFetchMessagesByLocale();
  }, [fireI18nFailedToLoad, locale, language, country]);

  return { messages, isReady };
}
