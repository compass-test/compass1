import { routes } from '@atlassian/dragonfruit-routes';

import component from './component';

export const csvImport = {
  name: 'CSV_IMPORT',
  path: routes.CSV_IMPORT(),
  exact: true,
  component,
};
