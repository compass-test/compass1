/* eslint-disable no-console */
import React, { PropsWithChildren, useCallback } from 'react';

import { createEventChannel } from '../src';

// This is just for running tests against the example
export const EVENT_EMITTING_BUTTON_TEST_ID = 'event-emitting-button';

type MyEventPayload = {
  youCanPutWhateverYouWantInThisPayload: string;
};

const { Listener, useEventDispatch } = createEventChannel<MyEventPayload>();

export type EventEmittingButtonPros = PropsWithChildren<{ testId: string }>;
const EventEmittingButton = ({ children, testId }: EventEmittingButtonPros) => {
  const fireEvent = useEventDispatch();
  const onClickCallback = useCallback(() => {
    fireEvent({
      youCanPutWhateverYouWantInThisPayload:
        'So long as it abides by the TypeScript types',
    });
  }, [fireEvent]);

  return (
    <button data-testid={testId} onClick={onClickCallback}>
      {children}
    </button>
  );
};

const CreateEventChannelExample = () => (
  <Listener
    onEvent={(event) => {
      console.log('This will also get called', event);
    }}
  >
    <Listener
      onEvent={(event) => {
        console.log('Received event', event);
      }}
    >
      <EventEmittingButton testId={EVENT_EMITTING_BUTTON_TEST_ID}>
        Click with listener
      </EventEmittingButton>
    </Listener>
  </Listener>
);

export default CreateEventChannelExample;
