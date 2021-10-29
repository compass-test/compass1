import React from 'react';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { createEventChannel } from '@atlassian/commerce-events-core-react';

import { createEventChannelToAnalyticsNextRepackager } from '../src';

// This is just used for testing the example works
export const EVENT_Channel_EVENT_EMITTING_BUTTON_TEST_ID = 'my-button-test-id';

export type MyEventPayload = {
  aField: 'a-value';
};

const {
  Listener: EventChannelListener,
  useEventDispatch: useEventChannelEventDispatch,
} = createEventChannel<MyEventPayload>();

const EventChannelEventEmittingButton = () => {
  const disatchEventChannelEvent = useEventChannelEventDispatch();
  return (
    <button
      data-testid={EVENT_Channel_EVENT_EMITTING_BUTTON_TEST_ID}
      onClick={() => disatchEventChannelEvent({ aField: 'a-value' })}
    >
      Fire an Event API event
    </button>
  );
};

export const MY_ANALYTICS_NEXT_CHANNEL = 'my-analytics-next-channel';

const RepackageEventChannelEvent = createEventChannelToAnalyticsNextRepackager(
  EventChannelListener,
  MY_ANALYTICS_NEXT_CHANNEL,
);

const EventChannelToAtlaskit = () => (
  <EventChannelListener
    onEvent={(eventPayload) =>
      console.log('This will also be called', eventPayload)
    }
  >
    <AnalyticsListener
      channel={MY_ANALYTICS_NEXT_CHANNEL}
      onEvent={(event) =>
        console.log('This is an @atlassian/analytics-next event :D', event)
      }
    >
      <RepackageEventChannelEvent>
        <EventChannelEventEmittingButton />
      </RepackageEventChannelEvent>
    </AnalyticsListener>
  </EventChannelListener>
);

export default EventChannelToAtlaskit;
