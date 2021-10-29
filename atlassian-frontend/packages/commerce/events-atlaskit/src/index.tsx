import React, { FC, PropsWithChildren, useCallback } from 'react';

import {
  AnalyticsListener,
  useAnalyticsEvents,
} from '@atlaskit/analytics-next';
import {
  EventChannel,
  EventListenerCallback,
  Listener,
  ListenerInput,
  ListenerProps,
  TransformCallback,
  TransformerObject,
  UseEventDispatchHook,
  UseTransformerHook,
} from '@atlassian/commerce-events-core-react';
import {
  BaseToUIAnalyticsProps,
  UIAnalyticsPayload,
} from '@atlassian/commerce-events-ui-react';

import { ATLASKIT_CHANNEL } from './common/constants';

export type {
  BaseToUIAnalyticsProps,
  UIAnalyticsPayload,
  Listener,
  ListenerInput,
  ListenerProps,
  EventChannel,
  EventListenerCallback,
  UseEventDispatchHook,
  UseTransformerHook,
  TransformCallback,
  TransformerObject,
};

/**
 * Lets your treat analytics-next events as a Event API events.
 * Also see {@link createAtlaskitToEventChannelRepackager} if you just want to repackage "atlaskit" channel events.
 */
export const createAnalyticsNextToEventChannelRepackager = <
  TransformerPropsType extends object,
  OutputEventType extends any
>(
  useEventDispatch: UseEventDispatchHook<OutputEventType>,
  channel: string,
): React.FC<TransformerPropsType> => {
  const RepackageAnalyticsNextEvent = ({
    children,
    ...uiProperties
  }: PropsWithChildren<TransformerPropsType>) => {
    const dispatchAnalytics = useEventDispatch();
    const repackageAtlaskitEvent = useCallback(
      (event) => {
        dispatchAnalytics({
          ...uiProperties,
          ...event.payload,
          attributes: {
            ...(uiProperties as any).attributes,
            ...event.payload.attributes,
          },
        });
      },
      [dispatchAnalytics, uiProperties],
    );

    return (
      <AnalyticsListener channel={channel} onEvent={repackageAtlaskitEvent}>
        {children}
      </AnalyticsListener>
    );
  };

  return RepackageAnalyticsNextEvent;
};

/**
 * Lets your treat atlaskit events as a event channel created from {@link createBaseAnalyticsChannel}.
 * The atlaskit channel gets its own special helper method because it's such a common usecase.
 */
export const createAtlaskitToEventChannelRepackager = (
  // TODO: Technically, we can make the type more specific than just UIAnalyticsPayload
  useEventDispatch: UseEventDispatchHook<UIAnalyticsPayload>,
): FC<BaseToUIAnalyticsProps> => {
  const RepackageAtlaskitEvent = createAnalyticsNextToEventChannelRepackager<
    BaseToUIAnalyticsProps,
    UIAnalyticsPayload
  >(useEventDispatch, 'atlaskit');

  return RepackageAtlaskitEvent;
};

export type EventChannelToAtlaskitRepackager = FC<PropsWithChildren<{}>>;
/**
 * Returns an object that listens to events and fires them as an Atlaskit event on a
 * specified channel
 */
export const createEventChannelToAnalyticsNextRepackager = <T extends object>(
  Listener: Listener<T>,
  channel: string = ATLASKIT_CHANNEL,
): EventChannelToAtlaskitRepackager => {
  return ({ children }: PropsWithChildren<{}>) => {
    const { createAnalyticsEvent } = useAnalyticsEvents();
    const fireAsAtlaskitEvent = useCallback(
      (payload) => {
        createAnalyticsEvent(payload).fire(channel);
      },
      [createAnalyticsEvent],
    );

    return <Listener onEvent={fireAsAtlaskitEvent}>{children}</Listener>;
  };
};
