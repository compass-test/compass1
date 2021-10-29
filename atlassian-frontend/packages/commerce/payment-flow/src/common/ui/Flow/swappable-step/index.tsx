import React, { useMemo } from 'react';

import { FlowStepComponent, StepProps } from '../step';

export const SwappableStep = <IN, OUT>({
  renderStepACondition,
  StepA,
  StepB,
  ...stepProps
}: {
  renderStepACondition: (data: IN) => boolean;
  StepA: FlowStepComponent<IN, OUT>;
  StepB: FlowStepComponent<IN, OUT>;
} & StepProps<IN, OUT>): ReturnType<FlowStepComponent<IN, OUT>> => {
  const renderStepA = useMemo(() => renderStepACondition(stepProps.flowState), [
    renderStepACondition,
    stepProps.flowState,
  ]);

  if (renderStepA) {
    return <StepA {...stepProps} />;
  } else {
    return <StepB {...stepProps} />;
  }
};
