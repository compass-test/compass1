import { useGetScorecardQuery } from '@atlassian/dragonfruit-graphql';

const useGetScorecard = ({ id }: { id: string | null | undefined }) => {
  const scorecardId = id as string;
  const { data, loading, error } = useGetScorecardQuery({
    variables: { id: scorecardId },
    fetchPolicy: 'cache-and-network',
    /**
     * Setting `nextFetchPolicy: cache-first` prevents Apollo from making unwanted network requests when
     * the cache for this query is updated (e.g. optimistic response for service relationships).
     * Reference: https://github.com/apollographql/apollo-client/issues/6760#issuecomment-668188727
     */
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all',
    skip: !id,
  });

  return {
    data,
    loading,
    error,
  };
};

export default useGetScorecard;
