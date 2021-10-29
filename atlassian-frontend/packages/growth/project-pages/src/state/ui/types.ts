import { BlueprintsState } from './blueprints/types';
import { ConnectSpaceDialogState } from './connect-space/types';
import { CreateSpaceDialogState } from './create-space/types';

export const CONFTREE_PLACEHOLDER = 'CONFTREE_PLACEHOLDER';
export const CONFTREE_CROSS_SELL = 'CONFTREE_CROSS_SELL';
export const CONFTREE_CONFLUENCE_ACTIVATING = 'CONFTREE_CONFLUENCE_ACTIVATING';
export const CONFTREE_CONNECT_SPACE = 'CONFTREE_CONNECT_SPACE';
export const CONFTREE_DISPLAY_PAGETREE = 'CONFTREE_DISPLAY_PAGETREE';
export const CONFTREE_ERROR = 'CONFTREE_ERROR';
export const CONFTREE_NO_ACCESS_TEASER = 'CONFTREE_NO_ACCESS_TEASER';
export const CONFTREE_ACCESS_LOADING = 'CONFTREE_ACCESS_LOADING';
export const CONFTREE_SPACE_OR_PAGE_NOT_FOUND =
  'CONFTREE_SPACE_OR_PAGE_NOT_FOUND';

export type ConfluenceTreeTemplatesList =
  | typeof CONFTREE_CONFLUENCE_ACTIVATING
  | typeof CONFTREE_CONNECT_SPACE
  | typeof CONFTREE_CROSS_SELL
  | typeof CONFTREE_DISPLAY_PAGETREE
  | typeof CONFTREE_ERROR
  | typeof CONFTREE_PLACEHOLDER
  | typeof CONFTREE_NO_ACCESS_TEASER
  | typeof CONFTREE_ACCESS_LOADING
  | typeof CONFTREE_SPACE_OR_PAGE_NOT_FOUND;

export type UIState = {
  blueprints: BlueprintsState;
  connectSpaceDialog: ConnectSpaceDialogState;
  createSpaceDialog: CreateSpaceDialogState;
};
