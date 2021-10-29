import { SearchItems } from '../result-types';

export interface ResultSuppliers {
  /**
   * Controls what is displayed in the pre-query view of the product. Suppliers typically fetch a set of results from
   * a remote server, as well as defining how that data should be displayed (in terms of sections)
   */
  preQueryItemSupplier: (args: PreQuerySupplierArgs) => Promise<SearchItems>;
  /**
   * Controls what is displayed in the post-query view of the product. Takes an object argument which describes the search,
   * including search parameters such as the query or applied filters. Suppliers typically fetch a set of results from a remote server,
   * as well as defining how that data should be displayed (in terms of sections)
   */
  postQueryItemSupplier: (args: PostQuerySupplierArgs) => Promise<SearchItems>;
}

export interface CacheWarmingProps {
  // Enables calling of the preQueryItemSupplier when this product is mounted, with the intent that the item supplier caches the results
  isPrefetchingEnabled?: boolean;
}

interface CommonSupplierArgs {
  sectionIds: string[];
}

/**
 * Describes the parameters of a given search in pre-query, such as the query string
 */
export interface PreQuerySupplierArgs extends CommonSupplierArgs {}

/**
 * Describes the parameters of a given search in post query, such as the query string
 */
export interface PostQuerySupplierArgs extends CommonSupplierArgs {
  query: string;
}

export const EMPTY_SEARCH_ITEMS: SearchItems = {
  size: 0,
  sections: [],
};
