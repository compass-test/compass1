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
import { ConfItemResult } from '../../clients/response-types';
import { messages } from '../../../messages';
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
import { getResultsDetailsAnalyticData } from '../confluence-search-results-utils';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../../confluence-utils/confluence-url-utils';
import { useSearchSessionId } from '../../../common/search-session-provider';
import {
  CompassComponentType,
  CompassSearchComponentNodeFragment,
} from '@atlassian/dragonfruit-graphql';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { TeamDetails } from '@atlassian/dragonfruit-rest';
import { User } from '@atlaskit/user-picker';
import {
  getTeamOrUserAvatar,
  getTeamOrUserDisplayName,
  getTeamOrUserURL,
} from '../utils';

interface Props {
  services: {
    isLoading: boolean;
    cursor: string | null;
    results: CompassSearchComponentNodeFragment[] | null;
  };
  libsAppsMore: {
    isLoading: boolean;
    cursor: string | null;
    results: CompassSearchComponentNodeFragment[] | null;
  };
  peopleTeams: {
    isLoading: boolean;
    results: (TeamDetails | User)[] | null;
  };
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
  fetchMoreFn: (typeResult: string, cursor: string | null) => void;
  teamNames: { [key: string]: TeamDetails | null };
}

interface ContextProps {
  advancedSearchUrl: string;
  searchSessionId: string;
}

enum TypeResults {
  SERVICES = 'SERVICES',
  LIBS_APPS_MORE = 'LIBS_APPS_MORE',
}

interface State {
  query: string;
  isShowingMore: boolean;
  serviceShowIndex: number;
  libsAppsMoreShowIndex: number;
  typeResult: string;
}

// For tests only! Don't use outside this file.
export const POST_QUERY_SPACE_LIMIT = 3;
export const POST_QUERY_PEOPLE_LIMIT = 3;

// const getItemResults = (
//   isShowingMore: boolean,
//   items: ConfItemResults | null,
// ) => {
//   if (!items) {
//     return null;
//   }

//   const itemResults = isShowingMore
//     ? (items && items.items) || []
//     : (items && items.items.slice(0, INITIAL_POST_QUERY_ITEM_LIMIT)) || [];

//   return {
//     ...items,
//     items: itemResults,
//   };
// };

class ConfluencePostQueryBase extends React.Component<
  Props & InjectedIntlProps & ContextProps,
  State
