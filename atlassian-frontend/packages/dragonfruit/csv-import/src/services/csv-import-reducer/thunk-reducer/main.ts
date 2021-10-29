import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useCallback,
  useRef,
  useState,
} from 'react';

export type Thunk<S, A> = (
  dispatch: Dispatch<A | Thunk<S, A>>,
  getState: () => S,
) => void;

export type DispatchThunk<R extends Reducer<any, any>> = Dispatch<
  ReducerAction<R> | Thunk<ReducerState<R>, ReducerAction<R>>
>;

// useThunkReducer<S, A>(reducer: Reducer<S, A>, initialArg: S, init?: (s: S) => S): [S, Dispatch<A | Thunk<S, A>>]
/**
 * Augments React's useReducer() hook so that the action
 * dispatcher supports thunks.
 */
export function useThunkReducer<R extends Reducer<any, any>>(
  reducer: R,
  initializerArg: ReducerState<R>,
): [ReducerState<R>, DispatchThunk<R>] {
  const [hookState, setHookState] = useState(initializerArg);

  // State management.
  const state = useRef(hookState);
  const getState = useCallback(() => state.current, [state]);
  const setState = useCallback(
    newState => {
      state.current = newState;
      setHookState(newState);
    },
    [state, setHookState],
  );

  // Reducer.
  const reduce = useCallback(
    action => {
      return reducer(getState(), action);
    },
    [reducer, getState],
  );

  // Augmented dispatcher.
  const dispatch: DispatchThunk<R> = useCallback(
    action => {
      return action instanceof Function
        ? action(dispatch, getState)
        : setState(reduce(action));
    },
    [getState, setState, reduce],
  );

  return [hookState, dispatch];
}
