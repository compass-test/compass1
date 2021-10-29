import React from 'react';

import {
  AnalyticsWebClientType,
  Attributes,
  GasV3Integration as BaseGasV3Integration,
  GasV3IntegrationProps as BaseGasV3IntegrationProps,
  OperationalEventClientType,
  OperationalEventPayload,
  ScreenEventClientType,
  ScreenEventPayload,
  TrackEventClientType,
  TrackEventPayload,
  UIEventClientType,
  UIEventPayload,
} from '@atlassian/commerce-events-telemetry-react/gasv3-bridge';
export type {
  Listener as ListenerType,
  ListenerProps,
  ListenerInput,
} from '@atlassian/commerce-events-telemetry-react/core';
import {
  MetalIntegration as BaseMetalIntegration,
  MetalIntegrationProps as BaseMetalIntegrationProps,
  MetalClientInterface,
  UserMetric,
} from '@atlassian/commerce-events-telemetry-react/metal-bridge';
import {
  SentryBrowserIntegration as BaseSentryBrowserIntegration,
  SentryBrowserIntegrationProps as BaseSentryBrowserIntegrationProps,
  CaptureExceptionClient,
  CaptureExceptionPayload,
  EventHint,
} from '@atlassian/commerce-events-telemetry-react/sentry-browser-bridge';

import {
  GasV3OperationalEventListener,
  GasV3ScreenEventListener,
  GasV3TrackEventListener,
  GasV3UIEventListener,
  MetalListener,
  SentryExceptionListener,
} from '../listeners';

export type {
  EventHint,
  CaptureExceptionPayload,
  UserMetric,
  CaptureExceptionClient,
  MetalClientInterface,
  BaseGasV3IntegrationProps,
  BaseMetalIntegrationProps,
  BaseSentryBrowserIntegrationProps,
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
};

export type GasV3IntegrationProps = Omit<
  BaseGasV3IntegrationProps,
  | 'GasV3OperationalEventListener'
  | 'GasV3ScreenEventListener'
  | 'GasV3TrackEventListener'
  | 'GasV3UIEventListener'
>;
export const GasV3Integration = ({
  children,
  client,
}: GasV3IntegrationProps) => (
  <BaseGasV3Integration
    client={client}
    GasV3OperationalEventListener={GasV3OperationalEventListener}
    GasV3ScreenEventListener={GasV3ScreenEventListener}
    GasV3TrackEventListener={GasV3TrackEventListener}
    GasV3UIEventListener={GasV3UIEventListener}
  >
    {children}
  </BaseGasV3Integration>
);

export type MetalIntegrationProps = Omit<BaseMetalIntegrationProps, 'Listener'>;
export const MetalIntegration = ({
  children,
  client,
}: MetalIntegrationProps) => (
  <BaseMetalIntegration client={client} Listener={MetalListener}>
    {children}
  </BaseMetalIntegration>
);

export type SentryBrowserIntegrationProps = Omit<
  BaseSentryBrowserIntegrationProps,
  'Listener'
>;
export const SentryBrowserIntegration = ({
  children,
  client,
}: SentryBrowserIntegrationProps) => (
  <BaseSentryBrowserIntegration
    client={client}
    Listener={SentryExceptionListener}
  >
    {children}
  </BaseSentryBrowserIntegration>
);
