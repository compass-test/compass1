import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  EMPTY_SEARCH_ITEMS,
  ResultSuppliers,
} from '../../product-router/product';
import { SearchItems } from '../../product-router/product/result-types';
import { useQuery } from '../../query-context';
import { useProductContext } from '../../product-router';
import { APIStates } from '../product-state-machine-types';

interface UseInvocationsProps {
  id: string;
  onRetry?: () => void;
}

interface DebounceHookProps {
  debounceTime: number;
}

interface PostQueryInvocationProps {
  setPostQueryItems: (items: SearchItems) => void;
  setPostQueryAPIState: (state: APIStates) => void;
}

interface PreQueryInvocationProps {
  isPrefetchingEnabled: boolean;
}
interface PostQueryInvocationContextProps {}

interface ProductContextProps {
  sectionIds: string[];
  isDisplayed: boolean;
}

interface ContextProps {
  query: string;
}

export type PostQueryProps = PostQueryInvocationProps &
  ContextProps &
  ProductContextProps &
  DebounceHookProps &
  PostQueryInvocationContextProps &
  Pick<ResultSuppliers, 'postQueryItemSupplier'>;

const useDebouncedState = ({
  debounceTime,
}: DebounceHookProps): [boolean, (value: boolean) => void, () => void] => {
  const [triggerDebounce, setTriggerDebounce] = useState<boolean>(false);

  const debouncedSetter = useMemo(
    () =>
      debounce(() => {
        setTriggerDebounce(true);
      }, debounceTime),
    [debounceTime, setTriggerDebounce],
  );

  return [triggerDebounce, setTriggerDebounce, debouncedSetter];
};

export const usePostQueryInvocation = ({
  debounceTime,
  query,
  sectionIds,
  isDisplayed,
  postQueryItemSupplier,
  setPostQueryItems,
  setPostQueryAPIState,
}: PostQueryProps) => {
  // If product becomes active from an inactive state then we want to skip the debouncing invocation of the post query supplier.
  const isDisplayedRef = useRef<boolean>(isDisplayed);

  // The default here is an undefined string here to support the case where the initial state of the component is a non-empty string
  // In that case we want to fire off a search the moment the tab becomes visible
  const previousQuery = useRef<string | undefined>(undefined);

  const [
    triggerDebounce,
    setTriggerDebounce,
    debouncedSetter,
  ] = useDebouncedState({ debounceTime });

  useResetPostQueryAPIStateOnEmptyQuery({
    query,
    setPostQueryAPIState,
    isDisplayed,
  });

  useResetPostQueryItemOnNewSearch({
    query,
    setPostQueryItems,
    setPostQueryAPIState,
    isDisplayed,
    debouncedSetter,
    sectionIds,
  });

  useEffect(() => {
    if (
      (triggerDebounce ||
        (isDisplayedRef.current === false && isDisplayed === true)) &&
      query &&
      query !== previousQuery.current &&
      isDisplayed &&
      sectionIds
    ) {
      previousQuery.current = query;

      postQueryItemSupplier({
        query: query,
        sectionIds,
      }).catch((ignore) => {});
      setTriggerDebounce(false);
    }

    isDisplayedRef.current = isDisplayed;

    // In the case of an empty query we want to reset any previous query caches
    // Still potentially not optimal as you would not get the cache behaviour if you
    // clear the query when you're on a different tab. It shouldn't feel jank though.
    if (!query) {
      previousQuery.current = '';
    }
  }, [
    triggerDebounce,
    setTriggerDebounce,
    postQueryItemSupplier,
    sectionIds,
    query,
    isDisplayed,
  ]);
};

interface ResetPostQueryProps {
  query: string;
  isDisplayed: boolean;
}

interface ResetPostQueryOnNewSearch extends ResetPostQueryProps {
  debouncedSetter: () => void;
}

