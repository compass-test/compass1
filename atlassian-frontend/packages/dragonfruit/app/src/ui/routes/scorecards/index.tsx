import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const scorecards = {
  name: 'SCORECARDS',
  path: routes.SCORECARD_LIST(),
  exact: true,
  component,
};
