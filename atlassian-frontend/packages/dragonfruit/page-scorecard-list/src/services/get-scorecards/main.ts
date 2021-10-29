import { ApolloQueryResult } from '@apollo/client';

import {
  GetScorecardsQuery,
  useGetScorecardsQuery,
} from '@atlassian/dragonfruit-graphql';

const useGetScorecards = (cloudId: string) => {
  let refetchCallback: (variables?: {
    cloudId: string;
  }) => Promise<ApolloQueryResult<GetScorecardsQuery>>;

  const { data, loading, error, refetch } = useGetScorecardsQuery({
    variables: { cloudId },
    fetchPolicy: 'cache-and-network',
    /**
     * Setting `nextFetchPolicy: cache-first` prevents Apollo from making unwanted network requests when
     * the cache for this query is updated (e.g. optimistic response for service relationships).
     * Reference: https://github.com/apollographql/apollo-client/issues/6760#issuecomment-668188727
     */
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  refetchCallback = refetch;

  return {
    data,
    loading,
    error,
    refetch: refetchCallback,
  };
};

export default useGetScorecards;
