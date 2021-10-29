import {
  externalGasV3OperationalEventChannel,
  externalGasV3ScreenEventChannel,
  externalGasV3TrackEventChannel,
  externalGasV3UIEventChannel,
  externalMetalChannel,
  externalSentryExceptionChannel,
} from '../channels';

export type {
  Listener,
  ListenerProps,
  ListenerInput,
} from '@atlassian/commerce-events-telemetry-react/core';
export type {
  EventHint,
  CaptureExceptionPayload,
} from '@atlassian/commerce-events-telemetry-react/sentry-browser-bridge';
export type { UserMetric } from '@atlassian/commerce-events-telemetry-react/metal-bridge';

export type {
  AnalyticsWebClientType,
  Attributes,
  OperationalEventClientType,
  OperationalEventPayload,
  ScreenEventClientType,
  ScreenEventPayload,
  TrackEventClientType,
  TrackEventPayload,
  UIEventClientType,
  UIEventPayload,
} from '@atlassian/commerce-events-telemetry-react/gasv3-bridge';
export const { Listener: GasV3UIEventListener } = externalGasV3UIEventChannel;
export const {
  Listener: GasV3ScreenEventListener,
} = externalGasV3ScreenEventChannel;
export const {
  Listener: GasV3TrackEventListener,
} = externalGasV3TrackEventChannel;
export const {
  Listener: GasV3OperationalEventListener,
} = externalGasV3OperationalEventChannel;

export const { Listener: MetalListener } = externalMetalChannel;

export const {
  Listener: SentryExceptionListener,
} = externalSentryExceptionChannel;