> {
  state = {
    isShowingMore: false,
    query: '',
    serviceShowIndex: 0,
    libsAppsMoreShowIndex: 0,
    typeResult: TypeResults.SERVICES,
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
  // NOTE: may need these for the advancedSearchPage
  // onShowMore = () => {
  //   const { showMoreClicked, items } = this.props;

  //   const itemResults = getItemResults(false, items.results);

  //   showMoreClicked({
  //     total: itemResults?.totalSize ?? 0,
  //     currentSize: itemResults?.items.length ?? 0,
  //     pageSize: INITIAL_POST_QUERY_ITEM_LIMIT,
  //   });

  //   this.setState({
  //     isShowingMore: true,
  //   });
  // };

  onShowMoreServices = () => {
    this.props.fetchMoreFn(TypeResults.SERVICES, this.props.services.cursor);
    // this.setState({
    //   serviceShowIndex: this.state.serviceShowIndex + 1,
    // });
  };

  onShowMoreLibsAppsMore = () => {
    this.props.fetchMoreFn(
      TypeResults.LIBS_APPS_MORE,
      this.props.libsAppsMore.cursor,
    );
    // this.setState({
    //   libsAppsMoreShowIndex: this.state.libsAppsMoreShowIndex + 1,
    //   type: TypeResults.LIBS_APPS_MORE
    // });
  };

  // NOTE: may need these for the advancedSearchPage
  // onShowAll = () => {
  //   const { showAllClicked, items } = this.props;

  //   const itemResults = getItemResults(true, items.results);

  //   showAllClicked({
  //     total: itemResults?.totalSize ?? 0,
  //     currentSize: itemResults?.items.length ?? 0,
  //     pageSize: INITIAL_POST_QUERY_ITEM_LIMIT,
  //   });
  // };

  getShowMoreLink = (
    // index: number,
    // limit: number,
    // totalItemCount: number,
    // advancedSearchUrl: string,
    fn: () => void,
    cursor: string | null,
  ) => {
    if (!cursor) {
      return null;
    } else {
      return (
        <SearchResultSectionLink onClick={fn} id="show-more-button">
          <FormattedMessage {...messages.common_show_more_results_link} />
        </SearchResultSectionLink>
      );
    }
    // NOTE: may need these for the advancedSearchPage
    // TODO if hasNextPage and endCursor -> showmore
    // console.log((index + 1) * INITIAL_POST_QUERY_ITEM_LIMIT, totalItemCount, limit)
    // cases when we don't show a show more button
    // if ((index + 1) * INITIAL_POST_QUERY_ITEM_LIMIT >= totalItemCount) {
    //   return null;
    // }

    // if ((index + 1) * INITIAL_POST_QUERY_ITEM_LIMIT > limit) {
    //   return (
    //     <ConfluenceSearchResultSectionLink
    //       onClick={this.onShowAll}
    //       linkComponent={this.props.linkComponent}
    //       href={advancedSearchUrl}
    //       id="show-all-link"
    //     >
    //       <FormattedMessage {...messages.common_show_all_results_link} />
    //     </ConfluenceSearchResultSectionLink>
    //   );
    // } else {
    //   return (
    //     <SearchResultSectionLink onClick={fn} id="show-more-button">
    //       <FormattedMessage {...messages.common_show_more_results_link} />
    //     </SearchResultSectionLink>
    //   );
    // }
  };

  getProductSearchResults = (
    components: CompassSearchComponentNodeFragment[],
    searchSessionId: string,
    screenType: ScreenType,
    isCollapsed: boolean,
    sectionIndex: number,
    totalNumberOfComponentsInPreviousSections: number,
    linkComponent?: LinkComponent,
  ) => {
    const { teamNames } = this.props;
    return components.map((result, index) => {
      const ownerId = result.component?.ownerId;
      return (
        <ProductSearchResult
          key={`item_${result.link}`}
          title={result.component?.name ?? 'error'}
          href={addQuery(result.link, 'search_id', searchSessionId)}
          icon={
            <ComponentTypeIcon
              label={result.component?.name}
              type={result.component?.type || CompassComponentType.OTHER}
            />
          }
          containerDetail={result.component?.description || undefined}
          owner={
            teamNames && ownerId && teamNames[ownerId]
              ? teamNames[ownerId]!.displayName
              : undefined
          }
          timeDetail={undefined}
          linkComponent={linkComponent}
          screen={screenType}
          isCollapsed={isCollapsed}
          analyticContext={{
            id: result.component?.id,
            sectionIndex,
            sectionId: `compass-${
              result.component?.type.toLowerCase() ||
              CompassComponentType.OTHER.toLowerCase()
            }` as any,
            containerId: 'none',
            globalIndex: totalNumberOfComponentsInPreviousSections + index,
            indexWithinSection: index,
            isCached: false,
          }}
        />
      );
    });
  };

  renderResultsSection = ({
    results,
    totalResultsCount,
    sectionIndex,
    totalNumberOfResultsInPreviousSections,
    message,
    showMoreIndex,
    showMoreFunc,
    cursor,
  }: {
    results: CompassSearchComponentNodeFragment[];
    totalResultsCount: number;
    sectionIndex: number;
    // This is the total number of items that were rendered in sections that appear before this
    totalNumberOfResultsInPreviousSections: number;
    message: { id: string; defaultMessage: string; description: string };
    showMoreIndex: number;
    showMoreFunc: () => void;
    cursor: string | null;
  }) => {
    const {
      // advancedSearchUrl,
      linkComponent,
      searchSessionId,
      screenType,
      isCollapsed,
    } = this.props;

    return results.length ? (
      <SearchResultSection
        // totalResults={totalResultsCount}
        title={<FormattedMessage {...message} />}
      >
        {this.getProductSearchResults(
          results,
          searchSessionId,
          screenType,
          isCollapsed,
          sectionIndex,
          totalNumberOfResultsInPreviousSections,
          linkComponent,
        )}
        {this.getShowMoreLink(
          // showMoreIndex,
          // 100,
          // totalResultsCount,
          // advancedSearchUrl,
          showMoreFunc,
          cursor,
        )}
      </SearchResultSection>
    ) : null;
  };

  renderPeopleSection = ({
    peopleResults,
    sectionIndex,
    totalNumberOfItemsInPreviousSections,
  }: {
    peopleResults: (TeamDetails | User)[];
    sectionIndex: number;
    // This is the total number of items that were rendered in sections that appear before this
    totalNumberOfItemsInPreviousSections: number;
  }) => {
    const {
      linkComponent,
      searchSessionId,
      screenType,
      isCollapsed,
      isLoading,
    } = this.props;

    if (isLoading) {
      return null;
    }

    return peopleResults.length ? (
      <SearchResultSection
        title={
          <FormattedMessage
            {...messages.compass_teams_and_people_section_heading}
          />
        }
      >
        {peopleResults.map((result, index) => (
          <ProductSearchResult
            key={`people_${result.id}`}
            title={getTeamOrUserDisplayName(result)}
            href={addQuery(
              getTeamOrUserURL(result),
              'search_id',
              searchSessionId,
            )}
            icon={
              <Avatar
                borderColor="transparent"
                src={getTeamOrUserAvatar(result)}
                appearance="circle"
                size={isCollapsed ? 'small' : 'xsmall'}
              />
            }
            linkComponent={linkComponent}
            screen={screenType}
            isCollapsed={isCollapsed}
            analyticContext={{
              id: result.id,
              sectionIndex,
              sectionId: `compass-${
                (result as any).type ? 'user' : 'team'
              }` as any,
              containerId: null,
              globalIndex: totalNumberOfItemsInPreviousSections + index,
              indexWithinSection: index,
              isCached: false,
            }}
          />
        ))}
      </SearchResultSection>
    ) : null;
  };

  render() {
    const { services, libsAppsMore, peopleTeams, isLoading } = this.props;

    const serviceResults = services.results ?? [];
    const totalServiceCount = services.results?.length || 0;

    let currentSectionIndex = 0;
    let totalNumberOfItemsInPreviousSections = 0;

    const serviceSection = this.renderResultsSection({
      results: serviceResults,
      totalResultsCount: totalServiceCount,
      sectionIndex: currentSectionIndex,
      totalNumberOfResultsInPreviousSections: totalNumberOfItemsInPreviousSections,
      message: messages.compass_services_section_heading,
      showMoreIndex: this.state.serviceShowIndex,
      showMoreFunc: this.onShowMoreServices,
      cursor: services.cursor,
    });

    currentSectionIndex = serviceSection
      ? currentSectionIndex + 1
      : currentSectionIndex;
    totalNumberOfItemsInPreviousSections += totalServiceCount;

    const libsAppsMoreResults = libsAppsMore.results ?? [];
    const totalLibsAppsMoreCount = libsAppsMore.results?.length || 0;

    const libsAppsMoreSection = this.renderResultsSection({
      results: libsAppsMoreResults,
      totalResultsCount: totalLibsAppsMoreCount,
      sectionIndex: currentSectionIndex,
      totalNumberOfResultsInPreviousSections: totalNumberOfItemsInPreviousSections,
      message: messages.compass_libraries_applications_more_section_heading,
      showMoreIndex: this.state.libsAppsMoreShowIndex,
      showMoreFunc: this.onShowMoreLibsAppsMore,
      cursor: libsAppsMore.cursor,
    });

    const peopleTeamsSection = this.renderPeopleSection({
      peopleResults: peopleTeams.results || [],
      sectionIndex: currentSectionIndex,
      totalNumberOfItemsInPreviousSections,
    });

    return (
      <span data-test-id="search-dialog-compass-post-query">
        <div
          data-test-id={'search-result-section-services'}
          className={'search-result-section'}
        >
          {serviceSection}
        </div>
        <div
          data-test-id={'search-result-section-appsnlibs'}
          className={'search-result-section'}
        >
          {libsAppsMoreSection}
        </div>
        <div
          data-test-id={'search-result-section-teams'}
          className={'search-result-section'}
        >
          {peopleTeamsSection}
        </div>
        <SearchResultsShownHandler
          isPreQuery={false}
          isLoading={isLoading}
          resultCount={totalNumberOfItemsInPreviousSections}
          sectionCount={currentSectionIndex}
          results={getResultsDetailsAnalyticData([], [], false)}
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
