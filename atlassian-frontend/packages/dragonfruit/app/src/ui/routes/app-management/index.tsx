import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const appManagement = {
  name: 'APP_MANAGEMENT',
  path: routes.APPS(),
  exact: true,
  component,
};
