import React, {
  FunctionComponent,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { useProductContext } from '../product-router';
import { mergeRefCallback } from '../../utils/merge-ref-callback';
import { useQuery } from '../query-context';
import { useDialogExpansionContext } from '../dialog-expansion-context';

interface ActiveProductSearchInputContextProps {
  activeProductId?: string;
  query: string;
  setQuery: (query: string) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  isExpanded: boolean;
}

export interface ChildrenProps {
  activeProductId?: string;
  forwardRef: Ref<HTMLInputElement>;
  query: string;
  setQuery: (query: string) => void;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  onOpen: () => void;
}

interface ActiveProductSearchInput {
  children: (props: ChildrenProps) => React.ReactElement | null;
  forwardRef: RefObject<HTMLInputElement>;
}

export const ActiveProductSearchInputStateless: FunctionComponent<
  ActiveProductSearchInput & ActiveProductSearchInputContextProps
> = ({
  children,
  forwardRef,
  isExpanded,
  setIsExpanded,
  activeProductId,
  query,
  setQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef?.current?.focus();
    } else {
      setQuery('');
    }
  }, [activeProductId, isExpanded, setQuery]);

  const ref = mergeRefCallback(forwardRef, inputRef);

  const onOpen = useCallback(() => setIsExpanded(true), [setIsExpanded]);

  return (
    <>
      {children
        ? children({
            activeProductId,
            query,
            setQuery,
            forwardRef: ref,
            isExpanded,
            setIsExpanded,
            onOpen,
          })
        : null}
    </>
  );
};

export const ActiveProductSearchInput: FunctionComponent<ActiveProductSearchInput> = (
  props,
) => {
  const { getActiveProduct } = useProductContext();
  const { query, setQuery } = useQuery();
  const { isExpanded, setIsExpanded } = useDialogExpansionContext();

  const activeProduct = getActiveProduct();

  return (
    <ActiveProductSearchInputStateless
      {...props}
      activeProductId={activeProduct?.id}
      query={query}
      setQuery={setQuery}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
  );
};

export default ActiveProductSearchInput;
