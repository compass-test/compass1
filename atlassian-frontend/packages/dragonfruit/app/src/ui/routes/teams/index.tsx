import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const teams = {
  name: 'TEAMS',
  path: routes.TEAMS(),
  exact: true,
  component,
};
