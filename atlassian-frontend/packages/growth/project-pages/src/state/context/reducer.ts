import { freeze, merge } from 'icepick';

import { defaultLocale } from '../../common/constants/supported-locales';

import {
  NO_VALID_KEY,
  NO_VALID_KEY_FAILURE,
  UPDATE_CONFLUENCE_EDITION,
  UPDATE_CONFLUENCE_STATE,
  UPDATE_JSW_EDITION,
  UPDATE_SUGGESTED_KEY,
} from '../actions';

import { SET } from './actions';
import { CONFLUENCE_LOADING, ContextState } from './types';
import { AnyAction } from 'redux';

export const initialContextState: ContextState = freeze({
  baseUrl: '',
  isAdmin: false,
  locale: defaultLocale,
  cloudId: '',
  accountId: '',
  confluenceState: CONFLUENCE_LOADING,
  suggestedKey: null,
  origin: null,
});

export default (
  state: ContextState = initialContextState,
  action: AnyAction,
): ContextState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    case NO_VALID_KEY:
      return merge(state, {
        suggestedKey: null,
      });
    case NO_VALID_KEY_FAILURE:
      return merge(state, {
        suggestedKey: null,
      });
    case UPDATE_CONFLUENCE_STATE:
      return merge(state, {
        confluenceState: action.payload,
      });
    case UPDATE_CONFLUENCE_EDITION:
      return merge(state, {
        confluenceEdition: action.payload,
      });
    case UPDATE_JSW_EDITION:
      return merge(state, {
        jswEdition: action.payload,
      });
    case UPDATE_SUGGESTED_KEY:
      return merge(state, {
        suggestedKey: action.key,
      });
    default:
      return state;
  }
};
