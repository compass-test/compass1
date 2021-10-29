import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

import * as en from 'react-intl/locale-data/en';
import * as fr from 'react-intl/locale-data/fr';
import * as es from 'react-intl/locale-data/es';
import * as zh from 'react-intl/locale-data/zh';

addLocaleData([...en, ...fr, ...es, ...zh]);

const LocaleIntlProvider = ({
  locale = 'en',
  children,
}: {
  locale: string;
  children: React.ReactChild;
}) => (
  <IntlProvider key={locale} locale={locale}>
    {children}
  </IntlProvider>
);

export const supportedLanguages = ['en', 'fr', 'es', 'zh'];

export default LocaleIntlProvider;
