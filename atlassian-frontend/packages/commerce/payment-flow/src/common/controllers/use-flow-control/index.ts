import { useMemo, useState } from 'react';

import { batchedUpdate } from '@atlaskit/commerce-react';

import { FlowControl, FlowState } from './types';
import { isFinishedState, isInProgressState } from './utils';

export const useFlowControl = ({
  cancelable,
  updateFlowData,
  numberOfSteps,
}: {
  updateFlowData: (data: any) => void;
  cancelable: boolean;
  numberOfSteps: number;
}): {
  control: FlowControl;
  state: FlowState;
} => {
  const [state, setState] = useState<FlowState>({
    step: 0,
    direction: undefined,
  });

  const control = useMemo(() => {
    const firstStep = isInProgressState(state) && state.step === 0;
    const hasNextStep =
      isInProgressState(state) && state.step + 1 < numberOfSteps;

    return {
      moveBack: (stateUpdate?: any) => {
        if (isFinishedState(state)) {
          return;
        }
        // we need to apply these two updates simultaneously
        batchedUpdate(() => {
          if (stateUpdate) {
            updateFlowData(stateUpdate);
          }
          setState({
            step: Math.max(0, state.step - 1),
            direction: 'left',
          });
        });
      },
      moveForward: (stateUpdate: any) => {
        batchedUpdate(() => {
          updateFlowData(stateUpdate);
          if (isInProgressState(state) && hasNextStep) {
            setState({
              step: state.step + 1,
              direction: 'right',
            });
          } else {
            setState({
              completed: true,
            });
          }
        });
      },
      cancel: cancelable
        ? () => {
            setState({
              canceled: true,
            });
          }
        : undefined,
      hasNextStep,
      firstStep,
    };
  }, [state, numberOfSteps, updateFlowData, cancelable]);

  return {
    state,
    control,
  };
};
