import React, { useCallback } from 'react';

import { createEventChannel, createTransformer } from '../src';

// This is just for running tests against the example
export const BASE_EVENT_1_EMITTING_BUTTON_TEST_ID =
  'base-event-emitting-button-1';
export const BASE_EVENT_2_EMITTING_BUTTON_TEST_ID =
  'base-event-emitting-button-2';

type BaseEvent1Payload = {
  baseEvent1Field: string;
};
const {
  Listener: BaseEvent1Listener,
  useEventDispatch: useBaseEvent1Dispatch,
} = createEventChannel<BaseEvent1Payload>();

type BaseEvent2Payload = {
  baseEvent2Field: string;
};
const {
  Listener: BaseEvent2Listener,
  useEventDispatch: useBaseEvent2Dispatch,
} = createEventChannel<BaseEvent2Payload>();

const BaseEventEmittingButton1 = () => {
  const dispatchBaseEvent = useBaseEvent1Dispatch();
  return (
    <button
      data-testid={BASE_EVENT_1_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchBaseEvent({ baseEvent1Field: 'a-value' })}
    >
      Fire a base event for event channel 1!
    </button>
  );
};

const BaseEventEmittingButton2 = () => {
  const dispatchBaseEvent = useBaseEvent2Dispatch();
  return (
    <button
      data-testid={BASE_EVENT_2_EMITTING_BUTTON_TEST_ID}
      onClick={() => dispatchBaseEvent({ baseEvent2Field: 'another-value' })}
    >
      Fire a base event for event channel 2!
    </button>
  );
};

type TransformerProps = {
  anAddedField: string;
};

type TransformedEvent1Payload = BaseEvent1Payload & TransformerProps;
type TransformedEvent2Payload = BaseEvent2Payload & TransformerProps;

const useTransformer = ({ anAddedField }: TransformerProps) =>
  useCallback(
    (originalPayload: BaseEvent1Payload | BaseEvent2Payload) => ({
      ...originalPayload,
      anAddedField,
    }),
    [anAddedField],
  );

const {
  Listener: TransformedEventListener,
  useEventDispatch: useTransformedEventDispatch,
} = createEventChannel<TransformedEvent1Payload | TransformedEvent2Payload>();

const Transformer = createTransformer({
  // Realistically, you'll probably only want to combine two listeners that share the same event shape
  from: [BaseEvent1Listener, BaseEvent2Listener],
  to: useTransformedEventDispatch,
  useTransformer,
});

const TransformMultipleChannelsExample = () => (
  <TransformedEventListener onEvent={(e) => console.log('event', e)}>
    <Transformer anAddedField="yet-another-value">
      <BaseEventEmittingButton1 />
      <BaseEventEmittingButton2 />
    </Transformer>
  </TransformedEventListener>
);

export default TransformMultipleChannelsExample;
