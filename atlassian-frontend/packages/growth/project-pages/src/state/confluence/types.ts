import { AccessRequestCapabilitiesState } from './access-request-capabilities/types';
import { CollaboratorsState } from './collaborators/types';
import { ConnectedSpaceState } from './connected-space/types';
import { SpacesState } from './spaces/types';
import { ConfluenceUserState } from './user/types';

export type ConfluenceState = {
  connectedSpace: ConnectedSpaceState;
  spaces: SpacesState;
  user: ConfluenceUserState;
  accessRequestCapabilities: AccessRequestCapabilitiesState;
  collaborators: CollaboratorsState;
};

export interface ConfluencePage {
  id: string;
  type: string;
  status: string;
  title: string;
  space: {
    id: number;
    key: string;
    name: string;
  };
  _links: {
    editui: string;
    base: string;
    webui?: string;
  };
}

export interface ConfluenceSearchResult {
  results: ConfluencePage[];
  start: number;
  limit: number;
  size: number;
}

export interface ConfluenceSearchResultWithLinks
  extends ConfluenceSearchResult {
  _links: {
    base: string;
    context: string;
    self: string;
  };
}

export interface ConfluenceBlueprintPage<T = ConfluencePage> {
  content: T;
  contentBlueprintSpec: {
    blueprintId: string;
  };
  _links: {
    base: string;
  };
}

export interface ConfluenceSpaceExpanded {
  id: number;
  key: string;
  name: string;
  icon: {
    path: string;
    width: number;
    height: number;
  };
  homepage?: {
    id: string;
    title: string;
    _links: {
      webui: string;
    };
  };
  _links: {
    base: string;
    webui: string;
  };
}
