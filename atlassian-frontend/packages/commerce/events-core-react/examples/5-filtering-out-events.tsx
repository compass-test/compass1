import React from 'react';

import { createEventChannel, withFilter } from '../src';

export const EVENT_EMITTING_BUTTON_TEST_ID = 'event-emitting-button';
export const FILTERED_EVENT_EMITTING_BUTTON_TEST_ID =
  'filtered-event-emitting-button';

type EventPayload = {
  aField: number;
};
const { Listener, useEventDispatch } = createEventChannel<EventPayload>();

const FilteredListener = withFilter(
  Listener,
  (payload) => payload.aField >= 100,
);

const Event1EmittingButton = () => {
  const dispatchEvent = useEventDispatch();
  return (
    <button
      data-testid={EVENT_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchEvent({ aField: 200 })}
    >
      Emit event
    </button>
  );
};

const Event2EmittingButton = () => {
  const dispatchEvent = useEventDispatch();
  return (
    <button
      data-testid={FILTERED_EVENT_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchEvent({ aField: 1 })}
    >
      Emit event that will get filtered
    </button>
  );
};

const Example = () => (
  <FilteredListener onEvent={console.log}>
    <Event1EmittingButton />
    <Event2EmittingButton />
  </FilteredListener>
);

export default Example;
