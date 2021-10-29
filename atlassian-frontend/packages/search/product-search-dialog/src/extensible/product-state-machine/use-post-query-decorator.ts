import { ResultSuppliers } from '../product-router';
import {
  DecoratorResultSetStateProps,
  useDecorateWithResultAndAPISetState,
} from './use-decorate-with-result-and-api-set-state';

/**
 * This decorator adds capabilities of API state tracking and debouncing to the plain PostQuerySupplier.
 * Think of this as an internal private method of useProductStateMachine.
 * @returns A cached implementation of PreQuery Supplier which is also aware of setting its respective API state.
 */
export const usePostQueryDecorator = ({
  setAPIState,
  setState,
  postQueryItemSupplier,
}: Pick<ResultSuppliers, 'postQueryItemSupplier'> &
  Pick<DecoratorResultSetStateProps<{}>, 'setState' | 'setAPIState'>) => {
  const decoratedPostQuery = useDecorateWithResultAndAPISetState({
    setState,
    setAPIState,
    searchItemSupplier: postQueryItemSupplier,
  });

  return decoratedPostQuery;
};
