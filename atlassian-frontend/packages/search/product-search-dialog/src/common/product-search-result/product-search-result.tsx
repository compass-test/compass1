import React, { FunctionComponent, useCallback } from 'react';
import { SearchResult, SearchResultProps } from '@atlassian/search-dialog';
import {
  SearchDialogAnalyticsContext,
  useAnalytics,
  ScreenType,
  NonPrivacySafeContext,
  SearchResultContextPayload,
  onSearchResultHighlighted,
  onSearchResultSelected,
} from '../analytics';
import { useSessionUserInput } from '../../extensible/user-input-provider';

interface PropsWithAnalyticsContext extends SearchResultProps {
  analyticContext: SearchResultContextPayload;
  nonPrivacySafeAnalyticContext?: NonPrivacySafeContext;
  screen: ScreenType;
}

interface PropsWithAnalytics extends SearchResultProps {
  screen: ScreenType;
}

const SearchResultWithAnalytics = ({
  screen,
  onSelect,
  onHighlighted,
  ...rest
}: PropsWithAnalytics) => {
  const { fireAnalyticsEvent } = useAnalytics();
  const {
    stickySearchEnabled: isSticky,
    isStickyUpdated,
  } = useSessionUserInput();

  const onHighlightCallback = useCallback(() => {
    fireAnalyticsEvent(
      onSearchResultHighlighted({
        screen,
      }),
    );

    onHighlighted?.();
  }, [fireAnalyticsEvent, onHighlighted, screen]);

  const onSelectCallback = useCallback(
    (e: React.MouseEvent<Element, MouseEvent> | KeyboardEvent) => {
      fireAnalyticsEvent(
        onSearchResultSelected({
          screen,
          isSticky,
          isStickyUpdated,
        }),
      );

      onSelect?.(e);
    },
    [fireAnalyticsEvent, isSticky, isStickyUpdated, onSelect, screen],
  );

  return (
    <SearchResult
      {...rest}
      onSelect={onSelectCallback}
      onHighlighted={onHighlightCallback}
    />
  );
};

const ProductSearchResult: FunctionComponent<PropsWithAnalyticsContext> = ({
  analyticContext,
  nonPrivacySafeAnalyticContext,
  ...rest
}) => {
  return (
    <SearchDialogAnalyticsContext
      analyticContext={analyticContext}
      nonPrivacySafeAnalyticContext={nonPrivacySafeAnalyticContext || {}}
    >
      <SearchResultWithAnalytics {...rest} />
    </SearchDialogAnalyticsContext>
  );
};

export default ProductSearchResult;
