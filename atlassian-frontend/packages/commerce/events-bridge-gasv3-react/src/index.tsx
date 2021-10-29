import React, { PropsWithChildren, useCallback } from 'react';

import type {
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
} from '@atlassian/commerce-analytics-web-client-types';
import {
  combineBridges,
  createEventChannel,
  createEventChannelBridgeFactory,
  createTransformer,
  EventChannelBridge,
  EventChannelFactory,
  EventListenerCallback,
  EventTypeOfListener,
  SendEventsComponent,
  SendEventsProps,
  UseEventDispatchHook,
  UseTransformerHook,
  withClient,
  withFilter,
} from '@atlassian/commerce-events-bridge-utils-react';
import {
  Listener as ListenerType,
  nestListeners,
} from '@atlassian/commerce-events-core-react';

export { withClient, combineBridges, withFilter, createTransformer };

export type {
  EventChannelBridge,
  EventChannelFactory,
  SendEventsProps,
  SendEventsComponent,
  EventListenerCallback,
  EventTypeOfListener,
  UseEventDispatchHook,
  UseTransformerHook,
  Attributes,
  UIEventPayload,
  UIEventClientType,
  ScreenEventPayload,
  ScreenEventClientType,
  TrackEventPayload,
  TrackEventClientType,
  OperationalEventPayload,
  OperationalEventClientType,
  AnalyticsWebClientType,
};

const createGasV3UIEventChannel: EventChannelFactory<UIEventPayload> = createEventChannel;
/**
 * @deprecated
 */
export const createGasV3UIEventChannelBridge = createEventChannelBridgeFactory(
  createGasV3UIEventChannel,
  (client: UIEventClientType, payload) => client.sendUIEvent(payload),
);
const createGasV3ScreenEventChannel: EventChannelFactory<ScreenEventPayload> = createEventChannel;
/**
 * @deprecated
 */
export const createGasV3ScreenEventChannelBridge = createEventChannelBridgeFactory(
  createGasV3ScreenEventChannel,
  (client: ScreenEventClientType, payload) => client.sendScreenEvent(payload),
);

const createGasV3TrackEventChannel: EventChannelFactory<TrackEventPayload> = createEventChannel;
/**
 * @deprecated
 */
export const createGasV3TrackEventChannelBridge = createEventChannelBridgeFactory(
  createGasV3TrackEventChannel,
  (client: TrackEventClientType, payload) => client.sendTrackEvent(payload),
);

const createGasV3OperationalEventChannel: EventChannelFactory<OperationalEventPayload> = createEventChannel;
/**
 * @deprecated
 */
export const createGasV3OperationalEventChannelBridge = createEventChannelBridgeFactory(
  createGasV3OperationalEventChannel,
  (client: OperationalEventClientType, payload) =>
    client.sendOperationalEvent(payload),
);

export type AnalyticsWebClientSendEventsProps = PropsWithChildren<{
  client: AnalyticsWebClientType;
}>;
/**
 * @deprecated
 */
export const createGasV3EventChannelBridge = () => {
  const ui = createGasV3UIEventChannelBridge();
  const screen = createGasV3ScreenEventChannelBridge();
  const track = createGasV3TrackEventChannelBridge();
  const operational = createGasV3OperationalEventChannelBridge();

  const Bridge = ({ children, client }: AnalyticsWebClientSendEventsProps) => (
    <ui.Bridge client={client}>
      <screen.Bridge client={client}>
        <track.Bridge client={client}>
          <operational.Bridge client={client}>{children}</operational.Bridge>
        </track.Bridge>
      </screen.Bridge>
    </ui.Bridge>
  );

  return {
    /**
     * @internal
     * Used by integration packages
     */
    ui,
    /**
     * @internal
     * Used by integration packages
     */
    screen,
    /**
     * @internal
     * Used by integration packages
     */
    track,
    /**
     * @internal
     * Used by integration packages
     */
    operational,
    /**
     * A component that listens to GasV3 events being dispatched by its children and
     * sends them using the {@link AnalyticsWebClientType}.
     */
    Bridge,
  };
};

export type GasV3IntegrationProps = PropsWithChildren<{
  client: AnalyticsWebClientType;
  GasV3UIEventListener: ListenerType<UIEventPayload>;
  GasV3ScreenEventListener: ListenerType<ScreenEventPayload>;
  GasV3TrackEventListener: ListenerType<TrackEventPayload>;
  GasV3OperationalEventListener: ListenerType<OperationalEventPayload>;
}>;
export const GasV3Integration = ({
  client,
  GasV3UIEventListener,
  GasV3ScreenEventListener,
  GasV3TrackEventListener,
  GasV3OperationalEventListener,
  children,
}: GasV3IntegrationProps) =>
  nestListeners(children, [
    {
      Listener: GasV3UIEventListener,
      onEvent: useCallback((payload) => client.sendUIEvent(payload), [client]),
    },
    {
      Listener: GasV3ScreenEventListener,
      onEvent: useCallback((payload) => client.sendScreenEvent(payload), [
        client,
      ]),
    },
    {
      Listener: GasV3TrackEventListener,
      onEvent: useCallback((payload) => client.sendTrackEvent(payload), [
        client,
      ]),
    },
    {
      Listener: GasV3OperationalEventListener,
      onEvent: useCallback((payload) => client.sendOperationalEvent(payload), [
        client,
      ]),
    },
  ]);
