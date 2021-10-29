import React from 'react';
import {
  LinkComponent,
  SearchResultSection,
  SearchResultSectionLink,
} from '@atlassian/search-dialog';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
  ConfItemResults,
  ConfPeopleResults,
  ConfSpaceResults,
  withClients,
} from '../../clients';
import {
  ConfItemResult,
  ConfPeopleResult,
  ConfSpaceResult,
} from '../../clients/response-types';
import { messages } from '../../../messages';
import { getAvatarForConfluenceObjectResult } from './confluence-avatar-util';
import { LoadingSpinner } from '../../../common/loading-spinner';
import {
  SearchResultsShownHandler,
  withAnalytics,
} from '../../../common/analytics';
import {
  AdvancedSearchAnalyticsProps,
  onAdvancedSearchSelected,
  onShowAllClicked,
  onShowMoreClicked,
  OnShowMoreClickedProps,
  ScreenType,
} from '../../../common/analytics/events';
import { ResultAvatar as Avatar } from '../../../common/result-avatar';
import { addQuery } from '../../../utils/url-utils';
import { ProductSearchResult } from '../../../common/product-search-result';
import {
  getResultsDetailsAnalyticData,
  firePeopleSearchSelected,
} from '../confluence-search-results-utils';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../../confluence-utils/confluence-url-utils';
import { useSearchSessionId } from '../../../common/search-session-provider';
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
  query: string;
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any;
  showMoreClicked: (props: OnShowMoreClickedProps) => any;
  showAllClicked: (props: OnShowMoreClickedProps) => any;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
  isLoading: boolean;
  screenType: ScreenType;
  isCollapsed: boolean;
  siteUrl?: string;
}

interface ContextProps {
  advancedSearchUrl: string;
  searchSessionId: string;
}

interface State {
  query: string;
  isShowingMore: boolean;
}

// For tests only! Don't use outside this file.
export const INITIAL_POST_QUERY_ITEM_LIMIT = 10; // aka page size
export const POST_QUERY_SPACE_LIMIT = 3;
export const POST_QUERY_PEOPLE_LIMIT = 3;

const getItemResults = (
  isShowingMore: boolean,
  items: ConfItemResults | null,
) => {
  if (!items) {
    return null;
  }

  const itemResults = isShowingMore
    ? (items && items.items) || []
    : (items && items.items.slice(0, INITIAL_POST_QUERY_ITEM_LIMIT)) || [];

  return {
    ...items,
    items: itemResults,
  };
};

class ConfluencePostQueryBase extends React.Component<
  Props & InjectedIntlProps & ContextProps,
  State
