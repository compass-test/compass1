import { freeze } from 'icepick';

import { SET } from './actions';
import { FeatureFlagsState } from './types';
import { AnyAction } from 'redux';

export const initialFeatureFlagsState: FeatureFlagsState = freeze({
  isProjectPagesProductionisation: false,
});

export default (
  state: FeatureFlagsState = initialFeatureFlagsState,
  action: AnyAction,
): FeatureFlagsState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    default:
      return state;
  }
};
