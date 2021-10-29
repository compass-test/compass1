import { useCallback, useState } from 'react';
import { SimpleCache } from '../../utils/simple-cache';
import { ResultSuppliers } from '../product-router';
import { PreQuerySupplierArgs } from '../product-router/product/result-provider/result-provider-types';
import { SearchItems } from '../product-router/product/result-types';
import {
  DecoratorResultSetStateProps,
  useDecorateWithResultAndAPISetState,
} from './use-decorate-with-result-and-api-set-state';

/**
 * This decorator adds capabilities of API state tracking and caching to the plain PreQuerySupplier.
 * Think of this as an internal private method of useProductStateMachine.
 *
 * @returns A cached implementation of PreQuery Supplier which is also aware of setting its respective API state.
 */
export const usePreQueryDecorator = ({
  preQueryItemSupplier,
  setAPIState,
  setState,
}: Pick<ResultSuppliers, 'preQueryItemSupplier'> &
  Pick<DecoratorResultSetStateProps<{}>, 'setState' | 'setAPIState'>) => {
  const [preQueryCache] = useState<
    SimpleCache<Promise<SearchItems>, [PreQuerySupplierArgs]>
  >(new SimpleCache(preQueryItemSupplier));

  const searchItemSupplier = useCallback(
    (args) => preQueryCache.get(args).value,
    [preQueryCache],
  );

  return useDecorateWithResultAndAPISetState({
    setState,
    setAPIState,
    searchItemSupplier,
  });
};
