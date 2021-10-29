import type { FetchLanguageFile } from '@atlassian/mpt-utils';

export function fetchLanguageFile(
  locale: string,
): ReturnType<FetchLanguageFile> {
  switch (locale) {
    case 'cs-CZ':
    case 'cs':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-cs" */ '../../i18n/cs'
      );
    case 'da-DK':
    case 'da':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-da" */ '../../i18n/da'
      );
    case 'de-DE':
    case 'de':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-de" */ '../../i18n/de'
      );
    case 'es-ES':
    case 'es':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-es" */ '../../i18n/es'
      );
    case 'et-EE':
    case 'et':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-et" */ '../../i18n/et'
      );
    case 'fi-FI':
    case 'fi':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-fi" */ '../../i18n/fi'
      );
    case 'fr-FR':
    case 'fr':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-fr" */ '../../i18n/fr'
      );
    case 'hu-HU':
    case 'hu':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-hu" */ '../../i18n/hu'
      );
    case 'it-IT':
    case 'it':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-it" */ '../../i18n/it'
      );
    case 'ja-JP':
    case 'ja':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-ja" */ '../../i18n/ja'
      );
    case 'ko-KR':
    case 'ko':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-ko" */ '../../i18n/ko'
      );
    case 'nb-NB':
    case 'nb':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-nb" */ '../../i18n/nb'
      );
    case 'nl-NL':
    case 'nl':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-nl" */ '../../i18n/nl'
      );
    case 'pl-PL':
    case 'pl':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-pl" */ '../../i18n/pl'
      );
    case 'pt-BR':
    case 'pt':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-pt-BR" */ '../../i18n/pt_BR'
      );
    case 'pt-PT':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-pt-PT" */ '../../i18n/pt_PT'
      );
    case 'ru-RU':
    case 'ru':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-ru" */ '../../i18n/ru'
      );
    case 'sk-SK':
    case 'sk':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-sk" */ '../../i18n/sk'
      );
    case 'sv-SE':
    case 'sv':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-sv" */ '../../i18n/sv'
      );
    case 'tr-TR':
    case 'tr':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-tr" */ '../../i18n/tr'
      );
    case 'th-TH':
    case 'th':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-th" */ '../../i18n/th'
      );
    case 'uk-UK':
    case 'uk':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-uk" */ '../../i18n/uk'
      );
    case 'vi-VI':
    case 'vi':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-vi" */ '../../i18n/vi'
      );
    case 'zh-TW':
    case 'zh-HK':
    case 'zh':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-zh-TW" */ '../../i18n/zh_TW'
      );
    case 'zh-ZH':
    case 'zh-CN':
      return import(
        /* webpackChunkName: "@atlaskit-internal_async-mpt-migration-details-i18n-zh-ZH" */ '../../i18n/zh'
      );
  }

  return Promise.resolve({ default: {} });
}
