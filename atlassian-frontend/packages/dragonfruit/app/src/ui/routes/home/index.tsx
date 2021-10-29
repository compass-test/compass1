import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const home = {
  name: 'HOME',
  path: routes.HOME(),
  exact: true,
  component,
};
