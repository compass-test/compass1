import { freeze } from 'icepick';

import { SET } from './actions';
import { ExternalState } from './types';
import { AnyAction } from 'redux';
import { Reasons } from '@atlassiansox/cross-flow-component-support';

export const initialExternalState: ExternalState = freeze({
  onGetFeatureFlagValue: () => ({
    // example FF
    // isGrapeOn: (defaultValue) => defaultValue,
  }),
  crossFlow: {
    isEnabled: false,
    reason: Reasons.NO_PROVIDER,
  },
});

export default (
  state: ExternalState = initialExternalState,
  action: AnyAction,
): ExternalState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    default:
      return state;
  }
};
