import React from 'react';

import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl';

import * as untypedI18n from '../../i18n';

const i18n: { [index: string]: Object | undefined } = untypedI18n;

const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;

  return {
    language: language.toLowerCase(),
    country: country.toUpperCase(),
  };
};

interface Props {
  children: React.ReactElement<any>;
}

const PeopleMenuIntlProvider = ({
  children,
  intl,
}: Props & InjectedIntlProps) => {
  const { language, country } = getCodesFromLocale(intl.locale.toString());
  const messages = i18n[`${language}_${country}`] || i18n[language] || i18n.en;

  return <IntlProvider messages={messages}>{children}</IntlProvider>;
};

export default injectIntl<Props>(PeopleMenuIntlProvider);
