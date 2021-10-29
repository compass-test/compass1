import React from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import { ConfPeopleResults } from '../clients/response-types';
import { ConfluencePreQuery } from './pre-query';
import { ConfluencePostQuery } from './post-query';
import { LoadingSpinner } from '../../common/loading-spinner';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../confluence-utils/confluence-url-utils';
import NoResults from './confluence-search-no-results';
import { CompassSearchComponentNodeFragment } from '@atlassian/dragonfruit-graphql';
import { TeamDetails } from '@atlassian/dragonfruit-rest';
import { User } from '@atlaskit/user-picker';
import {
  RecentComponentsState,
  RecentTeamsState,
} from '@atlassian/compass-search-cache';

interface Props {
  query: string;
  isPreQuery: boolean;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
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
  people: {
    isLoading: boolean;
    results: ConfPeopleResults | null;
  };
  isBelowTakeoverWidth: boolean;
  showFilters?: boolean;
  fetchMoreFn: (typeResult: string, cursor: string | null) => void;
  teamNames: { [key: string]: TeamDetails | null };
  recentlyViewedComponents: RecentComponentsState;
  recentlyViewedTeams: RecentTeamsState;
}

interface ContextProps {
  advancedSearchUrl: string;
}

export enum ResultState {
  PreQueryLoading,
  PostQueryLoading,

  PreQueryResults,
  PostQueryResults,
}

export const getCurrentState = (props: Props) => {
  const {
    services,
    libsAppsMore,
    peopleTeams,
    isPreQuery,
    recentlyViewedComponents,
  } = props;
  const isLoading =
    services.isLoading || libsAppsMore.isLoading || peopleTeams.isLoading;

  if (isPreQuery) {
    return recentlyViewedComponents.loading
      ? ResultState.PreQueryLoading
      : ResultState.PreQueryResults;
  }

  return isLoading
    ? ResultState.PostQueryLoading
    : ResultState.PostQueryResults;
};

export class SearchResults extends React.Component<Props & ContextProps> {
  static getFetchedResultsCount(props: Props) {
    const { services, libsAppsMore, peopleTeams } = props;

    const serviceLength = (services.results && services.results.length) || 0;
    const libsAppsMoreLength =
      (libsAppsMore.results && libsAppsMore.results.length) || 0;
    const peopleTeamsLength =
      (peopleTeams.results && peopleTeams.results.length) || 0;

    return {
      serviceLength,
      libsAppsMoreLength,
      peopleTeamsLength,
      totalCount: serviceLength + libsAppsMoreLength + peopleTeamsLength,
    };
  }

  static hasResults(props: Props) {
    return SearchResults.getFetchedResultsCount(props).totalCount > 0;
  }

  render() {
    const {
      query,
      services,
      libsAppsMore,
      peopleTeams,
      people,
      linkComponent,
      formatDate,
      isBelowTakeoverWidth,
      showFilters = false,
      advancedSearchUrl,
      fetchMoreFn,
      teamNames,
      recentlyViewedComponents,
      recentlyViewedTeams,
    } = this.props;
    const currentState = getCurrentState(this.props);
    const hasResults = SearchResults.hasResults(this.props);
    let results;

    switch (currentState) {
      case ResultState.PreQueryLoading: {
        results = <LoadingSpinner />;
        break;
      }
      case ResultState.PostQueryLoading: {
        results = (
          <>
            {hasResults ? (
              <ConfluencePostQuery
                query={query}
                services={services}
                libsAppsMore={libsAppsMore}
                peopleTeams={peopleTeams}
                // TODO: remove these
                items={{ isLoading: false, results: null }}
                spaces={{ isLoading: false, results: null }}
                people={people}
                fetchMoreFn={fetchMoreFn}
                teamNames={teamNames}
                linkComponent={linkComponent}
                formatDate={formatDate}
                isLoading
                screenType="cachedResults"
                isCollapsed={isBelowTakeoverWidth || showFilters}
              />
            ) : null}
            <LoadingSpinner />
          </>
        );
        break;
      }
      case ResultState.PreQueryResults: {
        results = (
          <>
            <ConfluencePreQuery
              components={recentlyViewedComponents.components}
              teams={recentlyViewedTeams.teams}
              linkComponent={linkComponent}
              isLoading={false}
              isCollapsed={isBelowTakeoverWidth}
              screenType={'cachedResults'}
            />
          </>
        );
        break;
      }
      case ResultState.PostQueryResults: {
        results = (
          <>
            {hasResults ? (
              <ConfluencePostQuery
                query={query}
                services={services}
                libsAppsMore={libsAppsMore}
                peopleTeams={peopleTeams}
                items={{ isLoading: false, results: null }}
                spaces={{ isLoading: false, results: null }}
                people={people}
                fetchMoreFn={fetchMoreFn}
                teamNames={teamNames}
                linkComponent={linkComponent}
                isLoading={
                  services.isLoading ||
                  libsAppsMore.isLoading ||
                  peopleTeams.isLoading
                }
                formatDate={formatDate}
                screenType="postQuerySearchResults"
                isCollapsed={isBelowTakeoverWidth || showFilters}
              />
            ) : (
              <NoResults
                linkComponent={linkComponent}
                advancedSearchUrl={advancedSearchUrl}
              />
            )}
          </>
        );
        break;
      }
      default: {
        // This is to ensure the switch is exhaustive
        const error: never = currentState;
        throw new Error(error);
      }
    }
    return results;
  }
}

export default (props: Props) => {
  const advancedSearchUrl = usePrimarySiteConfluenceAdvancedSearchUrlFactory()(
    props.query,
  );
  return <SearchResults {...props} advancedSearchUrl={advancedSearchUrl} />;
};
