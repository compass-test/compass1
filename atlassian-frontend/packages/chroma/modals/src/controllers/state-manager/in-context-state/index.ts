import { createHook, createStore } from 'react-sweet-state';

import * as actions from './actions';
import { InContextState } from './actions/types';
import { Actions } from './types';

const initialState: InContextState = {
  cloudId: '',
  siteUrl: '',
  subscriptions: [],
};

const Store = createStore<InContextState, Actions>({
  initialState,
  actions,
});

export const useInContextInfo = createHook<InContextState, Actions>(Store);
