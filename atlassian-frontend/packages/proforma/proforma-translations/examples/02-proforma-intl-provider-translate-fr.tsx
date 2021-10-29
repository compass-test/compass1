import React from 'react';

import { FormattedMessage, IntlProvider } from 'react-intl';

import { Locale, toLanguageTag } from '../src';
import { ProFormaIntlProvider } from '../src/translations/ProFormaIntlProvider';

export default function ProFormaIntlProviderExample() {
  const locale = toLanguageTag(Locale.fr_FR);
  const messageId = 'proforma.intl.provider.example.id';
  const messages = {
    fr: {
      [`${messageId}`]: 'This is a translated message',
    },
  };

  return (
    <IntlProvider locale={locale}>
      <ProFormaIntlProvider i18nMessages={messages}>
        <FormattedMessage id={messageId} />
      </ProFormaIntlProvider>
    </IntlProvider>
  );
}
