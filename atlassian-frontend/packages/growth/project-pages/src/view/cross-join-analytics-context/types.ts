import { AccessRequestCapabilityType } from '../../state/confluence/access-request-capabilities/types';
import { ProductEdition } from '../../state/context/types';

export interface StateProps {
  accessRequestCapability?: AccessRequestCapabilityType;
  isSpaceConnected: boolean;
  confluenceEdition?: ProductEdition;
  jswEdition?: ProductEdition;
}

export interface OwnProps {
  children: React.ReactNode;
}

export type Props = StateProps & OwnProps;
