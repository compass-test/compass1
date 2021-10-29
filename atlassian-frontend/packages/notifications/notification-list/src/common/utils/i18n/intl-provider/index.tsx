import React, { useContext } from 'react';

import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl';

import { NotificationsStoreContext } from '../../../ui/notifications-context';

import { useFetchMessagesByLocale } from './locales';

interface NotificationIntlProviderType {
  children: React.ReactElement<any>;
}

const NotificationIntlProvider = ({
  children,
  intl,
}: NotificationIntlProviderType & InjectedIntlProps) => {
  const { messages, isReady } = useFetchMessagesByLocale(intl.locale);
  const { updateIntlLocale } = useContext(NotificationsStoreContext);

  /**
   * Blocks rendering until i18n is ready to prevent
   * briefly showing default EN locale before
   * rendering correct locale
   */
  if (!isReady) {
    return null;
  }

  updateIntlLocale(intl.locale);

  return (
    <IntlProvider messages={messages} locale={intl.locale}>
      {children}
    </IntlProvider>
  );
};

export default injectIntl<NotificationIntlProviderType>(
  NotificationIntlProvider,
);
