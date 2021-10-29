import React from 'react';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { OriginProduct } from '../../types';

import { AdminHubAnalyticsProvider } from './adminhub';

// Delegate the sending of GasV3 events across the network the
// containing platform (e.g. JSW, Confluence, AdminHub,...)
export type AnalyticsProviderProps = {
  children?: React.ReactNode;
  analyticsOriginProduct: string;
  analyticsPlatformClient: typeof AnalyticsWebClient;
};

export const AnalyticsProvider = ({
  children,
  analyticsOriginProduct,
  analyticsPlatformClient,
}: AnalyticsProviderProps): React.ReactElement => {
  switch (analyticsOriginProduct) {
    case OriginProduct.ADMINHUB:
      return (
        <AdminHubAnalyticsProvider analyticsClient={analyticsPlatformClient}>
          {children}
        </AdminHubAnalyticsProvider>
      );
    default:
      break;
  }

  return <>{children}</>;
};
