import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';

import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';

const onAnalyticsEvent = (
  event: UIAnalyticsEvent,
  channel: string = 'channel=""',
) => {
  // eslint-disable-next-line no-console
  console.log(
    `AnalyticsEvent(${channel})\n\tpayload=%o\n\tcontext=%o`,
    event.payload,
    event.context,
  );
};

export const AnalyticsLogger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AnalyticsListener channel="*" onEvent={onAnalyticsEvent}>
      {children}
    </AnalyticsListener>
  );
};

export const withAnalyticsLogger = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
) => (props: Props) => (
  <AnalyticsLogger>
    <WrappedComponent {...props} />
  </AnalyticsLogger>
);

// add more locale data if you want test other locales
const en = require('react-intl/locale-data/en');
addLocaleData(en);
const fr = require('react-intl/locale-data/fr');
addLocaleData(fr);

export const withIntlProvider = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
) => (props: Props) => (
  <IntlProvider locale="en">
    <WrappedComponent {...props} />
  </IntlProvider>
);

export const LocaleContext = React.createContext('en');
