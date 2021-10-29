import React from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { LinkComponent, SearchResultSection } from '@atlassian/search-dialog';
import {
  SearchItems,
  SearchResultSection as SearchResultSectionType,
} from '../product-router/product/result-types';
import { ProductSearchResult } from '../../common/product-search-result';
import { useSearchSessionId } from '../../common/search-session-provider';
import { addQuery } from '../../utils/url-utils';
import { ResultAvatar as Avatar } from '../../common/result-avatar';
import { ScreenType } from '../../common/analytics';
import { ViewAllLinkProps } from './view-all-link';
import { hasSearchResults } from '../product-router/product/utils';

export const INITIAL_ITEM_LIMIT = 10;

interface SearchResultProps {
  searchItems: SearchItems;
  generateSectionTitle?: (title: string, intl: InjectedIntl) => string;
  screen: ScreenType;
  linkComponent?: LinkComponent;
  renderSectionViewAll?: (props: ViewAllLinkProps) => React.ReactElement;
  siteUrl?: string;
  showResultCount?: (sectionIndex: number) => boolean;
  children?: React.ReactChild;
}

export const getTotalNumberOfItemsInPreviousSections = (
  searchResultSections: SearchResultSectionType[],
  sectionIndex: number,
) =>
  searchResultSections
    .slice(0, sectionIndex)
    .reduce(
      (accumulator, currentElem) =>
        accumulator + currentElem.searchResults.length,
      0,
    );

const GenericSearchResultWithIntl: React.FC<
  SearchResultProps & InjectedIntlProps
> = ({
  searchItems,
  generateSectionTitle = (title) => title,
  screen,
  linkComponent,
  renderSectionViewAll,
  showResultCount = () => true,
  children,
  intl,
}) => {
  const searchSessionId = useSearchSessionId();
  if (!searchItems || !hasSearchResults(searchItems)) {
    if (children) {
      return <>{children}</>;
    }
    return null;
  }

  const renderItemSection = (
    section: SearchResultSectionType,
    sectionIndex: number,
  ) => {
    const { title, id } = section;

    const searchResults =
      section.searchResults?.slice(0, INITIAL_ITEM_LIMIT) || [];

    // Result count is only shown when a size is specified. We changed this
    // from using searchResults.length as we want to indicate the number of
    // possible search results rather than just the ones shown.
    const totalResults =
      showResultCount(sectionIndex) && section.size && searchResults.length
        ? Math.max(section.size, searchResults.length)
        : undefined;

    const totalNumberOfItemsInPreviousSections = getTotalNumberOfItemsInPreviousSections(
      searchItems.sections,
      sectionIndex,
    );

    return searchResults.length ? (
      <SearchResultSection
        totalResults={totalResults}
        title={generateSectionTitle(title, intl)}
      >
        {searchResults.map((result, index) => {
          return (
            <ProductSearchResult
              key={`item_${result.id}`}
              title={result.title}
              href={addQuery(result.url, 'search_id', searchSessionId)}
              containerDetail={result.meta}
              linkComponent={linkComponent}
              screen={screen}
              icon={
                <Avatar
                  borderColor="transparent"
                  src={result.iconUrl}
                  appearance="square"
                  size="xsmall"
                />
              }
              analyticContext={{
                sectionIndex,
                sectionId: id,
                containerId: result.containerId || null,
                indexWithinSection: index,
                globalIndex: totalNumberOfItemsInPreviousSections + index,
                isCached: false,
                metadata: {
                  contentId: result.id,
                },
              }}
            />
          );
        })}
        {renderSectionViewAll &&
          renderSectionViewAll({ section, linkComponent })}
      </SearchResultSection>
    ) : null;
  };

  return (
    <>
      {searchItems.sections.map((section, index) =>
        renderItemSection(section, index),
      )}
      {children}
    </>
  );
};

export const GenericSearchResult = injectIntl(GenericSearchResultWithIntl);
