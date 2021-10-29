import React from 'react';

import { FlowControl } from '../../../controllers/use-flow-control/types';

export type StepProps<IN, OUT> = {
  flowControl: FlowControl<OUT>;
  updateFlowState: (result: Partial<IN>) => void;
  flowState: IN;
};

export type FlowStepComponent<IN, OUT> = React.FC<StepProps<IN, OUT>>;

export interface FlowStep<IN, OUT> {
  caption: React.ReactNode;
  component: FlowStepComponent<IN, OUT>;
}
