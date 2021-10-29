import React, { useEffect, useMemo, useState } from 'react';

import { graphql } from 'react-relay';
import { useDebounce } from 'use-debounce';

import {
  SendPerformanceMeasured,
  SendScreenEvent,
} from '@atlassian/performance-portal-analytics';
import { Loading, ProductType } from '@atlassian/performance-portal-common';
import { useLazyLoadQueryWithLoadingState } from '@atlassian/performance-portal-relay-utils';

import { Product } from '../../../__generated__/graphql';
import { METRICS_PAGE_SIZE } from '../../../common/constants';
import { useFilters } from '../../../services/filters';
import { catalogPageLoad } from '../../../utils/performance';

import {
  catalogQuery,
  catalogQueryVariables,
} from './__generated__/catalogQuery.graphql';
import { MetricTable } from './metric-table';
import { SearchBar } from './search-bar';
import { Container } from './styled';

const getProductsArray = (
  products: Partial<Record<ProductType, boolean>>,
): Product[] => {
  const productsArray: Product[] = Object.entries(products).reduce(
    (selectedProducts, [product, isSelected]) => {
      return isSelected
        ? [...selectedProducts, product as Product]
        : selectedProducts;
    },
    [] as Product[],
  );

  return productsArray;
};

export const Catalog = () => {
  const [{ products, sort, text }, actions] = useFilters();
  // Use debounced text to reduce API calls.
  const [debouncedText] = useDebounce(text, 300);
  const [page, setPage] = useState(1);
  // Reset the page when the text has been changed.
  useEffect(() => setPage(1), [debouncedText]);

  const selectedProducts = useMemo(() => getProductsArray(products), [
    products,
  ]);

  const variables = useMemo<catalogQueryVariables>(() => {
    return {
      limit: METRICS_PAGE_SIZE,
      offset: METRICS_PAGE_SIZE * (page - 1),
      products: selectedProducts,
      searchString: debouncedText,
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };
  }, [debouncedText, page, selectedProducts, sort]);

  // TODO: use useQueryLoader in the route level and usePreloadedQuery here
  const {
    data: { searchMetrics },
    loading,
  } = useLazyLoadQueryWithLoadingState<catalogQuery>(
    graphql`
      query catalogQuery(
        $limit: Int
        $offset: Int
        $products: [Product!]
        $searchString: String
        $sortBy: SearchMetricsSortBy
        $sortOrder: SearchMetricsSortOrder
      ) {
        searchMetrics(
          limit: $limit
          offset: $offset
          products: $products
          searchString: $searchString
          sortBy: $sortBy
          sortOrder: $sortOrder
        ) {
          ...metricTableFragment
        }
      }
    `,
    variables,
  );

  return (
    <Container>
      <SearchBar />
      {searchMetrics ? (
        <MetricTable
          isLoading={loading}
          onSort={actions.setSort}
          page={page}
          sortKey={sort?.sortBy}
          sortOrder={sort?.sortOrder}
          onSetPage={setPage}
          data={searchMetrics}
        />
      ) : (
        <Loading />
      )}
      <SendPerformanceMeasured metric={catalogPageLoad} />
      <SendScreenEvent name={'catalog'} />
    </Container>
  );
};
