import { StoreActionApi } from 'react-sweet-state';
import { FeatureFlagMap } from './constants';

export type State = {
  isInitialised: boolean;
  gspFeatureFlagValues: FeatureFlagMap;
};

export type StoreApi = StoreActionApi<State>;
