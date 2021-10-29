import React, { ReactElement } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { CompassIntlProvider } from '../intl-context';

const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;
  return [language.toLowerCase(), country.toUpperCase()];
};

interface Props {
  i18n: { [index: string]: Object | undefined };
  children: ReactElement;
}

/**
 * Use this provider to provide translated messages in a package.
 *
 * Example usage, if translated messages are generated in the `src/i18n` folder
 *
 * import * as i18n from '../i18n';
 *
 * ...
 *
 * return (
 * <MessagesIntlProvider i18n={i18n}>
 * ...
 * </MessagesIntlProvider>
 * )
 */
const MessagesIntlProvider = ({
  i18n,
  children,
  intl,
}: Props & InjectedIntlProps) => {
  const [language, country] = getCodesFromLocale(intl.locale.toString());
  const messages = i18n[`${language}_${country}`] || i18n[language] || i18n.en;

  return (
    <CompassIntlProvider messages={messages}>{children}</CompassIntlProvider>
  );
};

export default injectIntl(MessagesIntlProvider);
