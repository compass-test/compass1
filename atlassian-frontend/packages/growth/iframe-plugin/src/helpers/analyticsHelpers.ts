import {
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';

import { GasV3Payload } from '../lib/types';

export interface AnalyticsWebClient {
  sendUIEvent: (event: GasPurePayload) => void;
  sendOperationalEvent: (event: GasPurePayload) => void;
  sendTrackEvent: (event: GasPurePayload) => void;
  sendScreenEvent: (event: GasPureScreenEventPayload) => void;
}

export const analyticsWrapper = (analyticsClient: AnalyticsWebClient) => {
  return (event: GasV3Payload) => {
    return Promise.resolve(analyticsClient).then((client) => {
      switch (event.eventType) {
        case UI_EVENT_TYPE:
          client.sendUIEvent(event);
          break;
        case TRACK_EVENT_TYPE:
          client.sendTrackEvent(event);
          break;
        case OPERATIONAL_EVENT_TYPE:
          client.sendOperationalEvent(event);
          break;
        case SCREEN_EVENT_TYPE: {
          client.sendScreenEvent(event);
          break;
        }
      }
    });
  };
};
