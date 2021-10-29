import React, { FC } from 'react';

import { createEventChannel, nestListeners } from '../src';

export type EventPayload = {
  irrelevant: string;
};
const { Listener, useEventDispatch } = createEventChannel<EventPayload>();

// This is just for running tests against the example
export const EVENT_EMITTING_BUTTON_TEST_ID = 'event-emitting-button';
const EventEmittingButton = () => {
  const dispatch = useEventDispatch();

  return (
    <button
      data-testid={EVENT_EMITTING_BUTTON_TEST_ID}
      onClick={() => {
        const payload = {
          irrelevant: 'irrelevant',
        };
        dispatch(payload);
      }}
    >
      Click me!
    </button>
  );
};

const AllListeners: FC = ({ children }) =>
  nestListeners(children, [
    {
      // You probably wouldn't actually render the same lister multiple times. It's just to demo ordering
      Listener,
      onEvent: () => console.log('called', 'last'),
    },
    {
      Listener,
      onEvent: () => console.log('called', 'second'),
    },
    {
      Listener,
      onEvent: () => console.log('called', 'first'),
    },
  ]);

const Example = () => (
  <AllListeners>
    <EventEmittingButton />
  </AllListeners>
);

export default Example;
