import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const componentDetails = {
  name: 'COMPONENT_DETAILS',
  path: routes.COMPONENT_DETAILS(':componentId', ':componentPage?'),
  exact: true,
  component,
};

export const componentDetailsApp = {
  name: 'COMPONENT_DETAILS_APP',
  path: routes.COMPONENT_DETAILS_APP(':componentId', ':extensionId'),
  exact: true,
  component,
};
