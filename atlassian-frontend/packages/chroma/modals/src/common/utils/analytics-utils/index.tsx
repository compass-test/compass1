import { useCallback } from 'react';

import {
  EventType,
  OPERATIONAL_EVENT_TYPE,
  TRACK_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ANALYTICS_BRIDGE_CHANNEL } from '@atlassian/analytics-bridge';

import { ANALYTICS_SOURCE_NAME } from '../../constants';

import { CustomAttributes, GasPurePayloadWithAction } from './types';

export const baseEvent = <T extends CustomAttributes>(eventType: EventType) => {
  return (properties: T) => {
    const { createAnalyticsEvent } = useAnalyticsEvents();
    //Passing All analytics attributes initialised with upflow
    return useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (attributes?: any) => {
        createAnalyticsEvent({
          source: ANALYTICS_SOURCE_NAME,
          ...properties,
          attributes: {
            ...properties.attributes,
            ...attributes,
          },
          analyticsType: eventType.toLocaleUpperCase(),
        }).fire(ANALYTICS_BRIDGE_CHANNEL);
      },
      // This eslint-disable is temporary
      // and will be fixed along with the hook shortly
      // see go/chroma-exhaustive-deps for more info.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [properties],
    );
  };
};

// For UI and Screen events, use imperative and declarative functional
// components in @atlassian/analytics-bridge fireUIEvent and <FireScreenAnalytics>
export const useOperationalEvent = baseEvent<GasPurePayloadWithAction>(
  OPERATIONAL_EVENT_TYPE,
);
export const useTrackEvent = baseEvent<GasPurePayloadWithAction>(
  TRACK_EVENT_TYPE,
);
