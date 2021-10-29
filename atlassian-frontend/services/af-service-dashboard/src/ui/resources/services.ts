import { createResource } from 'react-resource-router';

import request from '../utils/request';

export type ServicesResourceData = {
  services: string[];
};

export const servicesResource = createResource<ServicesResourceData>({
  type: 'SERVICES',
  getKey: () => 'services',
  getData: () => request.get('/api/services'),
});
