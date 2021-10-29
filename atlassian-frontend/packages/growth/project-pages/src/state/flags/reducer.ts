import { freeze, merge } from 'icepick';

import {
  DISMISS_ERROR,
  DISMISS_SUCCESS_FLAG,
  REDIRECT_TO_CONFLUENCE_CREATE_ERROR,
  REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK_ERROR,
  SHOW_ERROR,
  SHOW_XFLOW_DIALOG_ERROR,
  SUCCESSFULLY_CONNECTED_SPACE,
  SUCCESSFULLY_REQUESTED_ACCESS,
} from '../actions';

import { SET } from './actions';
import { FlagsState } from './types';
import { AnyAction } from 'redux';

export const initialFlagsState: FlagsState = {
  hasErrors: false,
  showSuccessFlag: false,
  connectedSpaceName: '',
  isConnectedToPage: false,
  title: '',
  description: '',
};

export default (
  state: FlagsState = initialFlagsState,
  action: AnyAction,
): FlagsState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }

    case REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK_ERROR:
    case REDIRECT_TO_CONFLUENCE_CREATE_ERROR:
    case SHOW_XFLOW_DIALOG_ERROR:
    case SHOW_ERROR:
      return merge(state, {
        hasErrors: true,
      });

    case DISMISS_ERROR:
      return merge(state, {
        hasErrors: false,
      });

    case SUCCESSFULLY_CONNECTED_SPACE:
      return merge(state, {
        showSuccessFlag: true,
        connectedSpaceName: action.connectedSpaceName,
        isConnectedToPage: action.isConnectedToPage,
        title: '',
        description: '',
      });

    case SUCCESSFULLY_REQUESTED_ACCESS:
      return merge(state, {
        hasErrors: false,
        showSuccessFlag: true,
        connectedSpaceName: '',
        title: action.payload.title,
        description: action.payload.description,
      });

    case DISMISS_SUCCESS_FLAG:
      return merge(state, {
        showSuccessFlag: false,
      });

    default:
      return state;
  }
};
