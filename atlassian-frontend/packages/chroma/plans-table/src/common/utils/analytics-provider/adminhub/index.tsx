import React, { useCallback } from 'react';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import {
  ANALYTICS_BRIDGE_CHANNEL,
  extractAWCDataFromEvent,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlassian/analytics-bridge';

import { ANALYTICS_SOURCE_NAME } from '../../../types';

import {
  AdminHubOperationalEvent,
  AdminHubScreenEvent,
  AdminHubTrackEvent,
  AdminHubUIEvent,
} from './types';

// The analytics provider implementation for Admin Hub product will
// capture all analytics events sent to analyticsBridge channel and
// massage the event data into a format that is expected by the Admin Hub's
// analytics web client.
const validateActionEvent = (event: any) => {
  if (!event) {
    throw new Error('Missing event');
  }

  if (!event.source) {
    throw new Error('Missing event.source');
  }

  if (!event.actionSubject) {
    throw new Error('Missing event.actionSubject');
  }

  if (!event.action) {
    throw new Error('Missing event.action');
  }
};

export const validateScreenEvent = (screenEvent: AdminHubScreenEvent) => {
  if (!screenEvent.data.name) {
    throw new Error('Missing name');
  }
};

export const validateTrackEvent = (trackEvent: AdminHubTrackEvent) => {
  validateActionEvent(trackEvent.data);
};

export const validateUIEvent = (uiEvent: AdminHubUIEvent) => {
  validateActionEvent(uiEvent.data);
};

export const validateOperationalEvent = (
  operationalEvent: AdminHubOperationalEvent,
) => {
  validateActionEvent(operationalEvent.data);
};

export type AdminHubAnalyticsProviderProps = {
  children?: React.ReactNode;
  analyticsClient: typeof AnalyticsWebClient;
};

export const AdminHubAnalyticsProvider = ({
  children,
  analyticsClient,
}: AdminHubAnalyticsProviderProps): React.ReactElement => {
  const sendEvent = useCallback(
    (source, event) => {
      const { type, payload } = event;
      if (!payload.source) {
        payload.source = source ? source : ANALYTICS_SOURCE_NAME;
      }
      const adminHubEvent = { data: payload };
      switch (type) {
        case UI_EVENT_TYPE:
          validateUIEvent(adminHubEvent);
          analyticsClient.sendUIEvent(adminHubEvent);
          break;
        case TRACK_EVENT_TYPE:
          validateTrackEvent(adminHubEvent);
          analyticsClient.sendTrackEvent(adminHubEvent);
          break;
        case OPERATIONAL_EVENT_TYPE:
          validateOperationalEvent(adminHubEvent);
          analyticsClient.sendOperationalEvent(adminHubEvent);
          break;
        case SCREEN_EVENT_TYPE:
          validateScreenEvent(adminHubEvent);
          analyticsClient.sendScreenEvent(adminHubEvent);
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
      onEvent={event =>
        sendEvent(event.payload.source, extractAWCDataFromEvent(event))
      }
    >
      {children}
    </AnalyticsListener>
  );
};
