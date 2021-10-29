export type FlowControl<T = unknown> = {
  firstStep: boolean;
  hasNextStep: boolean;
  moveBack: (undo?: Partial<T>) => void;
  moveForward: (result: T) => void;
  cancel?: () => void;
};

export type FlowDirection = 'left' | 'right';

export type FlowInProgress = {
  direction?: FlowDirection;
  step: number;
};

export type FlowCompleted = {
  completed: true;
};

export type FlowCanceled = {
  canceled: true;
};

export type FlowState = FlowInProgress | FlowCompleted | FlowCanceled;
