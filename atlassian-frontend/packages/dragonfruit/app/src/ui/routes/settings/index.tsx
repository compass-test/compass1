import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const settings = {
  name: 'SETTINGS',
  path: routes.SETTINGS(),
  exact: true,
  component,
};
