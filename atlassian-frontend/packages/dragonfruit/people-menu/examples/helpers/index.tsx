import React from 'react';

import { IntlProvider } from 'react-intl';

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

export const withIntlProvider = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
) => (props: Props) => (
  <IntlProvider locale="en">
    <WrappedComponent {...props} />
  </IntlProvider>
);

function delay(ms: number) {
  if (ms === 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PermissionProvider {
  [key: string]: (() => Promise<boolean>) | undefined;
}

const browsePermissionsProviders: PermissionProvider = {
  noValueProvided: undefined,
  returnFalse: () => delay(200).then(() => false),
  returnTrue: () => delay(200).then(() => true),
  throwError: () =>
    delay(200).then(() => {
      throw new Error();
    }),
};

export function mockBrowsePermissions(browsePermissions: string) {
  return browsePermissionsProviders[browsePermissions];
}
