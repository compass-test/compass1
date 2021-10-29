import { AccessRequestCapabilityType } from '../../state/confluence/access-request-capabilities/types';
import { ConnectedSpaceState } from '../../state/confluence/connected-space/types';
import OriginTracing from '@atlassiansox/origin-tracing';
import { Collaborator } from '../../state/confluence/collaborators/types';
import { ProjectState } from '../../state/project/types';

export interface OwnProps {}

export interface StateProps {
  connectedSpace: ConnectedSpaceState;
  accessRequestCapability?: AccessRequestCapabilityType;
  origin: OriginTracing | null;
  collaborators?: Collaborator[];
  project: ProjectState;
  cloudId: string;
  accountId: string;
}

export interface DispatchProps {
  triggerConfluenceAccessRequestCheck: () => void;
  triggerFetchConfluenceCollaborators: () => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
