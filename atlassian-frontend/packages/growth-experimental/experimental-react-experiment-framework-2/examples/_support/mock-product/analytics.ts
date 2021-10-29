import React from 'react';
import { ProductEnvContext } from './support/productEnv';
import {
  AnalyticsScreenEvent,
  AnalyticsEvent,
  AnalyticsImplementation,
  useDelegateAnalytics,
} from '../../../src/abstract/analytics';
import { ExperimentCore } from '../../../src/core/types';

export const usePluginAnalytics = <Upstream extends ExperimentCore>() =>
  function useAnalytics(pipeline: Upstream) {
    const analyticsClient = React.useContext(ProductEnvContext).analyticsClient;
    const memoizedImplementation = React.useMemo(
      () =>
        ({
          sendScreenEvent: (event: AnalyticsScreenEvent) => {
            analyticsClient.fireEvent({
              type: 'screen',
              ...event,
            });
          },
          sendUIEvent: (event: AnalyticsEvent) => {
            analyticsClient.fireEvent({
              type: 'ui',
              ...event,
            });
          },
          sendTrackEvent: (event: AnalyticsEvent) => {
            analyticsClient.fireEvent({
              type: 'track',
              ...event,
            });
          },
          sendOperationalEvent: (event: AnalyticsEvent) => {
            analyticsClient.fireEvent({
              type: 'operational',
              ...event,
            });
          },
        } as AnalyticsImplementation),
      [analyticsClient],
    );

    return useDelegateAnalytics(memoizedImplementation)(pipeline);
  };
