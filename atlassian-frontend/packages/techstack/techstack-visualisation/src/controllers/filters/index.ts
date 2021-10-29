import { createHook, createStore, StoreActionApi } from 'react-sweet-state';

export type State = {
  showUnavailable: boolean;
  package: string;
};
type StoreApi = StoreActionApi<State>;

const initialState: State = {
  showUnavailable: true,
  package: 'all',
};

const actions = {
  setUnAvailable: (showUnavailable: boolean) => ({ setState }: StoreApi) => {
    setState({
      showUnavailable,
    });
  },
  showPackage: (pkg: string) => ({ setState }: StoreApi) => {
    setState({
      package: pkg,
    });
  },
};

export type Actions = typeof actions;

export const FilterStore = createStore<State, Actions>({
  initialState,
  actions,
  name: 'filters',
});

export const useFilters = createHook<State, Actions>(FilterStore);
export const useFiltersAction = createHook<State, Actions>(FilterStore, {
  selector: null,
});
