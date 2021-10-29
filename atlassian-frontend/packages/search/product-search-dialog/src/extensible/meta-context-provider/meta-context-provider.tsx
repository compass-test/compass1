import React, { FC } from 'react';
import { ThemeProvider } from '@atlassian/search-dialog';
import { DialogExpansionContextProvider } from './../dialog-expansion-context';
import { QueryContextProvider } from './../query-context';
import { ProductRouter } from './../product-router';
import { MessagesIntlProvider } from '../../common/message-intl-provider';
import { BuildVersionAnalyticContext } from '../../common/build-version-analytic-context';
import { SearchCSS } from '@atlassian/search-dialog';
import { SearchSessionProvider } from '../../common/search-session-provider';
import {
  AggregatorClientContextProvider,
  AggregatorClientFeatures,
} from '../aggregator-client-context';
import { ABTestContextProvider } from '../ab-test-context';
import { ExperimentExposureHandler } from '../../common/experiment-exposure-handler';
import { DialogDismissedHandler } from '../../common/analytics';
import { UserDetails, UserProvider } from '../../common/user-context';

export interface Props {
  /**
   * Used to override the default AtlasKit Search Navigation CSS theming.
   */
  theme?: SearchCSS;
  /**
   * Flag which indicates the current open state of the dialog. Used internally within the dialog for analytics.
   */
  isExpanded: boolean;
  /**
   * Sets the current open state of the dialog.
   */
  setIsExpanded: (value: boolean) => void;
  /**
   * Cloud id used for the current abTest.
   */
  abTestCloudId: string;
  /**
   * Url for aggregator for quicksearch supported products.
   */
  aggregatorUrl: string;
  /**
   * Used to provide customisation options to internal clients which interact with aggregator.
   */
  clientProviderFeatures?: AggregatorClientFeatures;
  /**
   * Details for the current user.
   */
  user?: UserDetails;
}

export const MetaContextProvider: FC<Props> = ({
  children,
  theme,
  setIsExpanded,
  isExpanded,
  abTestCloudId,
  aggregatorUrl,
  clientProviderFeatures,
  user,
}) => {
  return (
    <UserProvider user={user}>
      <MessagesIntlProvider>
        <BuildVersionAnalyticContext>
          <ThemeProvider partialSearchCSS={theme}>
            <DialogExpansionContextProvider
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            >
              <ProductRouter>
                <AggregatorClientContextProvider
                  abTestCloudId={abTestCloudId}
                  aggregatorUrl={aggregatorUrl}
                  features={clientProviderFeatures}
                >
                  <ABTestContextProvider>
                    <SearchSessionProvider
                      sessionKey={`ssid_provider_${isExpanded}`}
                    >
                      {isExpanded ? <ExperimentExposureHandler /> : null}
                      <QueryContextProvider>
                        <DialogDismissedHandler isExpanded={isExpanded} />
                        {children}
                      </QueryContextProvider>
                    </SearchSessionProvider>
                  </ABTestContextProvider>
                </AggregatorClientContextProvider>
              </ProductRouter>
            </DialogExpansionContextProvider>
          </ThemeProvider>
        </BuildVersionAnalyticContext>
      </MessagesIntlProvider>
    </UserProvider>
  );
};
