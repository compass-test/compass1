import React, { useEffect, useState } from 'react';

import { injectIntl, IntlProvider as OriginalIntlProvider } from 'react-intl';

import { CustomIntlContext } from '../../controllers/use-intl';

import type { CustomIntlProviderProps, FetchLanguageFile } from './types';
import { getCodesFromLocale } from './utils';

export function useFetchMessagesByLocale(
  locale: string,
  fetchLanguageFile: FetchLanguageFile,
) {
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function startToFetchMessagesByLocale() {
      const { language, country } = getCodesFromLocale(locale);

      // don't load English messages
      if (language === 'en') {
        return;
      }

      try {
        setIsLoading(true);
        const finalLocale = country ? `${language}-${country}` : language;
        const languageFile = await fetchLanguageFile(finalLocale);
        const newMessages = languageFile.default || languageFile;
        setMessages(newMessages);
      } catch (e) {
        // fail to download message and do nothing because UI will use default language (English) to render
      } finally {
        setIsLoading(false);
      }
    }

    startToFetchMessagesByLocale();
  }, [fetchLanguageFile, locale]);

  return { messages, isLoading };
}

/**
 * This component is used to wrap our UI components.
 */
const CustomIntlProvider = injectIntl<CustomIntlProviderProps>(props => {
  const { children, fetchLanguageFile, intl, ...rest } = props;
  const { messages, isLoading } = useFetchMessagesByLocale(
    intl.locale,
    fetchLanguageFile,
  );
  const contextValue = { intl, isLoading };

  return (
    <OriginalIntlProvider
      {...rest}
      messages={messages}
      key={intl.locale}
      locale={intl.locale}
    >
      <CustomIntlContext.Provider value={contextValue}>
        {children}
      </CustomIntlContext.Provider>
    </OriginalIntlProvider>
  );
});

export function withCustomIntlProvider<T>(
  Component: React.ComponentType<T> | React.FunctionComponent<T>,
  fetchLanguageFile: FetchLanguageFile,
): React.FunctionComponent<T> {
  return (props: T) => {
    return (
      <CustomIntlProvider fetchLanguageFile={fetchLanguageFile}>
        <Component {...props} />
      </CustomIntlProvider>
    );
  };
}

export default CustomIntlProvider;
