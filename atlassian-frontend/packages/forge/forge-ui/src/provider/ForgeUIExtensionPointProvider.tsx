import React from 'react';
import { EnvironmentContext, MetalClientProvider } from '../context';
import { UseExtensionQueryHookOptions } from '../web-client';
import { AnalyticsWebClient, ForgeUIAnalyticsListener } from '../analytics';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

export type ForgeUIExtensionQueryOptions = UseExtensionQueryHookOptions;

export const ForgeUIExtensionPointProvider = ({
  analyticsWebClient,
  environment,
  product,
  page,
  children,
}: {
  analyticsWebClient: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  environment: ProductEnvironment;
  product: string;
  page: string;
  children: React.ReactNode;
}) => {
  return (
    <EnvironmentContext.Provider value={environment}>
      <MetalClientProvider value={{ product, page }}>
        <ForgeUIAnalyticsListener
          client={analyticsWebClient}
          commonAttributes={{
            moduleType: page,
          }}
        >
          {children}
        </ForgeUIAnalyticsListener>
      </MetalClientProvider>
    </EnvironmentContext.Provider>
  );
};
