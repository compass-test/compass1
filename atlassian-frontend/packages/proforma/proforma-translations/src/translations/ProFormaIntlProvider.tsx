import React from 'react';

import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE, Locale } from './locales';
import { toLanguageTag } from './utils';

const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    // eslint-disable-next-line no-console
    console.error(
      'Unable to get language and country from invalid Locale, falling back to default locale',
    );
    return {
      language: 'en',
      country: 'US',
    };
  }
  const [, language, country] = match;

  return {
    language: language.toLowerCase(),
    country: country.toUpperCase(),
  };
};

export type ProFormaIntlProviderProps = {
  customLocale?: Locale;
};

type ProFormaIntlProviderInternalProps = ProFormaIntlProviderProps & {
  children: React.ReactElement<any>;
  i18nMessages: { [index: string]: Object | undefined };
};

export const ProFormaIntlProvider = injectIntl(
  ({
    children,
    i18nMessages,
    customLocale,
    intl,
  }: ProFormaIntlProviderInternalProps & InjectedIntlProps) => {
    const localeTag = customLocale
      ? toLanguageTag(customLocale)
      : intl.locale.toString();
    const { language, country } = getCodesFromLocale(localeTag);
    const messages =
      i18nMessages[`${language}_${country}`] ||
      i18nMessages[language] ||
      i18nMessages.en;
    // aggregateMessages is a temporary implementation required only while we need to maintain
    // both atlassian-frontend and merge them with the older ProForma translations. Once we can
    // soley rely on atlassian-frontend translation, this can be removed.
    const aggregateMessages = {
      ...intl.messages,
      ...messages,
    };

    return (
      <IntlProvider
        messages={aggregateMessages}
        locale={localeTag}
        defaultLocale={DEFAULT_LOCALE}
      >
        {children}
      </IntlProvider>
    );
  },
);

export const withProFormaIntlProvider = <Props extends Object>(
  i18nMessages: { [index: string]: Object | undefined },
  WrappedComponent: React.ComponentType<Props>,
): React.FC<Props & ProFormaIntlProviderProps> => props => {
  return (
    <ProFormaIntlProvider
      i18nMessages={i18nMessages}
      customLocale={props.customLocale}
    >
      <WrappedComponent {...props} />
    </ProFormaIntlProvider>
  );
};
