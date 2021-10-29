import { LinkComponent, SearchResultSection } from '@atlassian/search-dialog';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ConfItemResults,
  ConfPeopleResults,
  ConfSpaceResults,
  withClients,
} from '../../clients';
import {
  withAnalytics,
  SearchResultsShownHandler,
} from '../../../common/analytics';
import {
  onAdvancedSearchSelected,
  AdvancedSearchAnalyticsProps,
} from '../../../common/analytics/events';
import { messages } from '../../../messages';
import { ResultAvatar as Avatar } from '../../../common/result-avatar';
import { injectSearchSession } from '../../../common/search-session-provider';
import { addQuery } from '../../../utils/url-utils';
import { ProductSearchResult } from '../../../common/product-search-result';
import { LoadingSpinner } from '../../../common/loading-spinner';
import {
  getResultsDetailsAnalyticData,
  getAvatarForConfluenceObjectResult,
  firePeopleSearchSelected,
} from '../confluence-search-results-utils';
import ConfluenceSearchResultSectionLink from '../confluence-search-result-section-link';

interface Props {
  items: {
    isLoading: boolean;
    results: ConfItemResults | null;
  };
  spaces: {
    isLoading: boolean;
    results: ConfSpaceResults | null;
  };
  people: {
    isLoading: boolean;
    results: ConfPeopleResults | null;
  };
  searchSessionId: string;
  siteUrl?: string;
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
  isLoading: boolean;
  isCollapsed?: boolean;
}

const PRE_QUERY_ITEM_LIMIT = 10;
const PRE_QUERY_SPACE_LIMIT = 3;
const PRE_QUERY_PEOPLE_LIMIT = 3;

// We disable prefer-stateless-function until confluence-post-query is also a function component. Easier to compare the 2 this way.
// eslint-disable-next-line react/prefer-stateless-function
export class ConfluencePreQuery extends React.Component<Props> {
  render() {
    const {
      items,
      spaces,
      people,
      linkComponent,
      formatDate,
      searchSessionId,
      isLoading,
      advancedSearchSelected,
      isCollapsed,
      siteUrl = '',
    } = this.props;

    let currentSectionIndex = 0;
    let totalNumberOfItemsInPreviousSections = 0;
    const avatarSize = isCollapsed ? 'small' : 'xsmall';

    const itemResults =
      items.results?.items.slice(0, PRE_QUERY_ITEM_LIMIT) || [];
    const itemSection = itemResults.length ? (
      <SearchResultSection
        title={
          <FormattedMessage
            {...messages.common_recently_viewed_section_heading}
          />
        }
      >
        {itemResults.map((result, index) => (
          <ProductSearchResult
            key={`item_${result.resultId}`}
            title={result.name}
            href={addQuery(result.href, 'search_id', searchSessionId)}
            icon={getAvatarForConfluenceObjectResult(
              result.contentType,
              result.name,
              isCollapsed,
            )}
            containerDetail={result.containerName}
            timeDetail={
              formatDate && result.lastModified
                ? formatDate(result.lastModified)
                : undefined
            }
            linkComponent={linkComponent}
            screen="preQuerySearchResults"
            isCollapsed={isCollapsed}
            analyticContext={{
              sectionIndex: currentSectionIndex,
              sectionId: 'confluence-item',
              containerId: result.containerId,
              globalIndex: totalNumberOfItemsInPreviousSections + index,
              indexWithinSection: index,
              isCached: result.isRecentResult,
            }}
          />
        ))}
      </SearchResultSection>
    ) : null;

    currentSectionIndex = itemSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += itemResults.length;

    const spaceResults =
      spaces.results?.items.slice(0, PRE_QUERY_SPACE_LIMIT) || [];
    const spaceSection = spaceResults.length ? (
      <SearchResultSection
        title={
          <FormattedMessage
            {...messages.common_recently_spaces_section_heading}
          />
        }
      >
        {spaceResults.map((result, index) => (
          <ProductSearchResult
            key={`spaces_${result.resultId}`}
            title={result.name}
            href={addQuery(result.href, 'search_id', searchSessionId)}
            icon={
              <Avatar
                borderColor="transparent"
                src={result.avatarUrl}
                appearance="square"
                size={avatarSize}
              />
            }
            linkComponent={linkComponent}
            screen="preQuerySearchResults"
            analyticContext={{
              sectionIndex: currentSectionIndex,
              sectionId: 'confluence-space',
              containerId: null,
              globalIndex: totalNumberOfItemsInPreviousSections + index,
              indexWithinSection: index,
              isCached: true,
            }}
          />
        ))}
      </SearchResultSection>
    ) : null;

    currentSectionIndex = spaceSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += spaceResults.length;

    const peopleResults =
      people.results?.items.slice(0, PRE_QUERY_PEOPLE_LIMIT) || [];
    let peopleSection: JSX.Element | null = null;

    if (!isLoading && people.isLoading) {
      peopleSection = <LoadingSpinner />;
    } else {
      if (peopleResults.length > 0) {
        peopleSection = (
          <SearchResultSection
            title={
              <FormattedMessage
                {...messages.common_recently_worked_with_section_heading}
              />
            }
          >
            {peopleResults.map((result, index) => (
              <ProductSearchResult
                key={`people_${result.resultId}`}
                title={result.name}
                href={addQuery(result.href, 'search_id', searchSessionId)}
                icon={
                  <Avatar
                    borderColor="transparent"
                    src={result.avatarUrl}
                    appearance="circle"
                    size={avatarSize}
                  />
                }
                containerDetail={
                  result.mentionName ? `@${result.mentionName}` : ''
                }
                linkComponent={linkComponent}
                screen="preQuerySearchResults"
                analyticContext={{
                  sectionIndex: currentSectionIndex,
                  sectionId: 'confluence-people',
                  containerId: null,
                  globalIndex: totalNumberOfItemsInPreviousSections + index,
                  indexWithinSection: index,
                  isCached: true,
                }}
              />
            ))}
            <ConfluenceSearchResultSectionLink
              linkComponent={linkComponent}
              href={`${siteUrl}/wiki/people`}
              id="people-search-link"
            >
              <span
                role="none"
                onClick={(e) =>
                  firePeopleSearchSelected(e, advancedSearchSelected)
                }
              >
                <FormattedMessage {...messages.common_search_people_link} />
              </span>
            </ConfluenceSearchResultSectionLink>
          </SearchResultSection>
        );
      }
    }

    currentSectionIndex = peopleSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += peopleResults.length;

    return (
      <span data-test-id="search-dialog-confluence-pre-query">
        {itemSection}
        {spaceSection}
        {peopleSection}
        <SearchResultsShownHandler
          isPreQuery
          isLoading={isLoading}
          resultCount={totalNumberOfItemsInPreviousSections}
          sectionCount={currentSectionIndex}
          results={getResultsDetailsAnalyticData(
            itemResults,
            spaceResults,
            peopleResults,
            true,
          )}
        />
      </span>
    );
  }
}

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
})(withClients(injectSearchSession(ConfluencePreQuery)));
