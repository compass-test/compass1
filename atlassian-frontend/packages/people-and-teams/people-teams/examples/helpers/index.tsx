import React from 'react';

import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';

export const TEST_CLOUD_ID = 'test-cloud-id';
export const TEST_ORG_ID = 'test-org-id';
export const TEST_CURRENT_USER_ID = 'test-current-user-id';
export const TEST_PRODUCT = 'confluence';

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

export const SectionWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
`;
