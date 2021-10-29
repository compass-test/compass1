import {
  GasPurePayload,
  GasPureScreenEventPayload,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

type GasPurePayloadWithUiEvent = GasPurePayload & {
  eventType: typeof UI_EVENT_TYPE;
  action: string;
};
type GasPurePayloadWithTrackEvent = GasPurePayload & {
  eventType: typeof TRACK_EVENT_TYPE;
  action: string;
};
type GasPurePayloadWithOperationalEvent = GasPurePayload & {
  eventType: typeof OPERATIONAL_EVENT_TYPE;
  action: string;
};
type GasPurePayloadWithScreenEvent = GasPureScreenEventPayload & {
  eventType: typeof SCREEN_EVENT_TYPE;
};

export type AnalyticsContext = UIAnalyticsEvent['context'];
export type AnalyticsPayload = UIAnalyticsEvent['payload'];

export type GasV3Payload =
  | GasPurePayloadWithUiEvent
  | GasPurePayloadWithTrackEvent
  | GasPurePayloadWithOperationalEvent
  | GasPurePayloadWithScreenEvent;

export interface AnalyticsWebClientInterface {
  sendUIEvent: (event: GasPurePayload) => void;
  sendOperationalEvent: (event: GasPurePayload) => void;
  sendTrackEvent: (event: GasPurePayload) => void;
  sendScreenEvent: (event: GasPureScreenEventPayload) => void;
}
