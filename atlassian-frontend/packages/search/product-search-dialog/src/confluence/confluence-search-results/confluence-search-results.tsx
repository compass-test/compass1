import React from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import {
  ConfItemResults,
  ConfSpaceResults,
  ConfPeopleResults,
} from '../clients/response-types';
import { ConfluencePreQuery } from './pre-query';
import { ConfluencePostQuery } from './post-query';
import { LoadingSpinner } from '../../common/loading-spinner';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../confluence-utils/confluence-url-utils';
import NoResults from './confluence-search-no-results';
import { NoPreQueryResults } from '../../common/no-results';

interface Props {
  query: string;
  isPreQuery: boolean;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
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
  isBelowTakeoverWidth: boolean;
  showFilters?: boolean;
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
  const { items, spaces, isPreQuery } = props;
  const isLoading = items.isLoading || spaces.isLoading;
  if (isLoading) {
    return isPreQuery
      ? ResultState.PreQueryLoading
      : ResultState.PostQueryLoading;
  } else {
    return isPreQuery
      ? ResultState.PreQueryResults
      : ResultState.PostQueryResults;
  }
};

export class SearchResults extends React.Component<Props & ContextProps> {
  static getFetchedResultsCount(props: Props) {
    const { items, spaces, people } = props;

    const itemLength = (items.results && items.results.items.length) || 0;
    const spacesLength = (spaces.results && spaces.results.items.length) || 0;
    const peopleLength = (people.results && people.results.items.length) || 0;

    return {
      itemLength,
      spacesLength,
      peopleLength,
      totalCount: itemLength + spacesLength + peopleLength,
    };
  }

  static hasResults(props: Props) {
    return SearchResults.getFetchedResultsCount(props).totalCount > 0;
  }

  render() {
    const {
      query,
      items,
      spaces,
      people,
      linkComponent,
      formatDate,
      isBelowTakeoverWidth,
      showFilters = false,
      advancedSearchUrl,
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
                items={items}
                spaces={spaces}
                people={people}
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
        results = hasResults ? (
          <ConfluencePreQuery
            items={items}
            spaces={spaces}
            people={people}
            linkComponent={linkComponent}
            isLoading={false}
            isCollapsed={isBelowTakeoverWidth}
          />
        ) : (
          <NoPreQueryResults />
        );

        break;
      }
      case ResultState.PostQueryResults: {
        results = (
          <>
            {hasResults ? (
              <ConfluencePostQuery
                query={query}
                items={items}
                spaces={spaces}
                people={people}
                linkComponent={linkComponent}
                isLoading={false}
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
