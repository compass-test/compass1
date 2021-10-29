import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const appConfiguration = {
  name: 'APP_CONFIGURATION',
  path: routes.APP_CONFIGURATION(':extensionId'),
  exact: true,
  component,
};
