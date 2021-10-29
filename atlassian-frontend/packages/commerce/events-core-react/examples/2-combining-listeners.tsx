import React from 'react';

import { combineListeners, createEventChannel } from '../src';

// This is just for running tests against the example
export const EVENT_1_EMITTING_BUTTON_TEST_ID = 'event-emitting-button-1';
export const EVENT_2_EMITTING_BUTTON_TEST_ID = 'event-emitting-button-2';

type Event1Payload = {
  event1Field: string;
};
const {
  Listener: Event1Listener,
  useEventDispatch: useEvent1Dispatch,
} = createEventChannel<Event1Payload>();

type Event2Payload = {
  event2Field: string;
};
const {
  Listener: Event2Listener,
  useEventDispatch: useEvent2Dispatch,
} = createEventChannel<Event2Payload>();

const EventEmittingButton1 = () => {
  const dispatchEvent = useEvent1Dispatch();
  return (
    <button
      data-testid={EVENT_1_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchEvent({ event1Field: 'a-value' })}
    >
      Fire a base event for event channel 1!
    </button>
  );
};

const EventEmittingButton2 = () => {
  const dispatchEvent = useEvent2Dispatch();
  return (
    <button
      data-testid={EVENT_2_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchEvent({ event2Field: 'another-value' })}
    >
      Fire a base event for event channel 2!
    </button>
  );
};

// Realistically, you'll probably only want to combine two listeners of the same event shape
const CombinedListener = combineListeners(Event1Listener, Event2Listener);

const CombineListenersExample = () => (
  <CombinedListener onEvent={(e) => console.log('event', e)}>
    <EventEmittingButton1 />
    <EventEmittingButton2 />
  </CombinedListener>
);

export default CombineListenersExample;
