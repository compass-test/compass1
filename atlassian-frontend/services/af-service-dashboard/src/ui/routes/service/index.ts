import { Service } from './Service';
import { serviceInformationResource } from '../../resources/service-information';

export const route = {
  name: 'SERVICE',
  path: '/:service',
  exact: true,
  component: Service,
  resources: [serviceInformationResource],
};
