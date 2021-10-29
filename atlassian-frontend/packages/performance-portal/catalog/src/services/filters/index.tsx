import { DeepPartial } from 'utility-types';

import {
  createUrlSyncedStore,
  Product,
  PRODUCTS,
  ProductType,
  sanitiseValue,
} from '@atlassian/performance-portal-common';

import {
  SearchMetricsSortBy,
  SearchMetricsSortOrder,
} from '../../__generated__/graphql';
import { SelectedProducts } from '../../types';

export const defaultSelectedProductsState = PRODUCTS.reduce(
  (acc: SelectedProducts, { id }: Product) => {
    acc[id] = true;
    return acc;
  },
  {},
);

export interface SearchMetricsSort {
  sortBy: SearchMetricsSortBy;
  sortOrder: SearchMetricsSortOrder;
}

type State = {
  products: Partial<Record<ProductType, boolean>>;
  text: string;
  sort: SearchMetricsSort | null;
};

const initialState: State = {
  products: defaultSelectedProductsState,
  text: '',
  sort: null,
};

const sanitiseSort = (
  sort: DeepPartial<SearchMetricsSort>,
): SearchMetricsSort => ({
  sortBy: sanitiseValue(
    sort.sortBy,
    Object.values(SearchMetricsSortBy),
    SearchMetricsSortBy.NAME,
  ).validValue,
  sortOrder: sanitiseValue(
    sort.sortOrder,
    Object.values(SearchMetricsSortOrder),
    SearchMetricsSortOrder.ASC,
  ).validValue,
});

export const [
  filtersStore,
  FiltersContainer,
  useFilters,
] = createUrlSyncedStore({
  name: 'catalog-filters-store',
  queryParamName: 'catalogFilters',
  initialState,
  actions: {
    toggleProduct: (product: ProductType) => ({ setState, getState }) => {
      const prevState = getState();
      if (product in prevState.products) {
        setState({
          ...prevState,
          products: {
            ...prevState.products,
            [product]: !prevState.products[product],
          },
        });
      }
    },
    setText: (text) => ({ setState, getState }) => {
      const prevState = getState();
      setState({ ...prevState, text });
    },
    setSort: (sort: SearchMetricsSort) => ({ setState, getState }) => {
      const prevState = getState();
      const sanitisedSort = sanitiseSort(sort);
      setState({ ...prevState, sort: sanitisedSort });
    },
  },
  onInit: (stateFromUrl) => {
    return {
      ...stateFromUrl,
      sort: stateFromUrl?.sort && sanitiseSort(stateFromUrl?.sort),
    };
  },
});
