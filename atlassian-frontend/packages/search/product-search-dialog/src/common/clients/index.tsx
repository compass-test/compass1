import * as CommonTypes from './common-types';

export { AggregatorClient } from './base-search-client';
export { CollaborationGraphClient } from './collaboration-graph-client';
export { responseErrorToError } from './error-handler';
export { extractSiteUrl } from './multi-site-utils';
export { timed } from './timing';

export type ModelParam = CommonTypes.ModelParam;
export type SearchContext = CommonTypes.SearchContext;
export type AggregatorConfig = import('./base-search-client').AggregatorConfig;
export type ProductsPermissionsResponse<
  T
> = import('./base-search-client').ProductsPermissionsResponse<T>;
export type CollaborationGraphConfig = import('./collaboration-graph-client').CollaborationGraphConfig;
export type ABTest = CommonTypes.ABTest;
export type ContainerType = CommonTypes.ContainerType;
export type ScopedAggregatorResponse<T> = CommonTypes.ScopedAggregatorResponse<
  T
>;
export type CollaborationGraphResponse<
  T
> = CommonTypes.CollaborationGraphResponse<T>;
export type CollaborationGraphContainer = CommonTypes.CollaborationGraphContainer;
export type SharedClient = CommonTypes.SharedClient;

// Multi site
export type Site = CommonTypes.Site;
