import { RequestCategory } from './types';
const packageName =
  process.env._PACKAGE_NAME_ || '@atlassian/notification-list';

const packageVersion = process.env._PACKAGE_VERSION_ || 'v9.9.9';

const initialFilters = {
  categoryFilter: RequestCategory.DIRECT,
};

export { initialFilters, packageName, packageVersion };
