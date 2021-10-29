import { State } from '../../types';
import { AccessRequestCapabilityType } from './types';

export const getAccessRequestCapability = (
  state: State,
): AccessRequestCapabilityType | undefined =>
  state.confluence.accessRequestCapabilities.loaded
    ? state.confluence.accessRequestCapabilities.capability
    : undefined;
