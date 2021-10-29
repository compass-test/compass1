import { Routes, ProductKeys } from './types';

const map: Record<ProductKeys, Routes> = {
  [ProductKeys.JIRA_CORE]: Routes.JIRA_CORE,
  [ProductKeys.JIRA_SERVICE_DESK]: Routes.JIRA_SERVICE_DESK,
  [ProductKeys.JIRA_SOFTWARE]: Routes.JIRA_SOFTWARE,
  [ProductKeys.CONFLUENCE]: Routes.CONFLUENCE,
  [ProductKeys.OPSGENIE]: Routes.OPSGENIE,
  [ProductKeys.BITBUCKET]: Routes.BITBUCKET,
  //todo: should have proper mapping
  [ProductKeys.STATUSPAGE]: Routes.DISCOVERY_PRODUCTS,
  [ProductKeys.TRELLO]: Routes.DISCOVERY_PRODUCTS,
};

export const productKeysToRoutes = (productKey: ProductKeys): Routes => {
  return map[productKey] || Routes.DISCOVERY_PRODUCTS;
};
