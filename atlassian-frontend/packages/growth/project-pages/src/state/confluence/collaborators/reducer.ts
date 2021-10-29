import { freeze, merge } from 'icepick';

import {
  UpdateConfluenceCollaboratorsAction,
  UPDATE_CONFLUENCE_COLLABORATORS,
} from '../../actions';

import { CollaboratorsState } from './types';
import { AnyAction } from 'redux';

const initialState: CollaboratorsState = freeze({
  users: [],
  loaded: false,
});

export default (
  state: CollaboratorsState = initialState,
  action: AnyAction,
): CollaboratorsState => {
  switch (action.type) {
    case UPDATE_CONFLUENCE_COLLABORATORS:
      const { users } = action as UpdateConfluenceCollaboratorsAction;
      return merge(state, {
        users,
        loaded: true,
      });
    default:
      return state;
  }
};
