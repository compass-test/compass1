import React from 'react';
import debounce from 'lodash/debounce';
import { withAnalytics } from '../with-analytics';
import { useProducts, useActiveProduct, Products } from '../../product-context';
import { useSessionUserInput } from '../../../extensible/user-input-provider';
import {
  onSearchResultsShown,
  ResultsShownActionSubjectId,
  ResultsShownAnalyticsProps,
  ResultSectionAnalyticData,
} from '../events';

/**
 * We have a debounce timer here as we want to only log screen shown events when the user has had enough time to actually look at them.
 * There is no statistical reason why this is number is what it is, it's just an arbitrary number that we felt was right.
 */
const DEBOUNCE_TIME = 250;

interface Props {
  isPreQuery: boolean;
  isLoading: boolean;
  resultCount: number;
  sectionCount: number;
  results: ResultSectionAnalyticData[];
}

interface AnalyticsProps {
  searchResultsShown: (props: ResultsShownAnalyticsProps) => any;
}

interface ContextProps {
  activeProduct: Products;
  isMultiProduct: boolean;
  isSticky: boolean;
  isStickyUpdated: boolean;
}

export enum ResultState {
  PreQueryLoading,
  PostQueryLoading,
  PreQueryResults,
  PostQueryResults,
}

export const getCurrentState = (props: Props) => {
  const { isLoading, isPreQuery } = props;
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

export class SearchResultsShownHandlerBase extends React.Component<
  Props & ContextProps & AnalyticsProps
> {
  private lastQueryTime: number = Date.now();

  onSearchResultsShown = debounce(
    (
      actionSubjectId,
      resultCount,
      sectionCount,
      results,
      timeToQueryMs,
      activeProduct,
      isMultiProduct,
      isSticky,
      isStickyUpdated,
    ) =>
      onSearchResultsShown({
        actionSubjectId,
        resultCount,
        sectionCount,
        results,
        timeToQueryMs,
        activeProduct,
        isMultiProduct,
        isSticky,
        isStickyUpdated,
      }),
    DEBOUNCE_TIME,
  );

  componentDidMount() {
    this.fireAnalyticsForState();
  }

  componentDidUpdate(prevProps: Props) {
    if (getCurrentState(this.props) !== getCurrentState(prevProps)) {
      this.fireAnalyticsForState();
    }
  }

  componentWillUnmount() {
    this.onSearchResultsShown.cancel();
  }

  fireAnalyticsForState = debounce(() => {
    const currentState = getCurrentState(this.props);
    const {
      resultCount,
      sectionCount,
      searchResultsShown,
      isLoading,
      results,
      activeProduct,
      isMultiProduct,
      isSticky,
      isStickyUpdated,
    } = this.props;

    const oldLastQueryTime = this.lastQueryTime;
    const timeToQueryMs = oldLastQueryTime
      ? Date.now() - oldLastQueryTime
      : undefined;

    if (!isLoading) {
      this.lastQueryTime = Date.now();
    }

    switch (currentState) {
      case ResultState.PreQueryLoading: {
        break;
      }
      case ResultState.PostQueryLoading: {
        searchResultsShown({
          actionSubjectId: ResultsShownActionSubjectId.CACHED,
          resultCount,
          sectionCount,
          results,
          activeProduct,
          isMultiProduct,
          isSticky,
          isStickyUpdated,
        });
        break;
      }
      case ResultState.PreQueryResults: {
        searchResultsShown({
          actionSubjectId: ResultsShownActionSubjectId.PREQUERY,
          resultCount,
          sectionCount,
          results,
          timeToQueryMs,
          activeProduct,
          isMultiProduct,
          isSticky,
          isStickyUpdated,
        });
        break;
      }
      case ResultState.PostQueryResults: {
        searchResultsShown({
          actionSubjectId: ResultsShownActionSubjectId.POSTQUERY,
          resultCount,
          sectionCount,
          results,
          timeToQueryMs,
          activeProduct,
          isMultiProduct,
          isSticky,
          isStickyUpdated,
        });
        break;
      }
      default: {
        const error: never = currentState;
        throw new Error(error);
      }
    }
  }, DEBOUNCE_TIME);

  render() {
    return null;
  }
}

const SearchResultsShownHandler = (props: Props & AnalyticsProps) => {
  const activeProduct = useActiveProduct();
  const isMultiProduct = useProducts().length > 1;
  const { stickySearchEnabled, isStickyUpdated } = useSessionUserInput();
  return (
    <SearchResultsShownHandlerBase
      {...props}
      activeProduct={activeProduct}
      isMultiProduct={isMultiProduct}
      isSticky={stickySearchEnabled}
      isStickyUpdated={isStickyUpdated}
    />
  );
};

export default withAnalytics({ searchResultsShown: onSearchResultsShown })(
  SearchResultsShownHandler,
);
