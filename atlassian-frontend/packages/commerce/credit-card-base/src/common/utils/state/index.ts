import { STATE_MAP } from './constants';
import {
  RequestState,
  StateComplete,
  Stated,
  StatedResponse,
  StateError,
  StateLoading,
} from './types';

const maxState = (state1: RequestState, state2: RequestState) =>
  STATE_MAP[state1] > STATE_MAP[state2] ? state1 : state2;

/**
 * components meta information of multiple states into a "lowest" one
 * { state: 'complete' } + { state: 'loading'} = { state: 'loading' }
 */
export const composeState = <T>(...args: Stated<any>[]): Stated<never> => {
  const response = {
    state: 'complete',
    error: undefined,
  } as Stated<never>;

  args.forEach(({ state, error }) => {
    response.state = maxState(response.state, state);
    response.error = response.error || error;
  });

  return response;
};

/**
 * Response type guard, basically ensures that payload exists for the complete state so it's safe to use it
 */
export const stateGuard = <T>(
  payload: T | undefined,
  state: RequestState,
  error?: string,
): StatedResponse<T> => {
  if (state === 'error') {
    return {
      payload,
      state,
      error,
    } as StateError<T>;
  }
  if (state === 'complete' && payload) {
    return {
      payload,
      state,
      error,
    } as StateComplete<T>;
  }
  return {
    payload,
    state: 'loading',
    error,
  } as StateLoading<T>;
};

// type guards

export const isLoadingState = <T>(
  state: StatedResponse<T>,
): state is StateLoading<T> => {
  return state.state === 'loading';
};
export const isErrorState = <T>(
  state: StatedResponse<T>,
): state is StateError<T> => {
  return state.state === 'error';
};
export const isCompleteState = <T>(
  state: StatedResponse<T>,
): state is StateComplete<T> => {
  return state.state === 'complete';
};
