import {
  FlowCanceled,
  FlowCompleted,
  FlowInProgress,
  FlowState,
} from './types';

export const isCompleteState = (state: FlowState): state is FlowCompleted =>
  (state as FlowCompleted).completed;

export const isCanceledState = (state: FlowState): state is FlowCanceled =>
  (state as FlowCanceled).canceled;

export const isFinishedState = (
  state: FlowState,
): state is FlowCompleted | FlowCanceled =>
  isCompleteState(state) || isCanceledState(state);

export const isInProgressState = (state: FlowState): state is FlowInProgress =>
  !isFinishedState(state);
