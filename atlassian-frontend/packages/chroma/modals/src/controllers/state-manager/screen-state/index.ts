import { createHook, createStore } from 'react-sweet-state';

import { ScreenType } from '../../../common/constants';

import * as actions from './actions';
import { ScreenState } from './actions/types';
import { Actions } from './types';

const initialState: ScreenState = {
  previousScreen: null,
  currentScreen: ScreenType.GOOGLE_WORKSPACE_PRODUCT_ACCESS_SELECTION,
};

const Store = createStore<ScreenState, Actions>({
  initialState,
  actions,
});

export const useScreen = createHook<ScreenState, Actions>(Store);
