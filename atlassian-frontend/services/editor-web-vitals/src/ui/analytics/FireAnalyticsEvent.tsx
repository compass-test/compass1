import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import {
  EVENT_TYPE,
  EditorSandboxAnalyticsEventPayload,
  FireAnalyticsEvent,
  WithFireAnalyticsEventsProps,
} from './types';
import { PRODUCT } from './constants';

/**
 * A convenient way to fire analytics event of any specific event type for functional component.
 * useFireAnalyticsEvent hook returns an object with four helper function to fire each type of analytic event.
 * @returns FireAnalyticsEvent
 */
export const useFireAnalyticsEvent = (): FireAnalyticsEvent => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const fireAnalyticEvent = (eventType: EVENT_TYPE) => (
    payload: EditorSandboxAnalyticsEventPayload,
  ) => {
    const analyticsEvent = createAnalyticsEvent({
      ...payload,
      eventType,
      source: 'unknown',
    });
    analyticsEvent.fire(PRODUCT);
  };

  return {
    fireUIAnalyticEvent: fireAnalyticEvent(EVENT_TYPE.UI),
    fireTrackAnalyticEvent: fireAnalyticEvent(EVENT_TYPE.TRACK),
    fireOperationalAnalyticEvent: fireAnalyticEvent(EVENT_TYPE.OPERATIONAL),
    fireScreenAnalyticEvent: fireAnalyticEvent(EVENT_TYPE.SCREEN),
  };
};

/**
 * A convenient way to fire analytics event of any specific event type for functional or class component.
 * withFireAnalyticsEvent HOC provide an object with four helper function to fire
 *  each type of analytic event in prop in WrappedComponent.
 */
export function withFireAnalyticsEvent<T>(
  WrappedComponent: React.ComponentType<T & WithFireAnalyticsEventsProps>,
) {
  const WithFireAnalyticsEvent = (props: T) => {
    const fireAnalyticsEvent = useFireAnalyticsEvent();
    return (
      <WrappedComponent {...props} fireAnalyticsEvent={fireAnalyticsEvent} />
    );
  };

  WithFireAnalyticsEvent.displayName = `WithFireAnalyticsEvent(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithFireAnalyticsEvent;
}