const useResetPostQueryItemOnNewSearch = ({
  query,
  isDisplayed,
  setPostQueryItems,
  setPostQueryAPIState,
  debouncedSetter,
  sectionIds,
}: ResetPostQueryOnNewSearch &
  PostQueryInvocationProps &
  Pick<ProductContextProps, 'sectionIds'>) => {
  // We want to retain the last search query value to avoid an infinite loop of postQueryItemSupplier
  const queryRef = useRef<string>(query);

  useEffect(() => {
    if (
      queryRef.current !== query &&
      query &&
      isDisplayed &&
      sectionIds &&
      sectionIds.length > 0
    ) {
      // reset post query when we start a new search
      setPostQueryItems(EMPTY_SEARCH_ITEMS);
      setPostQueryAPIState(APIStates.Loading);
      debouncedSetter();
    }

    queryRef.current = query;
  }, [
    query,
    isDisplayed,
    sectionIds,
    setPostQueryItems,
    setPostQueryAPIState,
    debouncedSetter,
    queryRef,
  ]);
};

const useResetPostQueryAPIStateOnEmptyQuery = ({
  query,
  isDisplayed,
  setPostQueryAPIState,
}: Pick<PostQueryInvocationProps, 'setPostQueryAPIState'> &
  ResetPostQueryProps) => {
  // We want to retain the last search query value to avoid an infinite loop of postQueryItemSupplier
  const queryRef = useRef<string>(query);

  useEffect(() => {
    if (query === '' && isDisplayed && queryRef.current !== '') {
      // reset post query api state if user returns to pre-query by removing the query
      setPostQueryAPIState(APIStates.Loading);
    }
    queryRef.current = query;
  }, [query, isDisplayed, setPostQueryAPIState, queryRef]);
};

export type PreQueryProps = ContextProps &
  PreQueryInvocationProps &
  ProductContextProps &
  Pick<ResultSuppliers, 'preQueryItemSupplier'>;

export const usePreQueryInvocation = ({
  query,
  isPrefetchingEnabled,
  sectionIds,
  preQueryItemSupplier,
  isDisplayed,
}: PreQueryProps) => {
  /**
   * Even in case of cache warming we want to track the product state hence we should always pass the decorated supplier. Note: Both decorated and non decorated suppliers have the same signature.
   */
  useEffect(() => {
    if (
      query === '' &&
      (isPrefetchingEnabled === true || isDisplayed === true) &&
      sectionIds &&
      sectionIds.length > 0
    ) {
      preQueryItemSupplier({ sectionIds }).catch((ignore) => {});
    }
  }, [
    isPrefetchingEnabled,
    isDisplayed,
    sectionIds,
    preQueryItemSupplier,
    query,
  ]);
};

export type RetryArgs = { onRetry?: () => void } & ProductContextProps &
  Pick<ResultSuppliers, 'postQueryItemSupplier'>;

export const useOnRetryInvocation = ({
  postQueryItemSupplier,
  onRetry,
  sectionIds,
}: RetryArgs) => {
  const { query } = useQuery();

  return useCallback(() => {
    postQueryItemSupplier({ query, sectionIds });
    onRetry?.();
  }, [onRetry, postQueryItemSupplier, sectionIds, query]);
};

export const useInvocations = ({
  id,
  debounceTime,
  query,
  isPrefetchingEnabled,
  onRetry,
  preQueryItemSupplier,
  postQueryItemSupplier,
  setPostQueryItems,
  setPostQueryAPIState,
}: UseInvocationsProps &
  ResultSuppliers &
  PostQueryInvocationProps &
  PreQueryInvocationProps &
  DebounceHookProps &
  ContextProps) => {
  const { getProduct } = useProductContext();
  const product = getProduct(id);
  const isDisplayed = product?.isDisplayed || false;
  const sectionIds = useMemo(() => product?.sectionIds || [], [product]);

  usePostQueryInvocation({
    isDisplayed,
    debounceTime,
    postQueryItemSupplier,
    query,
    sectionIds,
    setPostQueryItems,
    setPostQueryAPIState,
  });

  usePreQueryInvocation({
    isDisplayed,
    preQueryItemSupplier,
    query,
    sectionIds,
    isPrefetchingEnabled,
  });

  const updateStateOnRetry = useOnRetryInvocation({
    postQueryItemSupplier,
    onRetry,
    sectionIds,
    isDisplayed,
  });

  return {
    onRetry: updateStateOnRetry,
  };
};
