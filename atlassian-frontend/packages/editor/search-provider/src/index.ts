import { Scope } from '@atlassian/product-search-dialog/search-client';
import {
  SearchProvider,
  QuickSearchResult,
} from '@atlaskit/editor-common/provider-factory';

import SearchResource from './api/SearchResource';

export const createSearchProvider = (
  cloudId: string,
  scope: Scope,
  aggregatorUrl?: string,
): SearchProvider => {
  return new SearchResource(cloudId, scope, aggregatorUrl);
};

export { SearchResource, Scope };
export type { SearchProvider, QuickSearchResult };
