import { freeze, merge } from 'icepick';

import { UPDATE_CONFLUENCE_SPACES } from '../../actions';

import { SET } from './actions';
import { SpacesState } from './types';
import { AnyAction } from 'redux';

const initialState: SpacesState = freeze({
  availableSpaces: [],
  spacesLoaded: false,
});

export default (
  state: SpacesState = initialState,
  action: AnyAction,
): SpacesState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    case UPDATE_CONFLUENCE_SPACES:
      return merge(state, {
        availableSpaces: action.payload,
        spacesLoaded: true,
      });
    default:
      return state;
  }
};
