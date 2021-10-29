import fetchMock from 'fetch-mock/cjs/client';
import ORIGINAL_MOCK_DATA, { MockData } from './mock-data';
import memoizeOne from 'memoize-one';

export interface DataTransformer {
  (originalMockData: MockData): MockData;
}

interface LoadTimes {
  containers?: number;
  xflow?: number;
  permitted?: number;
  appswitcher?: number;
  availableProducts?: number;
  productRecommendations?: number;
  productConfigurations?: number;
}

export const REQUEST_SLOW = {
  containers: 2000,
  xflow: 1200,
  permitted: 500,
  appswitcher: 1500,
  availableProducts: 1000,
  productRecommendations: 7000,
  productConfigurations: 3000,
};

export const REQUEST_MEDIUM = {
  containers: 1000,
  xflow: 600,
  permitted: 250,
  appswitcher: 750,
  availableProducts: 400,
  productRecommendations: 2000,
  productConfigurations: 2000,
};

export const REQUEST_FAST = {
  containers: 500,
  xflow: 300,
  permitted: 125,
  appswitcher: 375,
  availableProducts: 200,
  productRecommendations: 500,
  productConfigurations: 200,
};

export const getMockData = memoizeOne((transformer?: DataTransformer) => {
  return transformer ? transformer(ORIGINAL_MOCK_DATA) : ORIGINAL_MOCK_DATA;
});

export const availableProductsUrlRegex = /\/gateway\/api\/available\-products\/api\/available\-products/;

export const productRecommendationsUrlRegex = /\/gateway\/api\/invitations\/v1\/product\-recommendations/;

export const productConfigurationUrlRegex = /\/gateway\/api\/available\-products\/api\/product\-configuration/;

