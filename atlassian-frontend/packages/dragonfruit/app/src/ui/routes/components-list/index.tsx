import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const componentsList = {
  name: 'COMPONENTS',
  path: routes.COMPONENTS(':componentType?'),
  exact: true,
  component,
};
