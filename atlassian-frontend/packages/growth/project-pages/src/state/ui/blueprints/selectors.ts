import {
  DELETED,
  ERROR,
  FORBIDDEN,
  LOADING,
  NOT_CONNECTED,
  OK,
} from '../../confluence/connected-space/types';
import {
  CONFLUENCE_ACTIVE,
  CONFLUENCE_DEACTIVATED,
  CONFLUENCE_INACTIVE,
  CONFLUENCE_LOADING,
} from '../../context/types';
import { State } from '../../types';

import {
  BlueprintData,
  TEMPLATES_DEFAULT_LIST,
  TEMPLATES_REAL_LIST,
  TemplatesList,
} from './types';

import { getProjectPagesContent } from '../selectors';
import { CONFTREE_NO_ACCESS_TEASER } from '../types';

const forceTemplatesDisabled = (state: State): boolean =>
  getProjectPagesContent(state) === CONFTREE_NO_ACCESS_TEASER;

export const getDefaultBlueprints = (state: State): BlueprintData[] =>
  state.ui.blueprints.defaultBlueprints;

export const getTemplatesToShow = (state: State): TemplatesList => {
  if (
    state.context.confluenceState === CONFLUENCE_LOADING ||
    state.confluence.connectedSpace.connectionState === LOADING ||
    state.confluence.connectedSpace.blueprintsState === LOADING
  ) {
    return TEMPLATES_DEFAULT_LIST;
  }
  if (state.confluence.connectedSpace.blueprintsState === OK) {
    return TEMPLATES_REAL_LIST;
  }
  return TEMPLATES_DEFAULT_LIST;
};

export const areTemplatesEnabled = (state: State): boolean =>
  state.context.confluenceState === CONFLUENCE_INACTIVE ||
  state.context.confluenceState === CONFLUENCE_DEACTIVATED ||
  state.confluence.connectedSpace.blueprintsState === OK ||
  (state.context.confluenceState === CONFLUENCE_ACTIVE &&
    state.confluence.connectedSpace.connectionState === NOT_CONNECTED &&
    !forceTemplatesDisabled);

export const isThereATemplatesUIError = (state: State): boolean =>
  state.confluence.connectedSpace.blueprintsState === FORBIDDEN ||
  state.confluence.connectedSpace.blueprintsState === DELETED ||
  state.confluence.connectedSpace.blueprintsState === ERROR;
