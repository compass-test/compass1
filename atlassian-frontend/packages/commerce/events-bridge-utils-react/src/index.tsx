import React, { FC, PropsWithChildren, useCallback } from 'react';

import {
  EventChannel,
  EventChannelFactory,
} from '@atlassian/commerce-events-core-react';
export type {
  EventChannel,
  EventChannelFactory,
  EventListenerCallback,
  EventTypeOfListener,
  UseEventDispatchHook,
  UseTransformerHook,
} from '@atlassian/commerce-events-core-react';
export {
  createEventChannel,
  withFilter,
  createTransformer,
} from '@atlassian/commerce-events-core-react';

export type SendEventCallback<ClientType, PayloadType> = (
  client: ClientType,
  payload: PayloadType,
) => any;

export type SendEventsProps<ClientType> = PropsWithChildren<{
  client: ClientType;
}>;
export type SendEventsComponent<ClientType> = FC<SendEventsProps<ClientType>>;
export type EventChannelBridge<ClientType, PayloadType> = {
  eventChannel: EventChannel<PayloadType>;
  Bridge: SendEventsComponent<ClientType>;
};
export const createEventChannelBridgeFactory = <ClientType, PayloadType>(
  eventChannelFactory: EventChannelFactory<PayloadType>,
  sendPayloadCallack: SendEventCallback<ClientType, PayloadType>,
) => (
  eventChannel: EventChannel<PayloadType> = eventChannelFactory(),
): EventChannelBridge<ClientType, PayloadType> => {
  const Bridge = ({ client, children }: SendEventsProps<ClientType>) => (
    <eventChannel.Listener
      onEvent={useCallback(
        (payload) => {
          sendPayloadCallack(client, payload);
          return payload;
        },
        [client],
      )}
    >
      {children}
    </eventChannel.Listener>
  );

  return {
    /**
     * @internal
     * Used by integration packages
     */
    eventChannel,
    Bridge,
  };
};

export const withClient = <ClientType extends object>(
  client: ClientType,
  Component: SendEventsComponent<ClientType>,
) => ({ children }: PropsWithChildren<{}>) => (
  <Component client={client}>{children}</Component>
);

export type ClientTypeOfSendEventsComponent<T> = T extends SendEventsComponent<
  infer K
>
  ? K
  : never;

type ItemFromArray<T> = T extends Array<infer K> ? K : never;

export type CombinedSendEventsComponent<
  SendEventsComponentsType extends SendEventsComponent<any>[]
> = SendEventsComponent<
  ClientTypeOfSendEventsComponent<ItemFromArray<SendEventsComponentsType>>
>;

export const combineBridges = <
  SendEventsComponentsType extends SendEventsComponent<any>[]
>(
  ...bridges: SendEventsComponentsType
): CombinedSendEventsComponent<SendEventsComponentsType> => {
  const CombinedSendEvents: CombinedSendEventsComponent<SendEventsComponentsType> = ({
    children,
    client,
  }) => {
    let wrappedChildren = children;

    for (const SendEventsComponent of bridges) {
      wrappedChildren = SendEventsComponent({
        client,
        children: wrappedChildren,
      });
    }

    return <>{wrappedChildren}</>;
  };

  return CombinedSendEvents;
};

// TODO: Better types
export const renderCombined = (
  children: any,
  components: FC<PropsWithChildren<{}>>[],
) => {
  let wrappedChildren = children;
  for (const Component of components) {
    wrappedChildren = <Component>{wrappedChildren}</Component>;
  }

  return wrappedChildren;
};
