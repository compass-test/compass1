import {
  getDefaultBlueprints,
  getTemplatesToShow,
} from '../../ui/blueprints/selectors';
import { State } from '../../types';
import {
  BlueprintData,
  BlueprintsState,
  CONNECTED,
  ConnectedSpaceState,
} from './types';
import { TEMPLATES_REAL_LIST } from '../../ui/blueprints/types';
import { ProductEdition } from '../../context/types';

export const getConnectedSpace = (state: State): ConnectedSpaceState =>
  state.confluence.connectedSpace;
export const getBlueprintsState = (state: State): BlueprintsState =>
  state.confluence.connectedSpace.blueprintsState;
export const getBlueprints = (state: State): BlueprintData[] =>
  getTemplatesToShow(state) === TEMPLATES_REAL_LIST
    ? state.confluence.connectedSpace.blueprints || getDefaultBlueprints(state)
    : getDefaultBlueprints(state);
export const getConnectionState = (state: State): string =>
  state.confluence.connectedSpace.connectionState as string;
export const getProjectSpaceKey = (state: State): string | null =>
  state.confluence.connectedSpace.projectSpaceKey as string;
export const getProjectSpacePageId = (state: State): string | null =>
  state.confluence.connectedSpace.projectSpacePageId as string;
export const getConnectedSpaceOrPageTitle = (state: State): string | null =>
  state.confluence.connectedSpace.projectSpacePageTitle as string;
export const getConnectedSpaceOrPageUrl = (state: State): string | null =>
  state.confluence.connectedSpace.projectSpacePageUrl;
export const getProjectPageLinkedId = (state: State) =>
  state.confluence.connectedSpace.projectPageLinkedId;
export const getIsConnectedToPage = (state: State) =>
  state.confluence.connectedSpace.projectIsConnectedToPage;
export const getProjectSpaceIcon = (state: State): string | null =>
  state.confluence.connectedSpace.projectSpaceIcon;
export const getProjectSpacePageTitleHasBeenFetched = (state: State): boolean =>
  state.confluence.connectedSpace.projectSpacePageTitleHasBeenFetched;

export const isSpaceConnected = (state: State): boolean =>
  getConnectionState(state) === CONNECTED;

export const getConfluenceEdition = (
  state: State,
): ProductEdition | undefined => state.context.confluenceEdition;

export const getJswEdition = (state: State): ProductEdition | undefined =>
  state.context.jswEdition;
