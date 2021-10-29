import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const scorecardDetails = {
  name: 'SCORECARD_DETAILS',
  path: routes.SCORECARD_DETAILS(':scorecardId'),
  exact: true,
  component,
};