> {
  state = {
    isShowingMore: false,
    query: '',
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.query !== state.query) {
      return {
        ...state,
        isShowingMore: false,
        query: props.query,
      };
    }
    return null;
  }

  getTimeDetailForConfluenceObjectResult = (result: ConfItemResult) => {
    const { formatDate, intl } = this.props;

    if (result.isRecentResult) {
      const message = intl.formatMessage(
        messages.common_recently_viewed_section_heading,
      );
      return <span title={message}>{message}</span>;
    }

    if (formatDate && result.lastModified) {
      return formatDate(result.lastModified);
    }

    return undefined;
  };

  onShowMore = () => {
    const { showMoreClicked, items } = this.props;

    const itemResults = getItemResults(false, items.results);

    showMoreClicked({
      total: itemResults?.totalSize ?? 0,
      currentSize: itemResults?.items.length ?? 0,
      pageSize: INITIAL_POST_QUERY_ITEM_LIMIT,
    });

    this.setState({
      isShowingMore: true,
    });
  };

  onShowAll = () => {
    const { showAllClicked, items } = this.props;

    const itemResults = getItemResults(true, items.results);

    showAllClicked({
      total: itemResults?.totalSize ?? 0,
      currentSize: itemResults?.items.length ?? 0,
      pageSize: INITIAL_POST_QUERY_ITEM_LIMIT,
    });
  };

  getShowMoreLink = (
    isShowingMore: boolean,
    totalItemCount: number,
    advancedSearchUrl: string,
  ) => {
    if (totalItemCount <= INITIAL_POST_QUERY_ITEM_LIMIT) {
      return null;
    }

    if (isShowingMore) {
      return (
        <ConfluenceSearchResultSectionLink
          onClick={this.onShowAll}
          linkComponent={this.props.linkComponent}
          href={advancedSearchUrl}
          id="show-all-link"
        >
          <FormattedMessage {...messages.common_show_all_results_link} />
        </ConfluenceSearchResultSectionLink>
      );
    } else {
      return (
        <SearchResultSectionLink
          onClick={this.onShowMore}
          id="show-more-button"
        >
          <FormattedMessage {...messages.common_show_more_results_link} />
        </SearchResultSectionLink>
      );
    }
  };

  renderItemSection = ({
    itemResults,
    totalItemCount,
    sectionIndex,
    totalNumberOfItemsInPreviousSections,
  }: {
    itemResults: ConfItemResult[];
    totalItemCount: number;
    sectionIndex: number;
    // This is the total number of items that were rendered in sections that appear before this
    totalNumberOfItemsInPreviousSections: number;
  }) => {
    const {
      advancedSearchUrl,
      linkComponent,
      searchSessionId,
      screenType,
      isCollapsed,
    } = this.props;
    const { isShowingMore } = this.state;

    return itemResults.length ? (
      <SearchResultSection
        totalResults={totalItemCount}
        title={
          <FormattedMessage
            {...messages.confluence_pages_blogs_attachments_section_heading}
          />
        }
      >
        {itemResults.map((result, index) => {
          return (
            <ProductSearchResult
              key={`item_${result.resultId}`}
              title={result.name}
              href={addQuery(result.href, 'search_id', searchSessionId)}
              icon={getAvatarForConfluenceObjectResult(result, isCollapsed)}
              containerDetail={result.containerName}
              timeDetail={this.getTimeDetailForConfluenceObjectResult(result)}
              linkComponent={linkComponent}
              screen={screenType}
              isCollapsed={isCollapsed}
              analyticContext={{
                sectionIndex,
                sectionId: 'confluence-item',
                containerId: result.containerId,
                globalIndex: totalNumberOfItemsInPreviousSections + index,
                indexWithinSection: index,
                isCached: result.isRecentResult,
                metadata: {
                  contentType: result.contentType,
                  contentId: result.resultId,
                  spaceId: result.containerId, // This can be either spaceKey or spaceId
                  containerId: result.spaceId, // This contains the actual spaceId/containerId for the confluence requests
                },
              }}
            />
          );
        })}
        {this.getShowMoreLink(isShowingMore, totalItemCount, advancedSearchUrl)}
      </SearchResultSection>
    ) : null;
  };

  renderSpaceSection = ({
    spaceResults,
    sectionIndex,
    totalNumberOfItemsInPreviousSections,
  }: {
    spaceResults: ConfSpaceResult[];
    sectionIndex: number;
    // This is the total number of items that were rendered in sections that appear before this
    totalNumberOfItemsInPreviousSections: number;
  }) => {
    const {
      linkComponent,
      searchSessionId,
      screenType,
      isCollapsed,
    } = this.props;

    return spaceResults.length ? (
      <SearchResultSection
        title={
          <FormattedMessage {...messages.confluence_spaces_section_heading} />
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
                size={isCollapsed ? 'small' : 'xsmall'}
              />
            }
            linkComponent={linkComponent}
            screen={screenType}
            isCollapsed={isCollapsed}
            analyticContext={{
              sectionIndex,
              sectionId: 'confluence-space',
              containerId: null,
              globalIndex: totalNumberOfItemsInPreviousSections + index,
              indexWithinSection: index,
              isCached: false,
              metadata: {
                contentType: result.contentType,
                contentId: result.resultId,
                containerId: result.id,
              },
            }}
          />
        ))}
      </SearchResultSection>
    ) : null;
  };

  renderPeopleSection = ({
    peopleResults,
    sectionIndex,
    totalNumberOfItemsInPreviousSections,
  }: {
    peopleResults: ConfPeopleResult[];
    sectionIndex: number;
    // This is the total number of items that were rendered in sections that appear before this
    totalNumberOfItemsInPreviousSections: number;
  }) => {
    const {
      query,
      linkComponent,
      searchSessionId,
      screenType,
      isCollapsed,
      advancedSearchSelected,
      people,
      isLoading,
      siteUrl = '',
    } = this.props;

    if (!isLoading && people.isLoading) {
      return <LoadingSpinner />;
    }

    return peopleResults.length ? (
      <SearchResultSection
        title={
          <FormattedMessage {...messages.confluence_people_section_heading} />
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
                size={isCollapsed ? 'small' : 'xsmall'}
              />
            }
            containerDetail={result.mentionName ? `@${result.mentionName}` : ''}
            linkComponent={linkComponent}
            screen={screenType}
            isCollapsed={isCollapsed}
            analyticContext={{
              sectionIndex,
              sectionId: 'confluence-people',
              containerId: null,
              globalIndex: totalNumberOfItemsInPreviousSections + index,
              indexWithinSection: index,
              isCached: false,
            }}
          />
        ))}
        <ConfluenceSearchResultSectionLink
          linkComponent={linkComponent}
          href={`${siteUrl}/wiki/people?q=${encodeURIComponent(query)}`}
          id="people-search-link"
        >
          <span
            role="none"
            onClick={(e) => firePeopleSearchSelected(e, advancedSearchSelected)}
          >
            <FormattedMessage {...messages.common_search_people_link} />
          </span>
        </ConfluenceSearchResultSectionLink>
      </SearchResultSection>
    ) : null;
  };

  render() {
    const { items, people, spaces, isLoading } = this.props;
    const { isShowingMore } = this.state;

    const itemResults =
      getItemResults(isShowingMore, items.results)?.items ?? [];
    const totalItemCount = items.results?.totalSize || 0;

    let currentSectionIndex = 0;
    let totalNumberOfItemsInPreviousSections = 0;

    const itemSection = this.renderItemSection({
      itemResults,
      totalItemCount,
      sectionIndex: currentSectionIndex,
      totalNumberOfItemsInPreviousSections,
    });

    currentSectionIndex = itemSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += itemResults.length;

    const spaceResults =
      spaces.results?.items.slice(0, POST_QUERY_SPACE_LIMIT) || [];
    const spaceSection = this.renderSpaceSection({
      spaceResults,
      sectionIndex: currentSectionIndex,
      totalNumberOfItemsInPreviousSections,
    });

    currentSectionIndex = spaceSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += spaceResults.length;

    const peopleResults =
      people.results?.items.slice(0, POST_QUERY_PEOPLE_LIMIT) || [];
    const peopleSection = this.renderPeopleSection({
      peopleResults,
      sectionIndex: currentSectionIndex,
      totalNumberOfItemsInPreviousSections,
    });

    currentSectionIndex = peopleSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += peopleResults.length;

    return (
      <span data-test-id="search-dialog-confluence-post-query">
        {itemSection}
        {spaceSection}
        {peopleSection}
        <SearchResultsShownHandler
          isPreQuery={false}
          isLoading={isLoading}
          resultCount={totalNumberOfItemsInPreviousSections}
          sectionCount={currentSectionIndex}
          results={getResultsDetailsAnalyticData(
            itemResults,
            spaceResults,
            peopleResults,
            false,
          )}
        />
      </span>
    );
  }
}

export const ConfluencePostQuery = injectIntl(
  (props: Props & InjectedIntlProps) => {
    const searchSessionId = useSearchSessionId();
    const confluenceUrlFactory = usePrimarySiteConfluenceAdvancedSearchUrlFactory();

    return (
      <ConfluencePostQueryBase
        {...props}
        searchSessionId={searchSessionId}
        advancedSearchUrl={confluenceUrlFactory(props.query)}
      />
    );
  },
);

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
  showMoreClicked: onShowMoreClicked,
  showAllClicked: onShowAllClicked,
})(withClients(ConfluencePostQuery));
