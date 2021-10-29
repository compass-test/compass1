import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { AnalyticsListener, AnalyticsContext } from '@atlaskit/analytics-next';
import styled, { injectGlobal } from 'styled-components';
import * as untypedI18n from '../../i18n';
const i18n: { [index: string]: Object | undefined } = untypedI18n;

import { defaultLocale, Locale } from '../constants/supported-locales';
import { createStore } from '../../state';
import { getEvent, PROJECT_PAGES_CHANNEL } from '../analytics/util';

// Storybooks adds padding: 1rem. This does not play well with width: 100% from css-reset and the default box-sizing (content-box)
injectGlobal`
  .sb-show-main {
    box-sizing: border-box;
  }
`;

const AppStyle = styled.div``;

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

export const provideReduxStoreDecorator = (story: any) => (
  <Provider store={createStore()}>{story()}</Provider>
);

export const analyticsToActionDecorator = (story: any) => (
  <AnalyticsListener
    onEvent={(event) => {
      setTimeout(() => {
        decorateAction([(args: any) => [getEvent(args[0])]])('analyticsEvent')(
          event,
        );
      }, 0);
    }}
    channel={PROJECT_PAGES_CHANNEL}
  >
    {story()}
  </AnalyticsListener>
);

export const analyticsDecorator = (story: any) => (
  <AnalyticsContext data={{ containerId: 'storybook' }}>
    {story()}
  </AnalyticsContext>
);

export const createIntlDecorator = (locale: Locale = defaultLocale) => (
  storyFn: any,
) => {
  const { language, country } = getCodesFromLocale(locale as string);
  const messages = i18n[`${language}_${country}`] || i18n[language] || i18n.en;

  return (
    <IntlProvider locale={language} messages={messages}>
      {storyFn()}
    </IntlProvider>
  );
};

export const styleDecorator = (storyFn: any) => (
  <AppStyle>{storyFn()}</AppStyle>
);

export const generateMetadata = (storyName: string, locale?: Locale) => {
  window.__SERVER__ = false;
  return {
    title: storyName,
    decorators: [
      provideReduxStoreDecorator,
      analyticsToActionDecorator,
      createIntlDecorator(locale),
      styleDecorator,
      analyticsDecorator,
      withKnobs,
    ],
  };
};

export const mockIntl = {
  formatMessage: (descriptor: any) => descriptor.defaultMessage,
};
