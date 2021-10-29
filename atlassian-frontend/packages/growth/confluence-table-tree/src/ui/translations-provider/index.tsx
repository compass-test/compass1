import React, { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import * as untypedI18n from '../../i18n';

const i18n: { [index: string]: Object } = untypedI18n;

export const DEFAULT_LOCALE = 'en_US';

export const TranslationsProvider: React.FunctionComponent<{
  locale: string;
}> = ({ locale, children }) => {
  const { language, country } = useMemo(() => {
    const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
    if (!match) {
      throw Error('Unable to get language and country from invalid Locale');
    }
    const [, language, country] = match;
    return {
      language: language.toLowerCase(),
      country: country.toUpperCase(),
    };
  }, [locale]);
  const translatedMessages = i18n[`${language}_${country}`] || i18n[language];
  return (
    <IntlProvider locale={language} messages={translatedMessages}>
      {children}
    </IntlProvider>
  );
};
