import { freeze, merge } from 'icepick';

import { UPDATE_CONFLUENCE_USER_ACCESS } from '../../actions';

import { SET } from './actions';
import { ConfluenceUserState, UNKNOWN } from './types';
import { AnyAction } from 'redux';

const initialState: ConfluenceUserState = {
  access: UNKNOWN,
};

export default (
  state: ConfluenceUserState = initialState,
  action: AnyAction,
): ConfluenceUserState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    case UPDATE_CONFLUENCE_USER_ACCESS:
      return merge(state, {
        access: action.access,
      });

    default:
      return state;
  }
};
