import React, { useState } from 'react';
import { useProductStateMachine } from '../../../product-state-machine';
import { ActiveProduct } from '../active-product';
import { SearchItems } from '../result-types';
import {
  CacheWarmingProps,
  EMPTY_SEARCH_ITEMS,
  ResultSuppliers,
} from './result-provider-types';
import { ResultRenderer } from './result-renderer';
import {
  CustomizedRendererChildFn,
  ScreenSpecificProps,
} from './result-renderer';
import RegisterAnalytics from './analytics/register-analytics';
import { AdvancedSearchFooterProps } from '../../../advanced-search-footer';

export interface ResultProviderProps {
  id: string;
  /**
   * We don't want product state machine logic to kick for Conf and Jira.
   * These legacy dialogs maintain the state within themselves in a very crude way.
   * Hence we pass this flag to disable unnecessarily running the state machine when
   * the old dialogs are active.
   *
   * It is only for legacy products. Any new implementation should not use this.
   * Will be removed in [this PR](https://product-fabric.atlassian.net/browse/QS-2302)
   */
  PLS_DONT_USE_skipDefaultStateManagement?: boolean;
}

export type ResultProviderCompleteProps = ResultProviderProps &
  ResultSuppliers &
  CacheWarmingProps &
  ScreenSpecificProps &
  CustomizedRendererChildFn &
  AdvancedSearchFooterProps;

/**
 * This component provides the components with Pre, Post query results and the current state of the product.
 */
export const ResultProvider: React.FC<ResultProviderCompleteProps> = ({
  children,
  id,
  PLS_DONT_USE_skipDefaultStateManagement,
  ...rest
}) => {
  const [preQueryItems, setPreQueryItems] = useState<SearchItems>(
    EMPTY_SEARCH_ITEMS,
  );
  const [postQueryItems, setPostQueryItems] = useState<SearchItems>(
    EMPTY_SEARCH_ITEMS,
  );

  const { state, onRetry } = useProductStateMachine({
    id,
    setPreQueryItems,
    setPostQueryItems,
    ...rest,
  });

  return (
    <ActiveProduct id={id}>
      {!PLS_DONT_USE_skipDefaultStateManagement ? (
        <RegisterAnalytics
          postQueryItems={postQueryItems}
          preQueryItems={preQueryItems}
          productState={state}
        >
          <ResultRenderer
            {...rest}
            preQueryItems={preQueryItems}
            postQueryItems={postQueryItems}
            productState={state}
            onRetry={onRetry}
          >
            {children}
          </ResultRenderer>
        </RegisterAnalytics>
      ) : (
        children
      )}
    </ActiveProduct>
  );
};
