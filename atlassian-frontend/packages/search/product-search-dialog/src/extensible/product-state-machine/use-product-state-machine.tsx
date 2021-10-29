import { useState } from 'react';
import { APIStates, ProductStates } from './product-state-machine-types';
import { usePostQueryDecorator } from './use-post-query-decorator';
import { usePreQueryDecorator } from './use-pre-query-decorator';
import { useInvocations } from './invocations/use-invocations';
import { ResultSuppliers } from '../product-router';
import { CacheWarmingProps } from '../product-router/product';
import { useQuery } from '../query-context';
import { SearchItems } from '../product-router/product/result-types';

export const ProductStateMachinePossibleStates = {
  preQuery: {
    [APIStates.Error]: ProductStates.PreQueryError,
    [APIStates.Loading]: ProductStates.PreQueryLoading,
    [APIStates.NoResult]: ProductStates.PreQueryNoResult,
    [APIStates.Success]: ProductStates.PreQuerySuccess,
  },
  postQuery: {
    [APIStates.Error]: ProductStates.PostQueryError,
    [APIStates.Loading]: ProductStates.PostQueryLoading,
    [APIStates.NoResult]: ProductStates.PostQueryNoResult,
    [APIStates.Success]: ProductStates.PostQuerySuccess,
  },
};

export interface StateMachineArgs {
  setPreQueryItems: (items: SearchItems) => void;
  setPostQueryItems: (items: SearchItems) => void;
  id: string;
  debounceTime?: number;
  onRetry?: () => void;
}

export type ProductStateMachineArgs = StateMachineArgs &
  ResultSuppliers &
  CacheWarmingProps;

export const useProductStateMachine = ({
  setPreQueryItems,
  setPostQueryItems,
  preQueryItemSupplier,
  postQueryItemSupplier,
  id,
  isPrefetchingEnabled = false,
  debounceTime = 250,
  onRetry,
}: ProductStateMachineArgs) => {
  const { query } = useQuery();
  /**
   * We track the API calls of Post and Pre query separately.
   */
  const [preQueryAPIState, setPreQueryAPIState] = useState<APIStates>(
    APIStates.Loading,
  );
  const [postQueryAPIState, setPostQueryAPIState] = useState<APIStates>(
    APIStates.Loading,
  );

  const decoratedPreQuerySupplier = usePreQueryDecorator({
    setAPIState: setPreQueryAPIState,
    preQueryItemSupplier,
    setState: setPreQueryItems,
  });

  const decoratedPostQuerySupplier = usePostQueryDecorator({
    setAPIState: setPostQueryAPIState,
    setState: setPostQueryItems,
    postQueryItemSupplier,
  });

  const { onRetry: updateStateOnRetry } = useInvocations({
    id,
    query,
    isPrefetchingEnabled,
    preQueryItemSupplier: decoratedPreQuerySupplier,
    postQueryItemSupplier: decoratedPostQuerySupplier,
    debounceTime,
    setPostQueryItems,
    onRetry,
    setPostQueryAPIState,
  });

  let state: ProductStates;

  if (query !== '') {
    state = ProductStateMachinePossibleStates.postQuery[postQueryAPIState];
  } else {
    state = ProductStateMachinePossibleStates.preQuery[preQueryAPIState];
  }

  return {
    state,
    onRetry: updateStateOnRetry,
  };
};
