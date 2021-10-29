import {
  CONNECTED,
  ERROR,
  NOT_CONNECTED,
} from '../confluence/connected-space/types';
import { doesUserHaveConfluenceAccess } from '../confluence/user/selectors';
import { getConfluenceState } from '../context/selectors';
import {
  CONFLUENCE_ACTIVATING,
  CONFLUENCE_ACTIVE,
  CONFLUENCE_DEACTIVATED,
  CONFLUENCE_ERROR,
  CONFLUENCE_EXPIRED,
  CONFLUENCE_INACTIVE,
} from '../context/types';
import { State } from '../types';

import {
  ConfluenceTreeTemplatesList,
  CONFTREE_CONFLUENCE_ACTIVATING,
  CONFTREE_CONNECT_SPACE,
  CONFTREE_CROSS_SELL,
  CONFTREE_DISPLAY_PAGETREE,
  CONFTREE_ERROR,
  CONFTREE_PLACEHOLDER,
  CONFTREE_NO_ACCESS_TEASER,
  CONFTREE_ACCESS_LOADING,
  CONFTREE_SPACE_OR_PAGE_NOT_FOUND,
  UIState,
} from './types';

export const isCrossSellRequired = (state: State): boolean =>
  state.context.confluenceState === CONFLUENCE_INACTIVE ||
  state.context.confluenceState === CONFLUENCE_DEACTIVATED;

export const isConfluenceActivating = (state: State): boolean =>
  state.context.confluenceState === CONFLUENCE_ACTIVATING;

export const isConnectSpaceRequired = (state: State): boolean =>
  state.context.confluenceState === CONFLUENCE_ACTIVE &&
  state.confluence.connectedSpace.connectionState === NOT_CONNECTED;

// When the space home page title returns null, the most likely scenario
// is that the user has deleted the space home page.
export const isSpaceOrPageHomePageNull = (state: State): boolean =>
  state.context.confluenceState === CONFLUENCE_ACTIVE &&
  state.confluence.connectedSpace.connectionState === CONNECTED &&
  state.confluence.connectedSpace.projectSpacePageTitleHasBeenFetched &&
  state.confluence.connectedSpace.projectSpacePageTitle === null;

export const isConfTreeRequired = (state: State): boolean =>
  state.confluence.connectedSpace.connectionState === CONNECTED &&
  state.context.confluenceState === CONFLUENCE_ACTIVE;

export const isThereAConfTreeError = (state: State): boolean =>
  state.context.confluenceState === CONFLUENCE_ERROR ||
  state.context.confluenceState === CONFLUENCE_EXPIRED ||
  state.confluence.connectedSpace.connectionState === ERROR;

export const getProjectPagesContent = (
  state: State,
): ConfluenceTreeTemplatesList => {
  if (isCrossSellRequired(state)) {
    return CONFTREE_CROSS_SELL;
  }
  const userHasConfluenceAccess = doesUserHaveConfluenceAccess(state);
  if (userHasConfluenceAccess === undefined) {
    // until we know whether a user has access to confluence, don't try to render anything
    return CONFTREE_ACCESS_LOADING;
  } else if (userHasConfluenceAccess === false) {
    return CONFTREE_NO_ACCESS_TEASER;
  }

  if (isConfluenceActivating(state)) {
    return CONFTREE_CONFLUENCE_ACTIVATING;
  }
  if (isConnectSpaceRequired(state)) {
    return CONFTREE_CONNECT_SPACE;
  }
  if (isSpaceOrPageHomePageNull(state)) {
    return CONFTREE_SPACE_OR_PAGE_NOT_FOUND;
  }
  if (isConfTreeRequired(state)) {
    return CONFTREE_DISPLAY_PAGETREE;
  }
  if (isThereAConfTreeError(state)) {
    return CONFTREE_ERROR;
  }
  return CONFTREE_PLACEHOLDER;
};

export const getUI = (state: State): UIState => state.ui;

export const getIsPostExpand = (
  state: State,
  hasConfluence: boolean,
): boolean => {
  // if confluence state gives us a clear answer, use that
  switch (getConfluenceState(state)) {
    case CONFLUENCE_ACTIVE:
    case CONFLUENCE_ACTIVATING:
      return true;
    case CONFLUENCE_DEACTIVATED:
    case CONFLUENCE_EXPIRED:
    case CONFLUENCE_INACTIVE:
      return false;
    default:
      // otherwise (state = loading or error), rely on the supplied prop from Jira
      return hasConfluence;
  }
};
