import { freeze, merge } from 'icepick';

import { UPDATE_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES } from '../../actions';

import {
  AccessRequestCapabilitiesState,
  AccessRequestCapabilityType,
} from './types';
import { AnyAction } from 'redux';

const initialState: AccessRequestCapabilitiesState = freeze({
  capability: AccessRequestCapabilityType.ERROR, // XXX unknown state?
  loaded: false,
});

export default (
  state: AccessRequestCapabilitiesState = initialState,
  action: AnyAction,
): AccessRequestCapabilitiesState => {
  switch (action.type) {
    case UPDATE_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES:
      return merge(state, {
        capability: action.capability,
        loaded: true,
      });
    default:
      return state;
  }
};
