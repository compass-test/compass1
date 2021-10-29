/* eslint-disable no-console */
import React, { useEffect } from 'react';

import { IntlProvider } from 'react-intl';

import Spinner from '@atlaskit/spinner';

import { DEFAULT_LOCALE, Locale } from './locales';
import { toLanguageTag } from './utils';
import './setupLocales';

interface AsyncIntlProviderProps {
  children: React.ReactNode;
  locale: Locale;
  loadExtraLocaleData?: (locale: Locale) => Promise<Record<string, string>>;
}

export const AsyncIntlProvider: React.FC<AsyncIntlProviderProps> = ({
  children,
  locale,
  loadExtraLocaleData,
}) => {
  const [localeData, setLocaleData] = React.useState<
    Record<string, string> | undefined
  >();

  useEffect(() => {
    const baseLocaleDataPromise = loadLocaleData(locale).catch(error => {
      console.error(
        `Unable to load the locale data for [${locale}]. Error: `,
        error,
      );
      return {};
    });
    const extraLocaleDataPromise = loadExtraLocaleData
      ? loadExtraLocaleData(locale).catch(error => {
          console.error(
            `Unable to load the extra locale data for [${locale}]. Error: `,
            error,
          );
          return {};
        })
      : Promise.resolve({});
    Promise.all([baseLocaleDataPromise, extraLocaleDataPromise]).then(
      ([baseLocaleData, extraLocaleData]) => {
        // In the event of a clash make our own preferred
        setLocaleData({ ...extraLocaleData, ...baseLocaleData });
      },
    );
  }, [locale, loadExtraLocaleData]);

  if (!locale || !localeData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <IntlProvider
      key={locale}
      locale={toLanguageTag(locale)}
      messages={localeData}
      defaultLocale={DEFAULT_LOCALE}
      // @ts-ignore
      onError={error => console.error('React Intl error: ', error)}
    >
      {children}
    </IntlProvider>
  );
};

const loadLocaleData = async (
  locale: Locale,
): Promise<Record<string, string>> => {
  const localeString = locale.replace('-', '_');
  // eslint-disable-next-line import/dynamic-import-chunkname
  const localeData = await import(
    /* webpackChunkName: "app-locale-[request]" */
    /* webpackMode: "lazy" */
    `./locales/${localeString}`
  ).catch(error => {
    console.error(
      `Unable to load the i18n file for [${locale}]. Error: `,
      error,
    );
  });
  if ('default' in localeData) {
    return localeData.default;
  }
  return {};
};
