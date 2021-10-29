import { createHook, createStore, StoreActionApi } from 'react-sweet-state';

import { Solution, UseCase } from '../../common/types';

export type State = {
  useCase: UseCase | void;
  solution: Solution | void;
};

type StoreApi = StoreActionApi<State>;

const initialState: State = {
  useCase: undefined,
  solution: undefined,
};

const actions = {
  setSelection: (useCase: UseCase | void, solution: Solution | void) => ({
    setState,
  }: StoreApi) => {
    setState({
      useCase,
      solution,
    });
  },
};

export type Actions = typeof actions;

export const SelectorStore = createStore<State, Actions>({
  initialState,
  actions,
  name: 'selectorStore',
});

export const useSelection = createHook<State, Actions>(SelectorStore);
export const useSelectionAction = createHook<State, Actions>(SelectorStore, {
  selector: null,
});
