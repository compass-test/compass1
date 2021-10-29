import React from 'react';

import { InternalCommerceTelemetryIntegrations } from '../src';
import { useGasV3UIEventDispatch } from '../src/common/utils/dispatch-hooks';
import { GasV3UIEventListener } from '../src/common/utils/listeners';

// For testing this example
export const EXAMPLE_BUTTON_TEST_ID = 'button-test-id';

const GasV3UIEventEmittingButton = () => {
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

const Example = () => (
  <GasV3UIEventListener
    onEvent={(e) => console.log('This should still be triggered', e)}
  >
    <InternalCommerceTelemetryIntegrations>
      <GasV3UIEventEmittingButton />
    </InternalCommerceTelemetryIntegrations>
  </GasV3UIEventListener>
);

export default Example;
