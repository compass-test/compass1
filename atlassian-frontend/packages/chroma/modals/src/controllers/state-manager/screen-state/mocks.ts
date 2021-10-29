import { ScreenState } from './actions/types';
import { Actions } from './types';

export const getMockedUseScreen = (
  state?: Partial<ScreenState>,
  actions?: Partial<Actions>,
): [ScreenState, Actions] => [
  {
    currentScreen: null,
    previousScreen: null,
    ...state,
  },
  {
    setScreen: jest.fn(),
    ...actions,
  },
];
