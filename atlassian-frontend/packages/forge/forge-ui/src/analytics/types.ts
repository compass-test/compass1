import {
  GasPurePayload,
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  GasPureScreenEventPayload,
  SCREEN_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';

type ExtensionIdPart = 'appId' | 'environmentId' | 'groupId' | 'extensionKey';

export type ExtensionIdParts = {
  [key in ExtensionIdPart]: string;
};

export interface ForgeUIAnalyticsContext {
  objectId?: string;
  objectType?: string;
  containerId?: string;
  containerType?: string;
  source?: string;
}

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

export type GasV3Payload =
  | GasPurePayloadWithUiEvent
  | GasPurePayloadWithTrackEvent
  | GasPurePayloadWithOperationalEvent
  | GasPurePayloadWithScreenEvent;
