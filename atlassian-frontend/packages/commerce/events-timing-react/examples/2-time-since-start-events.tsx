import React from 'react';

import { createEventChannel } from '@atlassian/commerce-events-core-react';

import { createTimingChannel, useTimeSinceStartEventDispatch } from '../src';

// For testing this example
export const BUTTON_TEST_ID = 'my-button';

const {
  useStartTimeRef,
  StartTimeRecorder,
  StartTimeProvider,
} = createTimingChannel();
const eventChannel = createEventChannel<number>();

const EventEmittingButton = () => {
  const eventDispatch = useTimeSinceStartEventDispatch(
    useStartTimeRef,
    eventChannel,
  );

  return (
    <button data-testId={BUTTON_TEST_ID} onClick={eventDispatch}>
      Emit an event
    </button>
  );
};

const Example = () => (
  <StartTimeProvider>
    <StartTimeRecorder />
    <eventChannel.Listener onEvent={(e) => console.log('received event', e)}>
      <EventEmittingButton />
    </eventChannel.Listener>
  </StartTimeProvider>
);

export default Example;
