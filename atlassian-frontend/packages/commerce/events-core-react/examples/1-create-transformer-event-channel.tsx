import React, { useCallback } from 'react';

import { createEventChannel, createTransformer } from '../src';

// This is just for running tests against the example
export const BASE_EVENT_EMITTING_BUTTON_TEST_ID = 'base-event-emitting-button';

type BaseEventPayload = {
  baseEventField: string;
};
const {
  Listener: BaseEventListener,
  useEventDispatch: useBaseEventDispatch,
} = createEventChannel<BaseEventPayload>();

const BaseEventEmittingButton = () => {
  const dispatchBaseEvent = useBaseEventDispatch();
  return (
    <button
      data-testid={BASE_EVENT_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchBaseEvent({ baseEventField: 'a-value' })}
    >
      Fire a base event!
    </button>
  );
};

type TransformerProps = {
  anAddedField: string;
};

type TransformedEventPayload = BaseEventPayload & TransformerProps;

const useTransformer = ({ anAddedField }: TransformerProps) =>
  useCallback(
    (originalPayload: BaseEventPayload) => ({
      ...originalPayload,
      anAddedField,
    }),
    [anAddedField],
  );

const {
  Listener: TransformedEventListener,
  useEventDispatch: useTransformedEventDispatch,
} = createEventChannel<TransformedEventPayload>();

const Transformer = createTransformer({
  from: BaseEventListener,
  to: useTransformedEventDispatch,
  useTransformer,
});

const CreateTransformerEventChannelExample = () => (
  <BaseEventListener
    onEvent={(e) => console.log('This will also be called', e)}
  >
    <TransformedEventListener onEvent={(e) => console.log('event', e)}>
      <Transformer anAddedField="another-value">
        <BaseEventEmittingButton />
      </Transformer>
    </TransformedEventListener>
  </BaseEventListener>
);

export default CreateTransformerEventChannelExample;
