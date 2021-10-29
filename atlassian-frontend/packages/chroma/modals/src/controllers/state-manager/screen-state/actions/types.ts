import { ScreenType } from '../../../../common/constants';

export interface ScreenState {
  currentScreen: ScreenType | null;
  previousScreen: ScreenType | null;
}