export const mockEndpoints = (
  product: string,
  transformer?: DataTransformer,
  loadTimes: LoadTimes = {},
) => {
  const mockData = getMockData(transformer);

  const {
    CUSTOM_LINKS_DATA,
    CUSTOM_LINKS_DATA_ERROR,
    USER_PERMISSION_DATA,
    XFLOW_SETTINGS,
    COLLABORATION_GRAPH_CONTAINERS,
  } = mockData;

  mockAvailableProductsEndpoint(
    availableProductsUrlRegex,
    transformer,
    loadTimes,
  );

  mockProductRecommendationsEndpoint(
    productRecommendationsUrlRegex,
    transformer,
    loadTimes,
  );

  mockProductConfigurationEndpoint(
    productConfigurationUrlRegex,
    transformer,
    loadTimes,
  );

  fetchMock.get(
    `${product === 'confluence' ? '/wiki' : ''}/rest/menu/latest/appswitcher`,
    () =>
      typeof CUSTOM_LINKS_DATA_ERROR === 'number'
        ? CUSTOM_LINKS_DATA_ERROR
        : new Promise((res, rej) =>
            setTimeout(
              () =>
                CUSTOM_LINKS_DATA_ERROR
                  ? rej(CUSTOM_LINKS_DATA_ERROR)
                  : res(CUSTOM_LINKS_DATA),
              loadTimes && loadTimes.appswitcher,
            ),
          ),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.post(
    '/gateway/api/permissions/permitted',
    (_: string, options: { body: string }) =>
      new Promise((res) =>
        setTimeout(
          () =>
            res(
              USER_PERMISSION_DATA[
                JSON.parse(options.body).permissionId as 'manage'
              ],
            ),
          loadTimes && loadTimes.permitted,
        ),
      ),
    { method: 'POST', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/site/some-cloud-id/setting/xflow',
    () =>
      new Promise((res) =>
        setTimeout(() => res(XFLOW_SETTINGS), loadTimes && loadTimes.xflow),
      ),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.post(
    '/gateway/api/collaboration/v1/collaborationgraph/user/container',
    () =>
      new Promise((res) =>
        setTimeout(
          () => res(COLLABORATION_GRAPH_CONTAINERS),
          loadTimes && loadTimes.containers,
        ),
      ),
    { method: 'POST', overwriteRoutes: true },
  );
  fetchMock.get(
    new RegExp('settings.svg'),
    () => {
      return `<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M11.701 16.7a5.002 5.002 0 110-10.003 5.002 5.002 0 010 10.004m8.368-3.117a1.995 1.995 0 01-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 00.315-.574 8.947 8.947 0 00-.836-1.993.477.477 0 00-.598-.195 2.04 2.04 0 01-1.29.08 1.988 1.988 0 01-1.404-1.395 2.04 2.04 0 01.076-1.297.478.478 0 00-.196-.597 8.98 8.98 0 00-1.975-.826.479.479 0 00-.574.314 1.995 1.995 0 01-1.885 1.346 1.994 1.994 0 01-1.884-1.345.482.482 0 00-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 00-.198.582A2.002 2.002 0 014.445 7.06a.478.478 0 00-.595.196 8.946 8.946 0 00-.833 1.994.48.48 0 00.308.572 1.995 1.995 0 011.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 00-.308.57 8.99 8.99 0 00.723 1.79.477.477 0 00.624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 00.168.628 8.946 8.946 0 002.11.897.474.474 0 00.57-.313 1.995 1.995 0 011.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 00.57.313 8.964 8.964 0 002.084-.883.473.473 0 00.167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 00.628-.19 8.925 8.925 0 00.728-1.793.478.478 0 00-.314-.573" fill="currentColor" fill-rule="evenodd"/></svg>`;
    },
    { method: 'GET', overwriteRoutes: false },
  );
};

export const mockAvailableProductsEndpoint = (
  endpoint: string | RegExp,
  transformer?: DataTransformer,
  loadTimes: LoadTimes = {},
) => {
  const mockData = getMockData(transformer);

  const { AVAILABLE_PRODUCTS_DATA, AVAILABLE_PRODUCTS_DATA_ERROR } = mockData;
  fetchMock.get(
    endpoint,
    () =>
      // rejecting a promise will be treated as a timeout
      // instead we need to reject with the status code if we want to cascade the rejection out of the fetch
      typeof AVAILABLE_PRODUCTS_DATA_ERROR === 'number'
        ? AVAILABLE_PRODUCTS_DATA_ERROR
        : new Promise((res, rej) =>
            setTimeout(
              () =>
                AVAILABLE_PRODUCTS_DATA_ERROR
                  ? rej(AVAILABLE_PRODUCTS_DATA_ERROR)
                  : res(AVAILABLE_PRODUCTS_DATA),
              loadTimes && loadTimes.availableProducts,
            ),
          ),
    { method: 'GET', overwriteRoutes: true },
  );
};

export const mockProductRecommendationsEndpoint = (
  endpoint: string | RegExp,
  transformer?: DataTransformer,
  loadTimes: LoadTimes = {},
) => {
  const mockData = getMockData(transformer);
  const {
    PRODUCT_RECOMMENDATIONS_DATA,
    PRODUCT_RECOMMENDATIONS_DATA_ERROR,
  } = mockData;
  fetchMock.get(
    endpoint,
    () =>
      // rejecting a promise will be treated as a timeout
      // instead we need to reject with the status code if we want to cascade the rejection out of the fetch
      typeof PRODUCT_RECOMMENDATIONS_DATA_ERROR === 'number'
        ? PRODUCT_RECOMMENDATIONS_DATA_ERROR
        : new Promise((res, rej) => {
            setTimeout(
              () =>
                PRODUCT_RECOMMENDATIONS_DATA_ERROR
                  ? rej(PRODUCT_RECOMMENDATIONS_DATA_ERROR)
                  : res(PRODUCT_RECOMMENDATIONS_DATA),
              loadTimes && loadTimes.productRecommendations,
            );
          }),
    { method: 'GET', overwriteRoutes: true },
  );
};

export const mockProductConfigurationEndpoint = (
  endpoint: string | RegExp,
  transformer?: DataTransformer,
  loadTimes: LoadTimes = {},
) => {
  const mockData = getMockData(transformer);
  const {
    PRODUCT_CONFIGURATIONS_DATA,
    PRODUCT_CONFIGURATIONS_DATA_ERROR,
  } = mockData;
  fetchMock.get(
    endpoint,
    () =>
      // rejecting a promise will be treated as a timeout
      // instead we need to reject with the status code if we want to cascade the rejection out of the fetch
      typeof PRODUCT_CONFIGURATIONS_DATA_ERROR === 'number'
        ? PRODUCT_CONFIGURATIONS_DATA_ERROR
        : new Promise((res, rej) => {
            setTimeout(
              () =>
                PRODUCT_CONFIGURATIONS_DATA_ERROR
                  ? rej(PRODUCT_CONFIGURATIONS_DATA_ERROR)
                  : res(PRODUCT_CONFIGURATIONS_DATA),
              loadTimes && loadTimes.productConfigurations,
            );
          }),
    { method: 'GET', overwriteRoutes: true },
  );
};
