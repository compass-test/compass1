import { RequestType } from '../../models';

import { ListProjectFormsMessage } from './ListProjectFormsMessages.intl';

export enum Location {
  agentView = 'AgentView',
  customerView = 'CustomerView',
  recommended = 'Recommended',
}

export const LocationMessages = {
  [Location.agentView]: ListProjectFormsMessage.AgentView,
  [Location.customerView]: ListProjectFormsMessage.CustomerView,
  [Location.recommended]: ListProjectFormsMessage.Recommended,
};

export const getLocations = (rts: RequestType[]) => {
  const locations: Location[] = [];
  if (rts.findIndex(rt => rt.portal) >= 0) {
    locations.push(Location.customerView);
  }
  if (rts.findIndex(rt => rt.id.startsWith('s')) >= 0) {
    locations.push(Location.recommended);
  }
  return locations;
};
