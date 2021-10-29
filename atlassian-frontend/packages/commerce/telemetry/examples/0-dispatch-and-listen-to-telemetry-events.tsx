import React from 'react';

// Pretend this is in a child package
import { InternalCommerceTelemetryIntegrations } from '../src';
// Pretend this is in a child package
import { useGasV3UIEventDispatch } from '../src/common/utils/dispatch-hooks';
// Pretend this is exported as an entrypoint from a dependency
import { GasV3UIEventListener } from '../src/common/utils/listeners';

// For testing this example
export const EXAMPLE_BUTTON_TEST_ID = 'button-test-id';

const EventEmittingButton = () => {
  const dispatch = useGasV3UIEventDispatch();
  return (
    <button
      data-testid={EXAMPLE_BUTTON_TEST_ID}
      onClick={() => {
        // Just an example - You can utilise @atlassian/commerce-events-telemetry-react/atlaskit for an Atlaskit button
        dispatch({
          action: 'irrelevant',
          actionSubject: 'irrelevant',
          actionSubjectId: 'irrelevant',
        });
      }}
    >
      Click me
    </button>
  );
};

const PretendThisIsExportedFromADependency = () => (
  <InternalCommerceTelemetryIntegrations>
    <EventEmittingButton />
  </InternalCommerceTelemetryIntegrations>
);

const Example = () => (
  <GasV3UIEventListener
    onEvent={() => console.error('This should never be called')}
  >
    <GasV3UIEventListener onEvent={(e) => console.log('ui event', e)}>
      <PretendThisIsExportedFromADependency />
    </GasV3UIEventListener>
  </GasV3UIEventListener>
);

export default Example;
