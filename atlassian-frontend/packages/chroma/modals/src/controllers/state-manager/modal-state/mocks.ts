import { ModalState } from './actions/types';
import { Actions } from './types';

export const getMockedUseScreen = (
  state?: Partial<ModalState>,
  actions?: Partial<Actions>,
): [ModalState, Actions] => [
  {
    onCloseHandler: () => {},
    ...state,
  },
  {
    setOnCloseHandler: jest.fn(),
    ...actions,
  },
];
