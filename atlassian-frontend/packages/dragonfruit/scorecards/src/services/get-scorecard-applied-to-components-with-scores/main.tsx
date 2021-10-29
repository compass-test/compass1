import {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
} from '@apollo/client';

import {
  GetScorecardAppliedToComponentsWithScoresQuery,
  GetScorecardAppliedToComponentsWithScoresQueryResult,
  GetScorecardAppliedToComponentsWithScoresQueryVariables,
  useGetScorecardAppliedToComponentsWithScoresQuery,
} from '@atlassian/dragonfruit-graphql';
const useGetScorecardAppliedToComponentsWithScores = (
  scorecardId: string,
  first?: number,
  after?: string,
) => {
  let fetchMoreCallback: (
    fetchMoreOptions: FetchMoreQueryOptions<
      GetScorecardAppliedToComponentsWithScoresQueryVariables,
      'scorecardId' | 'first' | 'after'
    > &
      FetchMoreOptions<
        GetScorecardAppliedToComponentsWithScoresQuery,
        GetScorecardAppliedToComponentsWithScoresQueryVariables
      >,
  ) => Promise<
    ApolloQueryResult<GetScorecardAppliedToComponentsWithScoresQueryResult>
  >;

  const {
    data,
    loading,
    error,
    networkStatus,
    fetchMore,
  } = useGetScorecardAppliedToComponentsWithScoresQuery({
    variables: { scorecardId, after, first },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    /**
     * Setting `nextFetchPolicy: cache-first` prevents Apollo from making unwanted network requests when
     * the cache for this query is updated (e.g. optimistic response for service relationships).
     * Reference: https://github.com/apollographql/apollo-client/issues/6760#issuecomment-668188727
     */
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
  fetchMoreCallback = fetchMore;

  return {
    data,
    loading,
    error,
    networkStatus,
    fetchMore: fetchMoreCallback,
  };
};

export default useGetScorecardAppliedToComponentsWithScores;
