import { StoreActionApi } from 'react-sweet-state';

import { ScreenType } from '../../../../common/constants';

import { ScreenState } from './types';

export const setScreen = (currentScreen: ScreenType | null) => ({
  getState,
  setState,
}: StoreActionApi<ScreenState>) => {
  const previousScreen = getState().currentScreen;
  setState({ previousScreen, currentScreen });
};
