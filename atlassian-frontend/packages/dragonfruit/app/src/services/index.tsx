import React, { FC, useEffect, useMemo } from 'react';

import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react';
import { IntercomProvider } from 'react-use-intercom';

import { FlagsProvider } from '@atlaskit/flag';
import { Provider as SmartLinksProvider } from '@atlaskit/smart-card';
import { ANALYTICS_BRIDGE_CHANNEL } from '@atlassian/analytics-bridge';
import { CompassRecentsProvider } from '@atlassian/compass-search-cache';
import {
  AnalyticsProvider,
  useGetAnalyticsClient,
} from '@atlassian/dragonfruit-analytics';
import {
  FeatureFlagClientProvider,
  useGetFeatureFlagClient,
} from '@atlassian/dragonfruit-feature-flags';
import { FieldDefinitionsProvider } from '@atlassian/dragonfruit-field-definitions-context';
import { useAggClient } from '@atlassian/dragonfruit-graphql';
import { HelpProvider } from '@atlassian/dragonfruit-in-product-help';
import { initBM3 } from '@atlassian/dragonfruit-performance';
import {
  getEnvironmentFromOrigin,
  TenantInfoProvider,
  TenantInfoState,
  useGetTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';
import {
  addSupportedLocaleData,
  CompassIntlProvider,
  FetchError,
} from '@atlassian/dragonfruit-utils';

import { AppState, AppStateProvider } from './app-context';

addSupportedLocaleData();

export const Providers: FC = ({ children }) => {
  const environment = useMemo(() => getEnvironmentFromOrigin(), []);
  const tenantInfo = useGetTenantInfo();

  const appState = useMemo(() => getAppState(tenantInfo), [tenantInfo]);

  const analyticsClient = useGetAnalyticsClient(
    environment,
    tenantInfo.data?.cloudId,
    tenantInfo.data?.accountId,
  );
  const featureFlagClient = useGetFeatureFlagClient({
    environment: environment,
    tenantId: tenantInfo.data?.cloudId,
    accountId: tenantInfo.data?.accountId,
    analyticsWebClient: analyticsClient,
  });
  const aggClient = useAggClient();

  useEffect(() => {
    Sentry.setUser({ id: tenantInfo.data?.accountId });
  }, [tenantInfo.data?.accountId]);

  useEffect(() => {
    initBM3(analyticsClient, environment, featureFlagClient.client);
  }, [analyticsClient, environment, featureFlagClient.client]);

  return (
    <AppStateProvider value={appState}>
      <TenantInfoProvider value={tenantInfo}>
        <AnalyticsProvider
          analyticsClient={analyticsClient}
          channel={ANALYTICS_BRIDGE_CHANNEL}
          environment={environment}
        >
          <FeatureFlagClientProvider value={featureFlagClient}>
            <ApolloProvider client={aggClient}>
              <CompassIntlProvider locale="en">
                <FlagsProvider>
                  <SmartLinksProvider>
                    <FieldDefinitionsProvider>
                      <CompassRecentsProvider tenantInfo={tenantInfo}>
                        <IntercomProvider appId="r9osvpuz">
                          <HelpProvider>{children}</HelpProvider>
                        </IntercomProvider>
                      </CompassRecentsProvider>
                    </FieldDefinitionsProvider>
                  </SmartLinksProvider>
                </FlagsProvider>
              </CompassIntlProvider>
            </ApolloProvider>
          </FeatureFlagClientProvider>
        </AnalyticsProvider>
      </TenantInfoProvider>
    </AppStateProvider>
  );
};

type HOC = (Component: React.ComponentType) => React.ComponentType;
export const withProviders: HOC = (Component) => () => (
  <Providers>
    <Component />
  </Providers>
);

// The appState holds info about whether the required info for loading a page (e.g. tenantInfo, accountInfo) has been retrieved.
// It also allows us to check whether a user has access to Compass and show a message in the loading screen if required.
function getAppState(tenantInfo: TenantInfoState): AppState {
  if (tenantInfo.error) {
    if (
      (tenantInfo.error as FetchError).errorType === 'COMPASS_NOT_AVAILABLE'
    ) {
      // Compass not provisioned on this site
      return {
        loading: false,
        error: 'COMPASS_NOT_PROVISIONED',
      };
    }

    if ((tenantInfo.error as FetchError).errorType === 'UNAUTHORIZED') {
      // Handle logged out users
      // tenantInfo also checks in case of race condition with accountInfo
      return {
        loading: false,
        error: 'USER_NOT_AUTHENTICATED',
      };
    }

    if ((tenantInfo.error as FetchError).errorType === 'FORBIDDEN') {
      // Handle users without access to Compass
      return {
        loading: false,
        error: 'NO_USER_PERMISSIONS',
      };
    }

    // Error fetching tenantInfo
    return {
      loading: false,
      error: 'TENANT_RETRIEVAL_ERROR',
    };
  }

  if (tenantInfo.data) {
    // Success
    return {
      loading: false,
      success: true,
    };
  }

  // Loading
  return {
    loading: true,
  };
}
