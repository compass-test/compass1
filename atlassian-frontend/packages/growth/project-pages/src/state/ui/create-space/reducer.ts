import { freeze, merge } from 'icepick';

import {
  CREATE_CONFLUENCE_SPACE,
  CREATE_CONFLUENCE_SPACE_ERROR,
  GENERATE_SPACE_KEY,
  HIDE_CREATE_SPACE_DIALOG,
  NO_VALID_KEY_FAILURE,
  SHOW_CONNECT_SPACE_DIALOG,
  SHOW_CREATE_SPACE_DIALOG,
  TOGGLE_SPACE_NAME_INVALID,
  UPDATE_PROJECT_SPACE_LINK,
  UPDATE_SPACE_NAME,
  UPDATE_SUGGESTED_KEY,
} from '../../actions';

import { SET } from './actions';
import {
  CREATE_ERROR,
  CreateSpaceDialogState,
  KEY_ERROR,
  NO_ERROR,
} from './types';
import { AnyAction } from 'redux';

const initialState: CreateSpaceDialogState = freeze({
  createSpaceDialogOpen: false,
  createSpaceDialogErrorState: NO_ERROR,
  creatingSpace: false,
  generatingKey: false,
  userEnteredSpaceNameInvalid: false,
  userEnteredSpaceName: '',
});

export default (
  state: CreateSpaceDialogState = initialState,
  action: AnyAction,
): CreateSpaceDialogState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    case CREATE_CONFLUENCE_SPACE:
      return merge(state, {
        creatingSpace: true,
        createSpaceDialogErrorState: NO_ERROR,
      });
    case CREATE_CONFLUENCE_SPACE_ERROR:
      return merge(state, {
        creatingSpace: false,
        createSpaceDialogErrorState: CREATE_ERROR,
      });
    case GENERATE_SPACE_KEY:
      return merge(state, {
        generatingKey: true,
        createSpaceDialogErrorState: NO_ERROR,
      });
    case HIDE_CREATE_SPACE_DIALOG:
      return merge(state, {
        createSpaceDialogOpen: false,
      });
    case NO_VALID_KEY_FAILURE:
      return merge(state, {
        generatingKey: false,
        createSpaceDialogErrorState: KEY_ERROR,
      });
    case SHOW_CONNECT_SPACE_DIALOG:
      return merge(state, {
        createSpaceDialogOpen: false,
      });
    case SHOW_CREATE_SPACE_DIALOG:
      return merge(state, {
        ...initialState,
        createSpaceDialogOpen: true,
      });
    case TOGGLE_SPACE_NAME_INVALID:
      return merge(state, {
        userEnteredSpaceNameInvalid: action.userEnteredSpaceNameInvalid,
      });
    case UPDATE_PROJECT_SPACE_LINK:
      return merge(state, {
        creatingSpace: false,
        createSpaceDialogOpen: false,
        userEnteredSpaceName: '',
      });
    case UPDATE_SPACE_NAME:
      return merge(state, {
        userEnteredSpaceName: action.userEnteredSpaceName,
      });
    case UPDATE_SUGGESTED_KEY:
      return merge(state, {
        generatingKey: false,
        createSpaceDialogErrorState: NO_ERROR,
      });
    default:
      return state;
  }
};
