import { freeze, merge } from 'icepick';

import {
  CONNECT_CONFLUENCE_SPACE,
  FETCH_CONFLUENCE_SPACES_ERROR,
  HIDE_CONNECT_SPACE_DIALOG,
  PUT_PROJECT_SPACE_LINK_ERROR,
  SET_SELECTED_SPACE,
  SHOW_CONNECT_SPACE_DIALOG,
  SHOW_CREATE_SPACE_DIALOG,
  UPDATE_CONFLUENCE_SPACES,
  UPDATE_PROJECT_SPACE_LINK,
} from '../../actions';

import { SET } from './actions';
import {
  CONNECT_ERROR,
  ConnectSpaceDialogState,
  FETCH_ERROR,
  NO_ERROR,
} from './types';
import { AnyAction } from 'redux';

const initialState: ConnectSpaceDialogState = freeze({
  selectedSpace: null,
  connectingSpace: false,
  connectSpaceDialogErrorState: NO_ERROR,
  connectSpaceDialogOpen: false,
  disconnectedTemplatesClick: false,
});

export default (
  state: ConnectSpaceDialogState = initialState,
  action: AnyAction,
): ConnectSpaceDialogState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    case CONNECT_CONFLUENCE_SPACE:
      return merge(state, {
        connectingSpace: true,
        connectSpaceDialogErrorState: NO_ERROR,
      });
    case UPDATE_CONFLUENCE_SPACES:
      return merge(state, {
        connectSpaceDialogErrorState: NO_ERROR,
      });
    case FETCH_CONFLUENCE_SPACES_ERROR:
      return merge(state, {
        connectingSpace: false,
        connectSpaceDialogErrorState: FETCH_ERROR,
      });
    case HIDE_CONNECT_SPACE_DIALOG:
      return merge(state, {
        selectedSpace: null,
        connectingSpace: false,
        connectSpaceDialogOpen: false,
        connectSpaceDialogErrorState: NO_ERROR,
      });
    case PUT_PROJECT_SPACE_LINK_ERROR:
      return merge(state, {
        connectingSpace: false,
        connectSpaceDialogErrorState: CONNECT_ERROR,
      });
    case SET_SELECTED_SPACE:
      return merge(state, {
        selectedSpace: action.payload,
      });
    case SHOW_CONNECT_SPACE_DIALOG:
      return merge(state, {
        ...initialState,
        connectSpaceDialogOpen: true,
        disconnectedTemplatesClick: action.disconnectedTemplatesClick,
      });
    case SHOW_CREATE_SPACE_DIALOG:
      return merge(state, {
        connectSpaceDialogOpen: false,
      });
    case UPDATE_PROJECT_SPACE_LINK:
      return merge(state, {
        selectedSpace: null,
        connectingSpace: false,
        connectSpaceDialogOpen: false,
      });
    default:
      return state;
  }
};
