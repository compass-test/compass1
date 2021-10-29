import React from 'react';

import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl';

import { getMessagesForLocale, LangCode } from './i18n-util';

export interface Props {
  children: React.ReactChild;
}

// As of 08/2021 repo still using v2 react-intl so no native useIntl()
function MessageProvider(props: Props & InjectedIntlProps) {
  const { intl, children } = props;

  return (
    <IntlProvider messages={getMessagesForLocale(intl.locale as LangCode)}>
      {children}
    </IntlProvider>
  );
}

export default injectIntl(MessageProvider);
