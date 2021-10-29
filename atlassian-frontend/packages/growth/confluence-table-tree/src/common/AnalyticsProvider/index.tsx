import React, { useCallback } from 'react';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import {
  extractAWCDataFromEvent,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
  ANALYTICS_BRIDGE_CHANNEL,
} from '@atlassian/analytics-bridge';

export type Props = {
  children?: React.ReactNode;
  analyticsClient: typeof AnalyticsWebClient;
};

export const AnalyticsProvider: React.FC<Props> = ({
  children,
  analyticsClient,
}) => {
  const sendEvent = useCallback(
    (event) => {
      const { type, payload } = event;
      switch (type) {
        case UI_EVENT_TYPE:
          analyticsClient.sendUIEvent(payload);
          break;
        case TRACK_EVENT_TYPE:
          analyticsClient.sendTrackEvent(payload);
          break;
        case OPERATIONAL_EVENT_TYPE:
          analyticsClient.sendOperationalEvent(payload);
          break;
        case SCREEN_EVENT_TYPE:
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
    <AnalyticsListener
      channel={ANALYTICS_BRIDGE_CHANNEL}
      onEvent={(event) => sendEvent(extractAWCDataFromEvent(event))}
    >
      {children}
    </AnalyticsListener>
  );
};
