import { EMPTY_SEARCH_ITEMS, ResultSuppliers } from '../product-router/product';

export const noResultSuppliers = (): ResultSuppliers => ({
  preQueryItemSupplier: () => Promise.resolve(EMPTY_SEARCH_ITEMS),
  postQueryItemSupplier: () => Promise.resolve(EMPTY_SEARCH_ITEMS),
});
