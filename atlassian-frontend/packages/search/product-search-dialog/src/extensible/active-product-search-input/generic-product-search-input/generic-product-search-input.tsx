import React, { useCallback } from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { ChildrenProps } from '..';
import { ProductSearchInput } from '../../../common/product-search-input';
import { messages } from '../../../messages';
import { useProductContext } from '../../product-router';

const debounceTime = 250;

const GenericInputWithIntl = ({
  activeProductId,
  intl,
  onNavigateGeneric,
  query,
  isExpanded,
  isLoading,
  onOpen,
  forwardRef,
  onBack,
  setQuery,
}: ChildrenProps & InjectedIntlProps) => {
  const { getProduct } = useProductContext();

  const onNavigateGenericInput = useCallback(
    (productId: string) => (
      href: string,
      event: React.MouseEvent | KeyboardEvent,
    ) => {
      if (href) {
        onNavigateGeneric(productId, href, event);
      }
    },
    [onNavigateGeneric],
  );

  const {
    advancedSearchUrl,
    onNavigate,
    actionSubjectId,
    expandedStateInputPlaceholder,
  } = (() => {
    if (!activeProductId || !getProduct(activeProductId)) {
      return {
        advancedSearchUrl: '',
        onNavigate: () => {},
        actionSubjectId: 'noActiveProduct',
      };
    }

    return {
      advancedSearchUrl:
        getProduct(activeProductId)?.generateAdvancedSearchUrl?.(query) || '',
      expandedStateInputPlaceholder:
        getProduct(activeProductId)?.expandedStateInputPlaceholder || '',
      onNavigate: onNavigateGenericInput(activeProductId),
      actionSubjectId: activeProductId,
    };
  })();

  return (
    <ProductSearchInput
      forwardRef={forwardRef}
      value={query}
      isExpanded={isExpanded}
      isLoading={isLoading}
      onOpen={onOpen}
      debounceTime={debounceTime}
      advancedSearchURL={advancedSearchUrl}
      actionSubjectId={actionSubjectId}
      onBack={onBack}
      onInput={setQuery}
      expandedPlaceholder={
        expandedStateInputPlaceholder
          ? expandedStateInputPlaceholder
          : intl.formatMessage(
              messages.common_search_input_collapsed_placeholder,
            )
      }
      collapsedPlaceholder={intl.formatMessage(
        messages.common_search_input_collapsed_placeholder,
      )}
      onNavigate={onNavigate}
    />
  );
};

export const GenericProductSearchInput = injectIntl(GenericInputWithIntl);
