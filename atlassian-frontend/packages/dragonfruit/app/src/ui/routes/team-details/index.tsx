import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const teamDetails = {
  name: 'TEAM_DETAILS',
  path: routes.TEAM_DETAILS(':teamId'),
  exact: true,
  component,
};
