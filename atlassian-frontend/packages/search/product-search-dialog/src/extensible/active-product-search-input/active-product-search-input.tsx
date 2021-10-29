import React, {
  FunctionComponent,
  Ref,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { useProductContext } from '../product-router';
import { mergeRefCallback } from '../../utils/merge-ref-callback';
import { useQuery } from '../query-context';
import { useDialogExpansionContext } from '../dialog-expansion-context';
import { useABTest } from '../ab-test-context';
import {
  ProductInputSearchSkeletonFeatures,
  ProductSearchInputSkeleton,
} from '../../common/product-search-input-skeleton';
import { useTheme } from '@atlassian/search-dialog';
import { GenericProductSearchInput } from './generic-product-search-input';

interface CommonProps {
  forwardRef: Ref<HTMLInputElement>;
}

interface NavigationRelatedProps {
  /**
   * A generic implementation of the navigation control function for internal use within the dialog.
   */
  onNavigateGeneric: (
    productId: string,
    href: string,
    event: React.MouseEvent | KeyboardEvent,
  ) => void;
}

interface ActiveProductSearchInputProps extends CommonProps {
  /**
   * Provides override capabilities to the ProductInputSearchSkeleton
   */
  features?: ProductInputSearchSkeletonFeatures;
}
interface ActiveProductSearchInputContextProps extends CommonProps {
  activeProductId?: string;
  query: string;
  setQuery: (query: string) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  isExpanded: boolean;
  isLoading: boolean;
}

export interface ChildrenProps
  extends Omit<ActiveProductSearchInputContextProps, 'forwardRef'>,
    NavigationRelatedProps {
  onOpen: () => void;
  onBack: () => void;
  forwardRef: Ref<HTMLInputElement>;
}

export type ExternalProps = ActiveProductSearchInputProps &
  NavigationRelatedProps;

export const ActiveProductSearchInputStateless: FunctionComponent<
  ActiveProductSearchInputContextProps & NavigationRelatedProps
> = ({
  forwardRef,
  isExpanded,
  setIsExpanded,
  activeProductId,
  query,
  setQuery,
  onNavigateGeneric,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef?.current?.focus();
    }
  }, [isExpanded, inputRef, activeProductId]);

  const ref = mergeRefCallback(forwardRef, inputRef);

  const onOpen = useCallback(() => setIsExpanded(true), [setIsExpanded]);

  const onBack = useCallback(() => {
    setIsExpanded(false);
  }, [setIsExpanded]);

  const inputComponentProps = {
    activeProductId,
    query,
    setQuery,
    forwardRef: ref,
    isExpanded,
    setIsExpanded,
    onOpen,
    onNavigateGeneric,
    onBack,
    isLoading,
  };

  return <GenericProductSearchInput {...inputComponentProps} />;
};

/**
 * A search input component made for a cross product experience. This input
 * changes based off the active product's registered properties.
 */
export const ActiveProductSearchInput: FunctionComponent<ExternalProps> = (
  props,
) => {
  const { getActiveProduct } = useProductContext();
  const { query, setQuery, isLoading } = useQuery();
  const { isExpanded, setIsExpanded } = useDialogExpansionContext();
  const abTest = useABTest();
  const theme = useTheme();
  const activeProduct = getActiveProduct();

  if (!abTest?.abTestId) {
    return (
      <ProductSearchInputSkeleton theme={theme} features={props.features} />
    );
  }

  return (
    <ActiveProductSearchInputStateless
      {...props}
      activeProductId={activeProduct?.id}
      query={query}
      setQuery={setQuery}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      isLoading={isLoading}
    />
  );
};
