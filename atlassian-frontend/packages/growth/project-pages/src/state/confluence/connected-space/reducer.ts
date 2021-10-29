import { freeze, merge } from 'icepick';

import {
  FETCH_CONNECTED_SPACE_BLUEPRINTS,
  FETCH_CONNECTED_SPACE_BLUEPRINTS_ERROR,
  GET_PROJECT_SPACE_LINK,
  GET_PROJECT_SPACE_LINK_ERROR,
  UPDATE_CONNECTED_SPACE_BLUEPRINTS,
  UPDATE_PROJECT_SPACE_LINK,
  UPDATE_CONNECTED_SPACE_OR_PAGE_CONTENT,
  PUT_PROJECT_SPACE_LINK,
} from '../../actions';
import { AnyAction } from 'redux';

import { SET } from './actions';
import {
  CONNECTED,
  ConnectedSpaceState,
  ERROR,
  LOADING,
  NOT_CONNECTED,
  OK,
  UNKNOWN,
} from './types';

const initialState: ConnectedSpaceState = {
  blueprintsState: UNKNOWN,
  blueprints: null,
  connectionState: UNKNOWN,
  projectSpaceKey: null,
  projectSpacePageId: null,
  projectPageLinkedId: null,
  projectSpacePageTitle: null,
  projectSpacePageUrl: null,
  projectIsConnectedToPage: false,
  projectSpacePageTitleHasBeenFetched: false,
  projectSpaceIcon: null,
};

export default (
  state: ConnectedSpaceState = initialState,
  action: AnyAction,
): ConnectedSpaceState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    case GET_PROJECT_SPACE_LINK:
      return merge(state, {
        connectionState: LOADING,
      });
    case PUT_PROJECT_SPACE_LINK:
      // reset to initial state whenever a new space link is being made
      return freeze(initialState);
    case GET_PROJECT_SPACE_LINK_ERROR:
      return merge(state, {
        projectSpaceKey: null,
        projectSpacePageId: null,
        connectionState: ERROR,
      });
    case FETCH_CONNECTED_SPACE_BLUEPRINTS:
      return merge(state, {
        blueprintsState: LOADING,
        blueprints: null,
      });
    case FETCH_CONNECTED_SPACE_BLUEPRINTS_ERROR:
      return merge(state, {
        blueprintsState: ERROR,
        blueprints: null,
      });
    case UPDATE_CONNECTED_SPACE_BLUEPRINTS:
      return merge(state, {
        blueprintsState: OK,
        blueprints: action.payload,
      });
    case UPDATE_PROJECT_SPACE_LINK:
      return merge(state, {
        projectSpaceKey: action.spaceKey,
        projectSpacePageId: action.pageId,
        projectPageLinkedId: action.linkedPageId,
        connectionState: action.spaceKey ? CONNECTED : NOT_CONNECTED,
      });
    case UPDATE_CONNECTED_SPACE_OR_PAGE_CONTENT:
      return merge(state, {
        projectSpacePageTitle: action.title,
        projectSpacePageUrl: action.url,
        projectIsConnectedToPage: action.isConnectedToPage,
        projectSpacePageTitleHasBeenFetched:
          action.projectSpacePageTitleHasBeenFetched,
        projectSpaceIcon: action.iconUrl,
        projectSpacePageId: action.pageId,
      });
    default:
      return state;
  }
};
