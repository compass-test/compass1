import React from 'react';
import { ResultContainer, SearchDialogContent } from '@atlassian/search-dialog';
import { ProductStates } from '../../../../product-state-machine/product-state-machine-types';
import { GenericSearchResult } from '../../../../search-result/search-result';
import { LoadingSpinner } from '../../../../../common/loading-spinner';

import {
  CustomizedRendererChildFn,
  ResultRendererProps,
  ScreenSpecificProps,
} from './result-renderer-types';
import { FasterSearchFirstSection } from '../faster-search-first-section';
import {
  NoPreQueryResults,
  PreQueryErrorScreen,
  NoSearchResults,
} from '../../../../no-results-screen';
import { SearchErrorScreen } from '../../../../search-error-screen/search-error-screen';
import { ViewAllLink } from '../../../../search-result/view-all-link';
import { useQuery } from '../../../../query-context';
import { messages } from '../../../../../messages';
import { HeightRetainingContainer } from '../height-retaining-container';
import { AdvancedSearchFooterProps } from '../../../../advanced-search-footer';
import { GetDefaultFooter } from './default-footer';

export const ResultRenderer: React.FC<
  ResultRendererProps &
    ScreenSpecificProps &
    CustomizedRendererChildFn &
    AdvancedSearchFooterProps
> = ({
  productState,
  preQueryItems,
  postQueryItems,
  onRetry,
  urlGeneratorForNoResultsScreen,
  preQuerySectionTitleGenerator,
  linkComponent,
  children,
  searchFooterLabel,
}) => {
  const DefaultHeader = () => <></>;
  const DefaultFooter = () => (
    <GetDefaultFooter
      urlGeneratorForNoResultsScreen={urlGeneratorForNoResultsScreen}
      linkComponent={linkComponent}
      productState={productState}
      searchFooterLabel={searchFooterLabel}
    />
  );

  const { query } = useQuery();
  const renderer =
    children && typeof children === 'function'
      ? children({
          query,
          productState,
          linkComponent,
          onRetry,
          urlGeneratorForNoResultsScreen,
        })
      : null;

  const Header = renderer && renderer.Header ? renderer.Header : DefaultHeader;
  const Footer = renderer && renderer.Footer ? renderer.Footer : DefaultFooter;

  const CustomBody = renderer?.Body;
  const renderResults = () => {
    switch (productState) {
      case ProductStates.PostQueryError:
        return <SearchErrorScreen onRetry={onRetry} />;
      case ProductStates.PostQueryLoading:
        return (
          <FasterSearchFirstSection preQueryItems={preQueryItems}>
            {({ searchItems }) => (
              <GenericSearchResult
                searchItems={searchItems}
                screen="cachedResults"
                showResultCount={() => false}
              >
                <LoadingSpinner />
              </GenericSearchResult>
            )}
          </FasterSearchFirstSection>
        );
      case ProductStates.PostQueryNoResult:
        return (
          <NoSearchResults
            urlGeneratorForNoResultsScreen={urlGeneratorForNoResultsScreen}
          />
        );
      case ProductStates.PostQuerySuccess:
        return (
          <FasterSearchFirstSection
            postQueryItems={postQueryItems}
            preQueryItems={preQueryItems}
          >
            {({ searchItems: firstSectionSearchItems }) => (
              <GenericSearchResult
                searchItems={{
                  sections: [
                    ...firstSectionSearchItems.sections,
                    ...postQueryItems.sections.slice(1),
                  ],
                  size: postQueryItems.size,
                }}
                screen="postQuerySearchResults"
                renderSectionViewAll={(props) => <ViewAllLink {...props} />}
                showResultCount={(sectionIndex) => sectionIndex === 0}
              />
            )}
          </FasterSearchFirstSection>
        );
      case ProductStates.PreQueryError:
        return <PreQueryErrorScreen />;
      case ProductStates.PreQueryLoading:
        return <LoadingSpinner />;
      case ProductStates.PreQueryNoResult:
        return <NoPreQueryResults />;
      case ProductStates.PreQuerySuccess:
        return (
          <GenericSearchResult
            searchItems={preQueryItems}
            generateSectionTitle={(title, intl) => {
              const overwrittenSectionTitle =
                preQuerySectionTitleGenerator &&
                preQuerySectionTitleGenerator(title, intl);

              const defaultSectionTitle = intl.formatMessage(
                messages.recently_viewed_title,
                { sectionTitle: title },
              );

              return overwrittenSectionTitle || defaultSectionTitle;
            }}
            screen="preQuerySearchResults"
            showResultCount={() => false}
          />
        );
    }
  };

  const isOnLoadingScreen =
    productState === ProductStates.PostQueryLoading ||
    productState === ProductStates.PreQueryLoading;
  return (
    <HeightRetainingContainer retainHeight={isOnLoadingScreen}>
      <SearchDialogContent>
        <ResultContainer>
          <Header />
          {CustomBody ? <CustomBody /> : renderResults()}
        </ResultContainer>
      </SearchDialogContent>
      <Footer />
    </HeightRetainingContainer>
  );
};
