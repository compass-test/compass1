import {
  createEventChannel,
  EventChannel,
} from '@atlassian/commerce-events-core-react';

export type {
  Listener,
  ListenerInput,
  ListenerProps,
  EventListenerCallback,
  EventChannel,
  EventChannelFactory,
  PropsOfListener,
  EventTypeOfListener,
  TransformCallback,
  UseEventDispatchHook,
  UseTransformerHook,
} from '@atlassian/commerce-events-core-react';

export type Attributes = Record<string, any>;

export type BaseAnalyticsPayload = {
  actionSubject: string;
  action: string;
  attributes?: Attributes;
};

type EventChannelFactory<T> = () => EventChannel<T>;

export const createBaseAnalyticsChannel: EventChannelFactory<BaseAnalyticsPayload> = createEventChannel;

export type BaseToUIAnalyticsProps = {
  actionSubjectId: string;
  attributes?: Attributes;
};
export type UIAnalyticsPayload = BaseToUIAnalyticsProps & BaseAnalyticsPayload;

export const createUIAnalyticsChannel: EventChannelFactory<UIAnalyticsPayload> = createEventChannel;

export const baseToUIAnalyticsEvent = (
  payload: BaseAnalyticsPayload,
  { actionSubjectId, attributes }: BaseToUIAnalyticsProps,
): UIAnalyticsPayload => ({
  ...payload,
  attributes: {
    ...attributes,
    ...payload.attributes,
  },
  actionSubjectId,
});

export type SourcelessUIToUIEventProps = {
  source: string;
  attributes?: Attributes;
};
