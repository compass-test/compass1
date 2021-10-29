import { createStore, createHook } from 'react-sweet-state';
import { DraftsToggleState } from './types';
import * as actions from './actions';

const Store = createStore<DraftsToggleState, typeof actions>({
  initialState: {
    isDraftsShown: null,
    isTreeUpdatedForDrafts: false,
  },
  actions,
});

export const useDraftsToggle = createHook(Store);
