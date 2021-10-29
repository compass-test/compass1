import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const people = {
  name: 'PEOPLE',
  path: routes.PEOPLE(':accountId'),
  exact: true,
  component,
};
