import { createHook, createStore } from 'react-sweet-state';

import * as actions from './actions';
import { ModalState } from './actions/types';
import { Actions } from './types';

const initialState: ModalState = {
  onCloseHandler: () => {},
};

const Store = createStore<ModalState, Actions>({
  initialState,
  actions,
});

export const useModal = createHook<ModalState, Actions>(Store);
