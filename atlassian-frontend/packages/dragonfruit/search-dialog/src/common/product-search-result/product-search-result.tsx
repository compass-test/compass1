import React, { FunctionComponent, useCallback } from 'react';
import { SearchResult, SearchResultProps } from '../search-result';
import {
  SearchDialogAnalyticsContext,
  useAnalytics,
  ScreenType,
  NonPrivacySafeContext,
  SearchResultContextPayload,
  onSearchResultHighlighted,
  onSearchResultSelected,
} from '../analytics';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

interface PropsWithAnalyticsContext extends SearchResultProps {
  analyticContext: SearchResultContextPayload;
  nonPrivacySafeAnalyticContext?: NonPrivacySafeContext;
  screen: ScreenType;
}

interface PropsWithAnalytics extends SearchResultProps {
  analyticContext: SearchResultContextPayload;
  screen: ScreenType;
}

const withAnalyticsHandlerFor = (action: string, actionSubject: string) => {
  return ({
    screen,
    analyticContext,
    onSelect,
    onHighlighted,
    ...rest
  }: PropsWithAnalytics) => {
    const { fireAnalyticsEvent } = useAnalytics();
    const { createAnalyticsEvent } = useAnalyticsEvents();

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
          }),
        );

        onSelect?.(e);
        fireUIAnalytics(
          createAnalyticsEvent({
            action,
            actionSubject,
          }),
          analyticContext.sectionId,
          {
            id: analyticContext.id || undefined,
          },
        );
      },
      [
        onSelect,
        fireAnalyticsEvent,
        screen,
        analyticContext.id,
        analyticContext.sectionId,
        createAnalyticsEvent,
      ],
    );

    return (
      <SearchResult
        {...rest}
        onSelect={onSelectCallback}
        onHighlighted={onHighlightCallback}
      />
    );
  };
};

const withAnalyticsContext = (
  Comp: FunctionComponent<PropsWithAnalyticsContext>,
) => {
  return ({
    analyticContext,
    nonPrivacySafeAnalyticContext,
    ...rest
  }: PropsWithAnalyticsContext) => {
    return (
      <SearchDialogAnalyticsContext
        analyticContext={analyticContext}
        nonPrivacySafeAnalyticContext={nonPrivacySafeAnalyticContext || {}}
      >
        <Comp analyticContext={analyticContext} {...rest} />
      </SearchDialogAnalyticsContext>
    );
  };
};

const ProductSearchResult: FunctionComponent<PropsWithAnalyticsContext> = withAnalyticsContext(
  withAnalyticsHandlerFor('selected', 'searchResult'),
);

export const ProductSearchResultForPreQuery: FunctionComponent<PropsWithAnalyticsContext> = withAnalyticsContext(
  withAnalyticsHandlerFor('selected', 'searchResultPreQuery'),
);

export default ProductSearchResult;
