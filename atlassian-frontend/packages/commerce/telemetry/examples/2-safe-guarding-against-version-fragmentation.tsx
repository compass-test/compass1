import React, { useCallback } from 'react';

import {
  ChannelVersionFragmentationSafeGuard,
  InternalCommerceTelemetryIntegrations,
} from '../src';
// Pretend this import statement lives inside the dependency's code
import * as DependencyDispatchHooks from '../src/common/utils/dispatch-hooks';
// Pretent this import state lives in the parent package
import { GasV3UIEventListener } from '../src/common/utils/listeners';
// Pretend this is exported as an entrypoint from a dependency
// eslint-disable-next-line no-duplicate-imports
import * as DependencyListeners from '../src/common/utils/listeners';

// For testing this example
export const EXAMPLE_BUTTON_TEST_ID = 'button-test-id';

const EventEmittingButton = () => {
  const dispatch = DependencyDispatchHooks.useGasV3UIEventDispatch();

  return (
    <button
      data-testid={EXAMPLE_BUTTON_TEST_ID}
      onClick={useCallback(() => {
        dispatch({
          action: 'irrelevant',
          actionSubject: 'irrelevant',
          actionSubjectId: 'irrelevant',
        });
      }, [dispatch])}
    >
      Emit to package 1's version of the singleton
    </button>
  );
};

const PretendThisComesFromTheDependency = () => (
  <InternalCommerceTelemetryIntegrations>
    <EventEmittingButton />
  </InternalCommerceTelemetryIntegrations>
);

const Example = () => (
  <GasV3UIEventListener
    onEvent={(payload) =>
      console.log(
        'Even if the child package is using a different version of the singleton, we will still receive the event',
        payload,
      )
    }
  >
    <ChannelVersionFragmentationSafeGuard
      childPackageListenerModules={[DependencyListeners]}
    >
      <PretendThisComesFromTheDependency />
    </ChannelVersionFragmentationSafeGuard>
  </GasV3UIEventListener>
);

export default Example;
