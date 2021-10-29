import React, { useEffect, useMemo, useRef } from 'react';

import { ProgressTracker } from '@atlaskit/progress-tracker';
import Spinner from '@atlaskit/spinner';
import { TaskGap } from '@atlassian/commerce-layout';

import { useFlowControl } from '../../controllers/use-flow-control';
import {
  FlowControl,
  FlowInProgress,
} from '../../controllers/use-flow-control/types';
import {
  isCanceledState,
  isCompleteState,
  isFinishedState,
} from '../../controllers/use-flow-control/utils';
import { useFlowData } from '../../controllers/use-flow-data';

import { FlowStep } from './step';
import { Centered, TransitionLayout } from './styled';

export type FlowDefinition = {
  steps: FlowStep<any, any>[];
  initialState?: any;
};
export type FlowProps<K = any> = {
  /**
   * definition of the flow
   */
  definition: FlowDefinition;

  /**
   * called on complition
   * @param data
   */
  onComplete(data: K): void;

  /**
   * cancel submission
   */
  onCancel?(): void;

  /**
   * displays overall flow progress
   * @default true
   */
  displayProgress?: boolean;
};

const FlowInProgressComponent: React.FC<{
  controlState: FlowInProgress;
  steps: FlowDefinition['steps'];
  control: FlowControl<any>;
  flowData: any;
  updateFlowData: (partial: any) => void;
  displayProgress?: boolean;
}> = ({
  flowData,
  updateFlowData,
  control,
  steps,
  controlState: { step, direction },
  displayProgress = true,
}) => {
  const stepProgress = useMemo(
    () =>
      steps.map(({ caption }, index) => ({
        id: String(index),
        label: caption as string,
        percentageComplete: index < step ? 100 : 0,
        status: (index === step
          ? 'current'
          : index < step
          ? 'visited'
          : 'unvisited') as any, // StatusType is not exported
      })),
    [step, steps],
  );

  const { component: Step } = steps[step];

  const headerRef = useRef<HTMLElement>(null);
  // reset scroll to the header on step change
  useEffect(() => {
    // scrollIntoView might not exists in tests
    headerRef.current?.scrollIntoView?.();
  }, [step]);

  return (
    <article>
      <header ref={headerRef}>
        {displayProgress && <ProgressTracker items={stepProgress} />}
      </header>
      <TaskGap />
      <TransitionLayout direction={direction} step={step}>
        <Step
          flowControl={control}
          updateFlowState={updateFlowData}
          flowState={flowData}
        />
      </TransitionLayout>
    </article>
  );
};

export const Flow = <T extends object = {}>({
  definition: { steps, initialState },
  onComplete,
  onCancel,
  displayProgress,
}: FlowProps<T>) => {
  const { flowData, updateFlowData } = useFlowData(initialState);

  const { state, control } = useFlowControl({
    cancelable: !!onCancel,
    updateFlowData,
    numberOfSteps: steps.length,
  });

  useEffect(() => {
    if (isCompleteState(state)) {
      onComplete(flowData);
    }
  }, [flowData, onComplete, state]);

  useEffect(() => {
    if (isCanceledState(state) && onCancel) {
      onCancel();
    }
  }, [onCancel, state]);

  if (isFinishedState(state)) {
    // on complete handler should hide the flow
    // for the time being we display the spinner so user can no longer interact with the flow that was completed
    return (
      <Centered>
        <Spinner size="large" />
      </Centered>
    );
  }
  return (
    <FlowInProgressComponent
      updateFlowData={updateFlowData}
      flowData={flowData}
      control={control}
      controlState={state}
      displayProgress={displayProgress}
      steps={steps}
    />
  );
};

export const defineFlow = <
  INIT extends IN1,
  IN1 extends object,
  OUT1 extends Omit<IN2, keyof INIT>,
  IN2 extends object,
  OUT2 extends Omit<IN3, keyof (INIT & OUT1)>,
  IN3 extends object,
  OUT3 extends object
>(
  initialState: INIT,
  step1: FlowStep<IN1, OUT1>,
  step2?: FlowStep<IN2, OUT2>,
  step3?: FlowStep<IN3, OUT3>,
): FlowDefinition =>
  ({
    initialState: initialState,
    steps: [step1, step2, step3].filter((it) => !!it),
  } as FlowDefinition);
