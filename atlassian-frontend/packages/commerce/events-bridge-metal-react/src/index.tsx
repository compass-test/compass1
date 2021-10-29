import React, { PropsWithChildren, useCallback } from 'react';

import ActualMetalClient, {
  catalog,
  UserMetric,
} from '@atlassiansox/metal-client';

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
import { Listener as ListenerType } from '@atlassian/commerce-events-core-react';

export { withClient, combineBridges, withFilter, createTransformer, catalog };

export type {
  UserMetric,
  EventChannelBridge,
  EventChannelFactory,
  EventListenerCallback,
  EventTypeOfListener,
  SendEventsComponent,
  SendEventsProps,
  UseEventDispatchHook,
  UseTransformerHook,
};

// TODO: Would be better if there were separate event channels for each type of metal metric
/**
 * @deprecated
 */
export const createMetalEventChannel: EventChannelFactory<UserMetric> = createEventChannel;
export type SubmitType = ActualMetalClient['metric']['submit'];
export type MetalClientInterface = {
  metric: {
    submit: SubmitType;
  };
};
/**
 * @deprecated
 */
export const createMetalEventChannelBridge = createEventChannelBridgeFactory(
  createMetalEventChannel,
  (client: MetalClientInterface, payload) => client.metric.submit(payload),
);

export type MetalIntegrationProps = PropsWithChildren<{
  client: MetalClientInterface;
  Listener: ListenerType<UserMetric>;
}>;
export const MetalIntegration = ({
  Listener,
  client,
  children,
}: MetalIntegrationProps) => (
  <Listener
    onEvent={useCallback(
      (metalPayload) => {
        client.metric.submit(metalPayload);
      },
      [client],
    )}
  >
    {children}
  </Listener>
);
