import React from 'react';
import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl';
import { useFetchMessagesByLocale } from './utils';

interface IntlProviderType {
  children: React.ReactElement<any>;
}

const InvitePeopleIntlProvider = ({
  children,
  intl,
}: IntlProviderType & InjectedIntlProps) => {
  const { messages } = useFetchMessagesByLocale(intl.locale);

  return (
    <IntlProvider messages={messages} key={intl.locale} locale={intl.locale}>
      {children}
    </IntlProvider>
  );
};

export default injectIntl<IntlProviderType>(InvitePeopleIntlProvider);
