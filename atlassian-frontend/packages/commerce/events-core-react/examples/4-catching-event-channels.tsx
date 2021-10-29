import React, { FC } from 'react';

import { createCatchingEventChannel } from '../src';

export const EVENT_EMITTING_BUTTON_1_TEST_ID = 'event-emitting-button-1';
export const EVENT_EMITTING_BUTTON_2_TEST_ID = 'event-emitting-button-2';

export type EventPayload = {
  someEventPayloadField: string;
};

const defaultCallback = (event: EventPayload) => {
  console.warn(
    'A default callback can be used to warn consumers of the API that' +
      ' they are not using providing their own listener.' +
      "Note that you don't actually have to provide a default callback if you don't want to",
    event,
  );
};
const { Listener, useEventDispatch } = createCatchingEventChannel(
  defaultCallback,
);

const EventEmittingButton: FC = (props) => {
  const dispatchEvent = useEventDispatch();
  return (
    <button
      {...props}
      onClick={() => dispatchEvent({ someEventPayloadField: 'a value' })}
    />
  );
};

const Example = () => (
  <>
    <Listener
      onEvent={(e) => console.error('This should never get triggerred', e)}
    >
      <Listener
        onEvent={(e) => console.log('This callback will get triggered', e)}
      >
        <EventEmittingButton data-testid={EVENT_EMITTING_BUTTON_1_TEST_ID}>
          Trigger event caught by inner listener
        </EventEmittingButton>
      </Listener>
    </Listener>
    <EventEmittingButton data-testid={EVENT_EMITTING_BUTTON_2_TEST_ID}>
      Trigger event caught by default callback
    </EventEmittingButton>
  </>
);

export default Example;
