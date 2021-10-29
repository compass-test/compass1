import React, { useCallback } from 'react';

import AnalyticsWebClient, {
  originType,
} from '@atlassiansox/analytics-web-client';

import {
  AnalyticsListener,
  UIAnalyticsEventHandler,
} from '@atlaskit/analytics-next';
import { EVENT_TYPE } from './types';
import {
  getBuildInfo,
  getEnvironmentFromOrigin,
  getPlatformType,
} from './utils';
import { PRODUCT } from './constants';

export type AnalyticsProviderProps = {
  analyticsClient: typeof AnalyticsWebClient;
};

/**
 * AnalyticsProvider component takes care of
    - Provide AnalyticsListener to child components.
    - Every analytic event payload will have eventType in it. It will call appropriate send*Event method of analyticsWebClient based on event type.
    - It also sets channel to `editorSandbox`.
  For more information, checkout https://product-fabric.atlassian.net/wiki/spaces/E/pages/3110895959/HOWTO+Send+analytics+events+in+editor+sandbox#How-analytics-framework-was-added-in-editor-sandbox
 * @param props
 * @returns AnalyticsListener wrapping children.
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = (props) => {
  const { children, analyticsClient } = props;

  const sendEvent: UIAnalyticsEventHandler = useCallback(
    (event) => {
      const payload = event.payload;
      switch (payload.eventType) {
        case EVENT_TYPE.UI:
          analyticsClient.sendUIEvent(payload);
          break;
        case EVENT_TYPE.TRACK:
          analyticsClient.sendTrackEvent(payload);
          break;
        case EVENT_TYPE.OPERATIONAL:
          analyticsClient.sendOperationalEvent(payload);
          break;
        case EVENT_TYPE.SCREEN:
          analyticsClient.sendScreenEvent(
            payload.name,
            null,
            payload.attributes,
          );
          break;
        default:
          break;
      }
    },
    [analyticsClient],
  );

  return (
    <AnalyticsListener channel={PRODUCT} onEvent={sendEvent}>
      {children}
    </AnalyticsListener>
  );
};

/**
 * Create a config object for AnalyticWebClient.
 * Product is hard coded to 'editorSandbox'.
 * Origin is hard coded to 'WEB'
 * @returns Config
 */
export const createAnalyticsConfig = () => {
  const config = {
    env: getEnvironmentFromOrigin(),
    product: PRODUCT,
    version: getBuildInfo().VERSION,
    origin: originType.WEB,
    platform: getPlatformType(),
  };

  return config;
};

/**
 * Creates AnalyticWebClient instance to be used in AnalyticsListener
 * @returns AnalyticWebClient
 */
export const getAnalyticsClient = (): typeof AnalyticsWebClient => {
  const analyticsConfig = createAnalyticsConfig();
  // This service does not have Starget Gateway setup, so using useLegacyUrl with true.
  // More details at https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/measurement/analytics-web-client/
  const client = new AnalyticsWebClient(analyticsConfig, {
    useLegacyUrl: true,
  });
  return client;
};

/**
 * HOC to conveniently provide analytics provider to any component.
 * @param WrappedComponent Component to wrap with AnalyticsProvider
 * @param analyticsClient analyticWebClient to set in AnalyticsListener in AnalyticsProvider.
 * @returns
 */
export function withAnalyticsProvider<T>(
  WrappedComponent: React.ComponentType<T>,
  analyticsClient: typeof AnalyticsWebClient,
) {
  const WithAnalyticsProvider = (props: T) => (
    <AnalyticsProvider analyticsClient={analyticsClient}>
      <WrappedComponent {...props} />
    </AnalyticsProvider>
  );

  WithAnalyticsProvider.displayName = `WithAnalyticsProvider(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithAnalyticsProvider;
}
